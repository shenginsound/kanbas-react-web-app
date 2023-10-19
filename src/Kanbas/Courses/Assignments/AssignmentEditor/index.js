import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import db from "../../../Database";
import {FaEllipsisVertical} from "react-icons/fa6"
import {BsFillCheckCircleFill} from "react-icons/bs"


function AssignmentEditor() {
  const { assignmentId } = useParams();
  const assignment = db.assignments.find(
    (assignment) => assignment._id === assignmentId);


  const { courseId } = useParams();
  const navigate = useNavigate();
  const handleSave = () => {
    console.log("Actually saving assignment TBD in later assignments");
    navigate(`/Kanbas/Courses/${courseId}/Assignments`);
  };
  return (
    <div>
        <button onClick={handleSave} className="btn btn-secondary me-2 float-end">
                <FaEllipsisVertical  style={{color:"white", width:"15px"}}/>
            
            </button>
        <div className="float-end me-2" style={{color:"green", fontSize:"23px"}}>
        <BsFillCheckCircleFill className="me-2"/>
            Published</div>
            
            <br></br>
            <hr></hr>
      <h4>Assignment Name</h4>
      <input value={assignment.title}
             className="form-control mb-2" />
        <hr></hr>
      
      <button onClick={handleSave} className="btn btn-success me-2 float-end">
        Save
      </button>
      
      <Link to={`/Kanbas/Courses/${courseId}/Assignments`}
            className="btn btn-danger float-end">
        Cancel
      </Link>
      
    </div>
  );
}


export default AssignmentEditor;