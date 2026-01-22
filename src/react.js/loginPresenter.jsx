import { observer } from "mobx-react-lite"
import { LoginView } from "../views/loginView.jsx";
import { CalendarView } from "../views/calendarView.jsx";
import { logInWithGoogle, logOutGoogle } from "../googleOAuth.js"
import { HomeView } from "../views/homeView.jsx";
import { SidebarView } from "../views/sidebarView.jsx";
import { TodolistView } from "../views/todolistView.jsx";

const Login = observer(
    function LoginRender(props) {
        if (!props.model.isLoggedIn) {
            return (
                <LoginView onLogIn={googleSignIn}

                           login={googleSignIn}

                />

            )
        } else {
            return (       
            <HomeView onLogOut={googleSignOut} model={props.model}/>
            )
        }

        async function googleSignIn() {
            const user = await logInWithGoogle();
            props.model.setUser(user);
        }

        function googleSignOut() {
            logOutGoogle();
        }
    }
)

export { Login }
