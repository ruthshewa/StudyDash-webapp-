/* const model = {
    user: null,
    calendarEvents: null,
    calendarTimeFrame: {
    startTime: new Date().toISOString(),
    endTime: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
    },
    toDoTasks: [],
 */
import { makeAutoObservable } from "mobx";

class Model {
    user = null;
    calendarEvents = null;
    calendarTimeFrame = {
        startTime: new Date().toISOString(),
        endTime: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
    };
    workMinutes = 25;
    breakMinutes = 5;
    paused = true;
    mode = "work";
    remSeconds = this.workMinutes * 60;
    interId = null;

    
    toDoTasks = []
    constructor() {
        makeAutoObservable(this);
    }
    get isLoggedIn() {
        return !!this.user;
    }

    async getCalendarEvents() {
        if (this.isLoggedIn()) {
            this.calendarEvents = await fetchCalendarEvents(this.user.accessToken);
            console.log("Calendar events: ", this.calendarEvents);

        }
    }
    setUser(user) {
        this.user = user;
    }
    setCalendarEvents(events) {

        this.calendarEvents = events;

    }

    setCalendarTimeFrame(timePeriod) {
        this.calendarTimeFrame = timePeriod;
    }

    setPause() {
        this.paused = !this.paused;
        if (this.paused) {
            this.stopTime();
        } else {
            this.startTime();
        }
    }

    resetTimer() {
        this.stopTime();
        this.paused = true;
        this.mode = "work";
        this.remSeconds = this.workMinutes * 60;
    }

    updateWorkMode() {
        if (this.mode === "work") {
            this.mode = "break";
            console.log("switch to break")
            this.remSeconds = this.breakMinutes * 60;
        } else {
            this.mode = "work";
            console.log("switch to work")
            this.remSeconds = this.workMinutes * 60;
        }
        this.stopTime();
    }

    changeWorkMin(newMin) {
        this.workMinutes = newMin;
        if (this.mode === "work") {
            this.remSeconds = this.workMinutes * 60;
        }
    }

    changeBreakMin(newBMin) {
        this.breakMinutes = newBMin;
        if (this.mode === "break") {
            this.remSeconds = this.breakMinutes * 60;
        }
    }

    startTime() {
        if (!this.interId && this.paused) {
            this.interId = setInterval(() => {
                if (this.remSeconds > 0) {
                    this.remSeconds -= 1;
                } else {
                    if (this.mode === 'work'){
                        this.getWorkMinutes()
                    }
                    this.updateWorkMode();
                }
            }, 1000);
            this.paused = false;
        }
    }

    stopTime() {
        if (this.interId) {
            clearInterval(this.interId);
            this.interId = null;
        }
        this.paused = true;
    }

    format() {
        const minutes = Math.floor(this.remSeconds / 60);
        const seconds = this.remSeconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }

    dailyData = null

    setDailyData(persistance){
        if(persistance){ this.dailyData = 
            {currDate: persistance.currDate || this.dailyData?.currDate || null,
             weekDay: persistance.weekDay || this.dailyData?.weekDay || null,
             count: persistance.count || this.dailyData?.count || 0,
             workTimes: persistance.workTimes || this.dailyData?.workTimes || 0
            }}
        
    }
    getWorkMinutes() {
        const current = new Date()
        const date = current.toISOString().split("T")[0]
        const day = current.getDay()
        const wDay = day.toString()
        console.log("current date:", date)
        console.log("current day:", wDay)

        if (!this.dailyData || this.dailyData.currDate !== date){
            this.dailyData = 
            {currDate: date,
             weekDay: day,
             workTimes: 0,
             count: 0
            }
        }
        this.dailyData.workTimes += this.workMinutes
        this.dailyData.count += 1
        console.log("total work time:" , this.dailyData.workTimes)   
        console.log("total sessions:" , this.dailyData.count)   
    }
    
    setTaskList(tasks) {
        this.toDoTasks = tasks;
    }

    addTask(task) {
        this.toDoTasks = [...this.toDoTasks, task];
        //console.log("Current tasks in model:", this.toDoTasks);
    }
   
    


    removeTask(taskID) {
        this.toDoTasks = this.toDoTasks.toSpliced(taskID, 1);
    }

    markTaskAsComplete(taskID) {

        this.toDoTasks = this.toDoTasks.map((task, index) => 
            index === taskID ? { ...task, complete: true } : task
        );
    }
    
    markTaskAsIncomplete(taskID) {
        this.toDoTasks = this.toDoTasks.map((task, index) => 
            index === taskID ? { ...task, complete: false } : task
        );
    }
    

        //this.toDoTasks[taskID].complete = true;
    

    markTaskAsIncomplete(taskID) {
        this.toDoTasks[taskID].complete = false;
    }


    setTask(taskID, task) {
        this.toDoTasks[taskID] = task;
    }
}


export const model = new Model();
