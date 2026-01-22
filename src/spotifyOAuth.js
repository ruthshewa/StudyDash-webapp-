import {SPOTIFY_URL,CLIENT_ID,CLIENT_SECRET,REDIRECT_URI,AUTH_URL,TOKEN_URL,SCOPE} from "/src/apiConfig.js";




const generateRandomString = function (length){
    let output = '';

    const randomString = 'ABCDEFGHIJKLMNOPQRSTVUWXYZabcdefghijklmnopqrstvuwxyz1234567890';

    for (let i = 0; i < length; i++  ){

        const randomIndex = Math.floor(Math.random() * randomString.length);

        output +=randomString[randomIndex];

    }

    return output
}

export const login = () =>{
    console.log("Login is triggerd");
    console.log("Test log to confirm visibility");
    const state = generateRandomString(16);
    sessionStorage.setItem("spotify_state", state);

    const searchParams = new URLSearchParams({

        "client_id" : CLIENT_ID,
        "response_type" : "code",
        "redirect_uri" : REDIRECT_URI,
        "state"  : state,
        "scope" : SCOPE
    })

    const authURL = `${AUTH_URL}?${searchParams.toString()}`;
    window.location.href = authURL.toString();
}

export const callback = (location) =>{
    console.log("Callback functio is triggered",location);

    return new Promise((resolve,reject)=>{

        const params = new URLSearchParams(location.search)
        const authCode = params.get("code");
        const receivedState = params.get("state");
        const receivedError = params.get("error");

        console.log("Auth Code:", authCode);
        console.log("State:", receivedState);
        console.log("Error:", receivedError);

        const ogState = sessionStorage.getItem("spotify_state");
        if(receivedError){
            console.error("Error occured during authorization", receivedError);
            reject(new Error(receivedError))
            return;
        }

        if(receivedState !== ogState){
            console.error("Expected state ang received state does not match");
            reject(new Error("state mismatch"))
            return;
        }

        if(authCode && receivedState === ogState){
            getToken(authCode).then(()=>{
                resolve();
            }).catch(error =>{
                reject(error);
            });
            
        }else{
            
            console.error("authcode missing");
            reject(new Error("missing authcode"))
        }
    }
    )
}


export const getToken =async (authCode) => {

    const authLine = "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET);

    const params = new URLSearchParams({
        "grant_type": "authorization_code",
        "code" : authCode,
        "redirect_uri" : REDIRECT_URI

    })

    try {
        const response = await fetch(TOKEN_URL, {
            method: "POST",

            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": authLine
            },
            body: params
        });
        if (!response.ok) {
            throw new Error("HTTP response is not 200");

        }
        const data = await response.json();
        if (data.access_token) {
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("scope", data.scope);
            localStorage.setItem("Expiration time", (Date.now() / 1000) + data.expires_in);
            localStorage.setItem("refresh_token", data.refresh_token);

            const userResponse = await fetch("https://api.spotify.com/v1/me",
                {
                    method: "GET",
                    headers : {
                        "Authorization": "Bearer " + data.access_token
                    }
            });

            if(userResponse.ok){
                const userData = await userResponse.json();

                localStorage.setItem("user_id", userData.id);
                localStorage.setItem("user_name", userData.display_name);
            }else{
                throw new Error("Fail to fetch user data");
            }

        } else {
            throw new Error("Response does not contain an access token");
        }
    } catch (error) {
        console.error("error", error);
    }
}

export const getCurrentUsersPlaylist = async () => {
    try {
        const accessToken = localStorage.getItem("access_token");
        const expireTime = localStorage.getItem("Expiration time");

        if (!accessToken || !expireTime) {
            throw new Error("No access token or expiration time found");
        }

        if (Date.now() / 1000 >= expireTime - 10) {
            await refreshAccesToken();
        }

        const playlistEndpoint = `${SPOTIFY_URL}me/playlists`;

        const response = await fetch(playlistEndpoint, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch playlists: ${errorData.error.message}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        throw error;
    }
};

export const getCurrentUsersProfile = async () => {
    try {
        const accessToken = localStorage.getItem("access_token");
        const expireTime = localStorage.getItem("Expiration time");

        if (!accessToken || !expireTime) {
            throw new Error("No access token or expiration time found");
        }

        if (Date.now() / 1000 >= expireTime - 10) {
            await refreshAccesToken();
        }

        const profileEndpoint = `${SPOTIFY_URL}me`;

        const response = await fetch(profileEndpoint, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch playlists: ${errorData.error.message}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        throw error;
    }
};




export const refreshAccesToken = () =>{

    const refreshToken = localStorage.getItem("refresh_token");

    if(!refreshToken){
        console.error("refresh token is missing");

    }

    const refreshTokenLine = "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET);

    
    const refreshParams = new URLSearchParams({
        "grant_type": "refresh_token",
        "refresh_token" : refreshToken
    })

    fetch(TOKEN_URL,{

        method:"POST",
        
        headers:{

            "Content-Type" : "application/x-www-form-urlencoded",
            "Authorization" : refreshTokenLine


        },
        body: refreshParams,
    }).then(response =>{

        if(!response.ok){
            throw new Error("refrsh token failed");

        }
        return response.json();
    }).then(newData => {

        localStorage.setItem("access_token", newData.access_token);
        localStorage.setItem("Expiration time",(Date.now()/ 1000) + newData.expires_in);

        getCurrentUsersPlaylist();
    }).catch(error =>{
        console.error("Error refreshing access token",error);
    });

}







