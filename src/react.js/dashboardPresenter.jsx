import { useEffect,useState } from "react";
import {getCurrentUsersPlaylist} from "../spotifyOAuth";



export const DashboardPresenter = ({setIsLoggedIn}) =>{

    const[firstPlaylistId,setFirstPlaylistId] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(null);
    
    useEffect(() => {
        const fetch = async () =>{

            try{
                const playlistInfo = await getCurrentUsersPlaylist();
                if(playlistInfo.items && playlistInfo.items.length > 0){
                    setFirstPlaylistId(playlistInfo.items[0].id);
                    setIsLoggedIn(true);
                }
                setIsLoading(false);

            }catch(error){
                setError("Failed to reach the dashboard.Try again");
                console.error(error)
            }
        };
        fetch();
    }, [setIsLoggedIn]);

    if(isLoading){
        return <div> </div>
    }

    if(error){
        return <div> Error: {error}</div>;
    }

    return(
        <div className="downRight">

            {firstPlaylistId ?(
            <iframe
            src ={`https://open.spotify.com/embed/playlist/${firstPlaylistId}`}
            width = "400"
            height ="600"
            version ="1.0"
            provider_name = "Spotify"
            provider_url = "https://spotify.com"
            allow="encrypted-media"
            type = "rich"

            ></iframe>):(<p> No playlist availble</p>)}

        </div>
    )

};