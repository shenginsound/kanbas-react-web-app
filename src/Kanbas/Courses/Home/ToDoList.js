import "./Stylee.css";
import React from 'react';
import {PiNumberCircleFiveFill} from "react-icons/pi"
import {ImCross} from "react-icons/im"




function ToDoList(){
    const doList = [{name: "Grade A1+HTML",
                    score: "100 points ",
                    date: " Sep 18 at 11:59pm"
                    },{ name: "Grade A2 CSS+BootStrap",
                        score: "100 points ",
                        date: " Oct 2 at 11:59pm"}];

    return(
        <>
        <h3>To Do</h3>
        <ul className="list-group">
            {
                doList.map((dolist, index) => (
                    <li key={index} className="list-group-item">
                    <h4 className="li-style"><PiNumberCircleFiveFill/> {dolist.name} 
                    <ImCross className="float-end" style={{ fontSize: '10px' }}/></h4>
                    <div className="d-flex li-substyle">
                        
                        {dolist.score} ●
                        {dolist.date}
                    </div>
                    
                    
                </li>
                ))
            }
        </ul>
        </>

    );


}
export default ToDoList;