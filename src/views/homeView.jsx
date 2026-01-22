import React from "react";
import { PiCalendarDots } from "react-icons/pi";
import { RiGraduationCapFill } from "react-icons/ri";
import { RiMusic2Fill } from "react-icons/ri";
import { Todolist } from "../react.js/todolistPresenter";

export function HomeView(props) {
    return (
        <div className="home">
            <div className="welcome-section">
                <h1>Studydash <RiGraduationCapFill /></h1>
                <p>Stay on track and achieve your goals!</p>
            </div>

            <div>
                <Todolist model={props.model} />
            </div>

            <div className="quote">
                <h2>Inspiration for Today</h2>
                <p>“Don’t let what you cannot do interfere with what you can do.” —John Wooden</p>
            </div>
        </div>
    );
}


