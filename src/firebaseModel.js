import { ref, set, get } from "firebase/database"
import { db } from "./googleOAuth.js";
import { model } from "./model.js";


/* function testWrite(){
    console.log("write test")
    model.setDailyData({currDate: "2025-01-14", count: 4, workTimes: 30, weekDay: 2 } )
    console.log("data before saving:", model.dailyData.count, model.dailyData.currDate, model.dailyData.workTimes )
    connectToFirebase(model, (dp, cb) => {cb()}) 


    console.log("wrote to firebase")

}
 */

function modelToPersistence(model) {
    return {
        toDoTasks: model.toDoTasks,
        dailyWorkData: model.dailyData
    };
}

function persistenceToModel(persistedModel, model) {
    console.log(persistedModel?.toDoTasks);
    model.setTaskList(persistedModel?.toDoTasks || []);
    const defaultData = {currDate: null, weekDay: null, workTimes: 0, count: 0}
    model.setDailyData(persistedModel?.dailyWorkData || defaultData)

}

function clearModel(model) {
    model.setTaskList([]);
    model.setDailyData({currDate: "", weekDay: "", workTimes: 0, count: 0})
}

function saveToFirebase(model, ref) {
    if (model.ready) {
        console.log("setting model in firebase")
        set(ref, modelToPersistence(model));
    }
}

function readFromFirebase(model, ref) {
    model.ready = false;
    console.log("reading from firebase");
    return get(ref)
        .then(function persistenceToModelACB(snapshot) {
            return persistenceToModel(snapshot.val(), model);
        })
        .then(function setModelReadyACB() {
            model.ready = true;
        })
}

function connectToFirebase(model, watchFunction) {
    watchFunction(() => [model.user?.user], readModelFromFirebaseACB);
    watchFunction(() => [model.toDoTasks, model.dailyData.currDate, model.dailyData.workTimes, model.dailyData.count], saveModelToFirebaseACB)


    function readModelFromFirebaseACB() {
        const user = model.user?.user;
        console.log("attempting to read from firebase");
        if (user) {
            //console.log("reading from firebase");
            readFromFirebase(model, userModelRef());
        } else {
            clearModel(model);
        }
    }

    function saveModelToFirebaseACB() {
        const user = model.user?.user;
        console.log("attempting to write to firebase");
        console.log("user", user);

        if (user) {
            console.log("writing to firebase");
            saveToFirebase(model, userModelRef());
        }
    }

    function userModelRef() {
        return ref(db, `users/${model.user.userID}/model`);
    }
}

export { connectToFirebase }
