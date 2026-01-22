import "/src/style.css";
import { logOutGoogle } from "../googleOAuth.js";


export function SidebarView(props) {
  
  
  function closeNavACB() {
    const sidebar = document.getElementById("mySidebar");
        if (sidebar) {
            sidebar.style.width = "0";
        }
  }

  function openNavACB() {
    const sidebar = document.getElementById("mySidebar");
    if (sidebar) {
        sidebar.style.width = "250px";
}
  }

  function logOutACB() {
    logOutGoogle();
}

  return (
    <div>
      <div id="mySidebar" className="sidebar">
        <a  onClick={closeNavACB}>
        </a>
        <td>
            <button onClick={closeNavACB}>X</button>
        </td>
        {/* <a href="#" onClick={closeNavACB}>Go back to homepage</a>  */}
        <a href="#">Home Page</a>
        <a href="#/calendar">Calendar</a>
        <a href="#/timer">Pomodoro Timer</a>
        <a href="#/progress">Progress Tracker</a>

        <button className="logout-button" onClick={logOutACB}>Log Out</button>
      </div>

      
      <div>
        <button className="open-button" onClick={openNavACB}>
          Open Sidebar
        </button>
      </div>
    </div>
  );
}








