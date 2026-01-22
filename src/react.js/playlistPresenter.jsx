import { useEffect,useState } from "react";
import { getCurrentUsersPlaylist } from "../spotifyOAuth";

export const PlaylistPresenter = () =>{

    const[playlists,setplaylist] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(null);
    const[selectPlaylistId,setSelectedPlaylistId] = useState(null);

    useEffect(() => {

        getCurrentUsersPlaylist().then((data) => {

            setplaylist(data.items);
            setIsLoading(false);

        }).catch((error) => {
            setError(error.message);
            setIsLoading(false);

        });

    }, []);

    if(isLoading){
        return <div> Loading your playlist</div>
    }

    if(error){
        return <div> Error: {error}</div>;
    }

    return(
        <div className="topRight">
            <h2> Your Playlists</h2>
            <ul>
            {playlists.map((playlist) =>(
                <li key={playlist.id} onClick ={()=> setSelectedPlaylistId(playlist.id)}>
                    {playlist.name} {/*<a  href={playlist.external_urls.spotify}>{playlist.name}</a> */}


                </li>

            ))}

            </ul>
           {selectPlaylistId &&(
            <iframe
            src ={`https://open.spotify.com/embed/playlist/${selectPlaylistId}`}
            width = "100%"
            height ="300"
            version ="1.0"
            provider_name = "Spotify"
            provider_url = "https://spotify.com"
            allow="encrypted-media"
            type = "rich"

            ></iframe>)}
            
           
        </div>


    );


};