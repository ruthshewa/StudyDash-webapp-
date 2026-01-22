import { useEffect } from "react";
import { callback } from "../spotifyOAuth";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export function CallbackPresenter(){
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() =>{
        const expectedstate = sessionStorage.getItem("spotify_state");
        const receivedstate = new URLSearchParams(location.search).get("state")
        //console.log("Expected state",expectedstate)
        //console.log("Received State", receivedstate);

        if(expectedstate === receivedstate){

            callback(location).then(()=>
                navigate("/timer")
            ).catch((error)=>{
                console.log("Callback error", error)
            })
        }else{
            console.error("State mismatch")
        }

    },[location,navigate]);

    return  <img src= "https://brfenergi.se/iprog/loading.gif" />

    
}