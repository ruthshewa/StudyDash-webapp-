import { timerFunction as TimerFunction} from "../views/timerView";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
const Timer = observer (
    function renderTimer(props){
    const [timer, setTimer] =useState(props.model.format())
    const [pause, setPause] = useState(props.model.paused)
    const [workMinutes, setWorkMinutes] = useState(props.model.workMinutes);
    const [breakMinutes, setBreakMinutes] = useState(props.model.workMinutes);


    useEffect(() =>{
        const interval = setInterval(() => 
        {if(!props.model.paused){
            setTimer(props.model.format())
        }}, 1000)
        return ()=> clearInterval(interval)
    }, [props.model])


    function toStartACB(){
        props.model.startTime()
        setPause(false) 
    }
    function toPauseACB(){
        props.model.stopTime()
        setPause(true) 
    }
    function toResetACB(){
        props.model.resetTimer()
        setTimer(props.model.format())
        setPause(true)
    }
    function toUpdate(){
        props.model.updateWorkMode()
        setTimer(props.model.format())
    }

    function toChangeBreak(min){
        props.model.changeBreakMin(min)
        setTimer(props.model.format())
        setBreakMinutes(min)

    }
    function toChangeWork(min){
        props.model.changeWorkMin(min)
        setWorkMinutes(min)
        setTimer(props.model.format())

    }

    return (
        <TimerFunction
        onReset = {toResetACB}
        onPause = {toPauseACB}
        onStart = {toStartACB}
        isPaused = {props.model.paused }
        onFormat = {() => props.model.format()}
        onUpdate = {toUpdate}
        onBreak = {toChangeBreak}
        onWork = {toChangeWork}
        workMinutes = {workMinutes}
        breakMinutes = {breakMinutes}
        />
    )

});
export {Timer}