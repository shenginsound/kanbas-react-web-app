import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import db from "../../Kanbas/Database";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router-dom";
// import JsonPre from "../../Labs/a3/JsonPre";
import CourseNavigation from "./CourseNavigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/AssignmentEditor";
import Grades from "./Grades";
import "./course.css"
import {FaBars} from "react-icons/fa"
import {BiGlasses} from "react-icons/bi"

function Courses() {
  // const URL = "http://localhost:4000/api/courses";
  //const URL = "https://kanbas-node-server-app-njny.onrender.com/api/courses";
  //const API_BASE = process.env.REACT_APP_API_BASE;
  const API_BASE = "http://localhost:4000/api";
  const URL = `${API_BASE}/courses`;
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const findCourseById = async (courseId) => {
    const response = await axios.get(
      `${URL}/${courseId}`
    );
    setCourse(response.data);
  };

  const {pathname} = useLocation();
  const [empty, kanbas, courses1, id, screen] = pathname.split("/");
  useEffect(() => {
    findCourseById(courseId);
  }, [courseId]);

  return (
    <div>
        <div className="d-flex">
      <h1 className="header">
        <FaBars className="ms-2 me-2" style={{color:"gray"}}/>
        Course {course.name} &gt; {screen}</h1>
        <button  className="btn btn-secondary ms-5 me-2 fixed-p">
        <BiGlasses className="me-1"/>
                  Student View
                
              </button>
              </div>
        <hr className="long-line"></hr>
      {/* <nav style="--bs-breadcrumb-divider: '>';" class="big" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">
              <a class="now" href="/kanbas/Home.html">CS4550.12631.202410</a></li>
            <li class="breadcrumb-item "><a class="nounderline" href="/kanbas/Home.html">Home</a></li>
          </ol>
        </nav> */}
      <CourseNavigation />
      <div>
        <div
          className="overflow-y-scroll position-fixed bottom-0 end-0"
          style={{
            left: "320px",
            top: "50px",
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home/>} />
            <Route path="Modules" element={<Modules/>} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Zoom Meetings" element={<h1>Zoom Meetings</h1>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Quizzes" element={<h1>Quizzes</h1>} />
            <Route path="Grades" element={<Grades/>} />
            <Route
              path="Assignments/:assignmentId"
              element={<AssignmentEditor/>}
            />
            <Route path="People" element={<h1>People</h1>} />
            <Route path="Panopto Video" element={<h1>Panopto Video</h1>} />
            <Route path="Discussions" element={<h1>Discussions</h1>} />
            <Route path="Announcements" element={<h1>Annoumcements</h1>} />
            <Route path="Pages" element={<h1>Pages</h1>} />
            <Route path="Files" element={<h1>Files</h1>} />
            <Route path="Rubrics" element={<h1>Rubrics</h1>} />
            <Route path="Outcomes" element={<h1>Outcome</h1>} />
            <Route path="Collaborations" element={<h1>Collaborations</h1>} />
            <Route path="Syllabus" element={<h1>Syllabus</h1>} />
            <Route path="Progress Reports" element={<h1>Progress Reports</h1>} />
            <Route path="Settings" element={<h1>Settings</h1>} />
          </Routes>
        </div>
      </div>

    </div>
  );
}
export default Courses;