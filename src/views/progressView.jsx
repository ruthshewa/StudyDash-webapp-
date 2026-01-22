//import { useState } from 'react';
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from "recharts";
import "/src/style.css";
import { IoIosInformationCircleOutline } from "react-icons/io";


export function progressFunction(props) {

    const todayDate = new Date().toISOString().split("T")[0]
    const isDate = todayDate === props.date
    const COLORS = ["#8884d8", "#82ca9d"];
    const data02 = [
        { name: "Complete", value: props.completeTasks },
        { name: "Incomplete", value: props.incompleteTasks },
      ];

    function time (workMin){
        const hours = Math.floor(workMin/60).toString().padStart(2, "0")
        const minutes = (workMin % 60).toString().padStart(2, "0")
        console.log( `${hours}:${minutes}`)

        //return `${hours}h ${minutes}m`
          if (hours > 0){
            return `${hours}h ${minutes}m` 
        }
        else {
            return `${minutes}m`
        }  
    }

    function getPercent(comp, incomp){
        if (comp===0 && incomp===0){
            return "0%"
        }
        const percentage = Math.floor((comp/(incomp+comp)) * 100)
        return percentage + "%"
    }

      return (
        <div className = "page">
        <div className = "columns">
        <div className='headerBox'> Study Time </div>
        <div className = "box">
        <div className = "circle1">
        <p className = "number"> {isDate? time(props.totalTime): 0+"m"} </p>
        </div>
        </div>
        </div>
        <div  className = "columns">
        <div className='headerBox'> Tasks </div>
        <div className = "chartBox">
        <div className = "smallBox">
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <ResponsiveContainer width = "100%" height= "100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            data={data02}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={82}
            fill="#82ca9d"
            stroke="none"
          >
            {data02.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        </ResponsiveContainer>
        <div style = {{position:"absolute", top:"50%", left: "50%", transform: "translate(-50%, -50%)", color: "white" , fontSize: "24px",
}}> 
           {getPercent(props.completeTasks, props.incompleteTasks)} </div>
        </div>
        </div>
        <div >
        </div>
        </div>
        </div>

        <div  className = "columns">
        <div className='headerBox'> Sessions </div>
        <div className = "box"> 
        <div className = "circle2">
        <span className = "number">{isDate? props.sessions: 0}</span>
        </div>
        </div>
        </div>

        </div>
      );
      
      }





