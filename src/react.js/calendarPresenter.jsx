import { observer } from "mobx-react-lite";
import { CalendarView } from "../views/calendarView.jsx";


export const Calendar = observer(
    function CalendarRender(props) {

        return <CalendarView events={props.model.calendarEvents}/>;
    });

// export const CalendarPresenter = observer(function CalendarPresenter({ model }) {
//     if (!model.isLoggedIn || !model.hasCompletedLogin) {
//         return null; // Ensure calendar doesn't show without proper state
//     }

//     function handleRefreshCalendar() {
//         model.getCalendarEvents(); // Fetch new events
//     }

//     return (
//         <CalendarView
//             events={model.calendarEvents}
//             onGetCalendarEvents={handleRefreshCalendar}
//             onLogOut={() => {
//                 model.setIsLoggedIn(false);
//                 model.setHasCompletedLogin(false);
//             }}
//         />
//     );
// });


