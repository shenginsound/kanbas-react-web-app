import React from "react";
import { Link, useParams } from "react-router-dom";
import db from "../../Database";
import "./assign.css";
import {BsGripVertical} from "react-icons/bs"
import {BiDotsVerticalRounded} from "react-icons/bi"
import {AiOutlinePlus} from "react-icons/ai"
import {BsFillJournalBookmarkFill} from "react-icons/bs"
import {BsFillCheckCircleFill} from "react-icons/bs"
import AssignButtonBoard from "./AssignButtonBoard";
import 'bootstrap/dist/css/bootstrap.css';
import { deleteAssignment } from "./assignmentsReducer.js";

import { useSelector, useDispatch } from "react-redux";
// import {
//   addAssignment,
//   deleteAssignment,
//   updateAssignment,
//   selectAssignment,
// } from "../AssignmentsReducer";

function Assignments() {
  const { courseId } = useParams();
  // const assignments = db.assignments;
  const assignments = useSelector((state) => state.assignmentsReducer.assignments);
  const module = useSelector((state) => state.modulesReducer.module);
  const courseAssignments = assignments.filter(
    (assignment) => assignment.course === courseId);
  const dispatch = useDispatch();
  return (

    
    <div className="list-group assign-list-length mt-3">
        
        
        {/* <input placeholder="Search for assignment"
             className="form-control mb-2 me-2 float-end" style={{height: "30px", width: "40%"}}/> */}
        
        <div className="out mt-3">
        <input placeholder="Search for assignment"
             className="form-control mb-2 me-2 float-end" style={{height: "30px", width: "40%"}}/>
        
        
        <div className="float-end">
            
        <AssignButtonBoard />
        
        </div>
        </div>
       
        
       
        <hr/>
        <br></br>
      {/* <div className="list-group-item"> */}
      
      <div className="list-group-item list-group-item-action list-group-item-secondary">
      
        <BsGripVertical className="me-2"/>
        Assignments for course {courseId}
        <div class="float-end">
        <button class="wd-rounded-corners-all-around wd-border-thin wd-border-solid word-si" >
        40% of total  </button> 
        <AiOutlinePlus/>
        <BiDotsVerticalRounded/>
        </div>

        </div>

        {courseAssignments.map((assignment) => (
          <div className="out">
          <Link
            key={assignment._id}
            to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
            className="list-group-item ">
            <BsGripVertical className="me-1"/>
            <BsFillJournalBookmarkFill className="me-1 green-book" />
            {assignment.title}
            
            <BiDotsVerticalRounded className="me-3 float-end" />
            <BsFillCheckCircleFill className="me-3 float-end green-book"/>
            
          </Link>
          <button className="btn btn-danger me-2 ms-2 float-end"
          onClick={() => dispatch(deleteAssignment(assignment._id))}>
          Delete
        </button>
        </div>
        ))}
      {/* </div> */}
    </div>
    
  );
}
export default Assignments;