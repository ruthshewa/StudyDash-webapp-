import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { getDatabase } from "firebase/database"
import { firebaseConfig } from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const provider = new GoogleAuthProvider();

provider.addScope("https://www.googleapis.com/auth/calendar.readonly")

function logInWithGoogle() {
    return signInWithPopup(auth, provider).then(result => {
        const credentials = GoogleAuthProvider.credentialFromResult(result);
        console.log(credentials)
        console.log(auth.currentUser)
        //console.log(auth.currentUser.accessToken)
        const accessToken = {
            token: credentials.accessToken,
            timeOut: new Date().getTime() + 3600 * 1000,
        }
        localStorage.setItem("googleAccessToken", JSON.stringify(accessToken));
        return {
            accessToken: accessToken,
            userID: auth.currentUser.uid,
            user: auth.currentUser,
        };
    });
}

function logOutGoogle() {
    console.log("logging out")
    localStorage.removeItem("googleAccessToken");

    signOut(auth);
}

function userStateHandler(model) {
    onAuthStateChanged(auth, authStateChangedACB);

    function authStateChangedACB(user) {
        if (user) {
            console.log("user is logged in");
            //const tokenResult = await user.getIdTokenResult(true);
            //const credential = GoogleAuthProvider.credential(await user.getIdToken(), user.accessToken);
            //console.log('foo', tokenResult);
            const accessToken = localStorage.getItem("googleAccessToken");
            // If login is in progress, accessToken may not exist
            if (accessToken) {
                model.setUser({
                    user: user,
                    userID: user.uid,
                    accessToken: JSON.parse(accessToken),
                });
            } else {

            }
        } else {
            console.log("removed user prop")
            model.setUser(null);
        }
    }
}

export { auth, db, logInWithGoogle, logOutGoogle, userStateHandler }
