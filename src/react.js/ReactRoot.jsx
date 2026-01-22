import {createRoot} from "react-dom/client";
import {Login} from "./loginPresenter";
import {LoginView} from "../views/loginView";
import {observer} from "mobx-react-lite";
import {createHashRouter, RouterProvider} from "react-router-dom";
import { CallbackPresenter } from "./callbackPresenter";
import { PlaylistPresenter } from "./playlistPresenter";
import { Sidebar } from "./sideBarPresenter.jsx";
import { Calendar } from "./calendarPresenter.jsx";
import { Timer } from "./timerPresenter.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { Progress } from "./progressPresenter.jsx"; 


const ReactRoot = observer(
    function ReactRoot(props) {
        const router = createHashRouter([
            {
                path: "/",
                element:<Login model={props.model}/>,
            },
            {
                path: "/callback",
                element: <CallbackPresenter/>
            },{
                path: "/playlists",
                element: <PlaylistPresenter/>
            },{
                path: "/calendar",
                element: <Calendar model={props.model}/>
            },
            {
                path: "/timer",
                element: <ChakraProvider> <Timer model={props.model}/> </ChakraProvider>
            },
            {
                path: "/progress",
                element:  <Progress model={props.model}/> 
            }
        ])


        //if (props.model.ready) {
        return (
            <div className="flex_parent">
                <div className="side_bar">
                    <Sidebar model={props.model} />
                </div>

                <div className="main_content">
                    <RouterProvider router={router} /> {/* Correct usage */}
                </div>
            </div>
        );
        /*    //} else {
                return (
                    <div>
                        <h1>Loading...</h1>
                        <p>Please wait while the application is loading.</p>
                    </div>
                );
            }*/
    }
)

export {ReactRoot}