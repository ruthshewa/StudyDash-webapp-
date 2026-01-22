//import { Provider } from "@/components/ui/provider"

import {login} from "/src/spotifyOAuth.js"


export function LoginView(props) {

/*
    const handleLogInClickACB = () =>{
      login();
       
    }
      */

    function logInACB() {
        props.onLogIn();
    }
return (
    <div className="container">
        <h1>Welcome to studydash!</h1>
        <p>Tools to help you on your academic journey</p>
  
    <div>
        <button className="google-login" onClick={logInACB}> Sign in with Google</button>
       {/*<button className="spotify-login" onClick = {handleLogInClickACB}>Log in with Spotify</button>*/} 
    </div>

    <div className="features">
        <h3>Features:</h3>
        <ul>
            <li>Manage your study schedule effortlessly</li>
            <li>Track your progress and deadlines</li>
            <li>Connect with Spotify for playlists</li>
        </ul>


    </div>

  
</div>


)

    
}

 