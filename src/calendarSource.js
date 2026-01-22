import { onAuthStateChanged } from "firebase/auth";
import { auth, logInWithGoogle } from "./googleOAuth.js";

function readCalendar(model, watchFunction) {
    watchFunction(() => [model.user], authStateChangeACB)
    //onAuthStateChanged(auth, authStateChangeACB)

    function authStateChangeACB(/*user*/) {
        const user = model.user?.user;
        console.log(user)
        console.log("User state changed:")
        if (user) {
            console.log("Logged in")
            if (!model.user.accessToken) {
                console.log("no access token")
            }
            const {startTime, endTime} = model.calendarTimeFrame;
            const accessToken = model.user.accessToken;
            if (accessToken.timeOut < new Date().getTime()) {
                logInWithGoogle().then(r =>
                    fetchEvents(r.accessToken.token, startTime, endTime)
                );
            } else {
                fetchEvents(accessToken.token, startTime, endTime);
            }
        } else {
            console.log("Not logged in")
            model.setCalendarEvents(null);
        }

        function fetchEvents(accessToken, startTime, endTime) {
            fetchCalendarEvents(accessToken, startTime, endTime).then(events => {
                model.setCalendarEvents(events);
            })
        }
    }
}

async function fetchCalendarEvents(accessToken, startTime, endTime) {
    const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(startTime)}&timeMax=${encodeURIComponent(endTime)}&orderBy=startTime&singleEvents=true`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
    if (response.ok) {
        const eventData = await response.json()
        //console.log(eventData.items);
        return eventData.items.map(getCalendarEventInfo);
    }

    function getCalendarEventInfo(event) {
        return {
            title: event.summary,
            start: event.start.dateTime || event.start.date,
            end: event.end.dateTime || event.end.date,
        };
    }
}

export { readCalendar }
