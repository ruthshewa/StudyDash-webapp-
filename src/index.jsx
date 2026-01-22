import * as React from "react";
import { createRoot } from "react-dom/client";
import { configure, observable, reaction } from "mobx";
import { connectToFirebase } from "./firebaseModel.js";
import { readCalendar } from "./calendarSource.js";
import { ReactRoot } from "./react.js/ReactRoot.jsx";
import { model } from "./model.js";
import { userStateHandler } from "./googleOAuth.js";

configure({enforceActions: "never",});

const reactiveModel = observable(model);

if (window.location.pathname === "/callback") {

    const query = window.location.search;
    window.location.replace(`/#/callback${query}`);
} else {
    createRoot(document.getElementById('root'))
        .render(<React.StrictMode>
            <ReactRoot model={reactiveModel}/>
        </React.StrictMode>)
}

userStateHandler(reactiveModel);
readCalendar(reactiveModel, reaction);
connectToFirebase(reactiveModel, reaction);

