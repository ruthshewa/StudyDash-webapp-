
import { progressFunction as ProgressFunction } from "../views/progressView";
import { observer } from "mobx-react-lite";
//import { useState, useEffect } from "react";
const Progress = observer (
    function renderTimer(props){
        let date = null
        let sessions  = null
        let weekday = null
        let totalTime = null
        let completeTasks = props.model.toDoTasks.filter(taskID => taskID.complete).length
        //console.log("completetasks", completeTasks)
        let incompleteTasks = props.model.toDoTasks.filter(taskID=> !taskID.complete).length



    if (props.model.dailyData) {
         date = props.model.dailyData.currDate
         sessions  = props.model.dailyData.count
         weekday = props.model.dailyData.weekDay
         totalTime = props.model.dailyData.workTimes
        }
        else { 
            console.log("data is loading")
        }
        
        return (
        <ProgressFunction
        date = {date}
        sessions = {sessions}
        weekday = {weekday}
        totalTime = {totalTime}
        completeTasks ={completeTasks}
        incompleteTasks = {incompleteTasks}
        
        />
    )}
)
export {Progress}