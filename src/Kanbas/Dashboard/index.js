import db from "../Database";
import { React, useState } from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";
import "../index.css"

import 'bootstrap/dist/css/bootstrap.css';


function Dashboard({ courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse }) {
  // const courses = db.courses;
  // const [courses, setCourses] = useState(db.courses);
  
  // const [course, setCourse] = useState({
  //   name: "New Course",      number: "New Number",
  //   startDate: "2023-09-10", endDate: "2023-12-15",
  // });

  // const addNewCourse = () => {
  //   setCourses([...courses,
  //             { ...course,
  //               _id: new Date().getTime() }]);
  // };
  // const deleteCourse = (courseId) => {
  //   setCourses(courses.filter((course) => course._id !== courseId));
  // };
  // const updateCourse = () => {
  //   setCourses(
  //     courses.map((c) => {
  //       if (c._id === course._id) {
  //         return course;
  //       } else {
  //         return c;
  //       }
  //     })
  //   );
  // };
  


  return (

    <div className="whole">
      <h1 className="whole ms-3 mb-2">Dashboard</h1>
      <hr className=" mb-2 mt-2"/>
      <h5 className="whole ms-3 mb-2 mt-2">Published Courses ({courses.length})</h5>
      <hr className="mb-2 mt-2"/>
      <input value={course.name} className="form-control" 
      onChange={(e) => setCourse({ ...course, name: e.target.value }) }/>
      <input value={course.number} className="form-control" 
      onChange={(e) => setCourse({ ...course, number: e.target.value }) }/>
      <input value={course.startDate} className="form-control" type="date" 
      onChange={(e) => setCourse({ ...course, startDate: e.target.value }) } />
      <input value={course.endDate} className="form-control" type="date" 
      onChange={(e) => setCourse({ ...course, endDate: e.target.value }) } />

      <button  className="btn btn-success ms-3 me-2 mt-2 mb-2" onClick={addNewCourse} >
        Add
      </button>
      <button className="btn btn-primary ms-3 me-2 mt-2 mb-2" onClick={updateCourse} >
        Update
      </button>


      <div className="list-group">
        {courses.map((course) => (
          <Link 
          // key={course._id}
                to={`/Kanbas/Courses/${course._id}`}
                className="list-group-item">
                  <button className="btn btn-danger ms-3 me-2 mt-2 mb-2 float-end"
              onClick={(event) => {
                event.preventDefault();
                deleteCourse(course._id);
              }}>
              Delete
            </button>
                <button className="btn btn-warning ms-3 me-2 mt-2 mb-2 float-end"
              onClick={(event) => {
                event.preventDefault();
                setCourse(course);
              }}>
              Edit
            </button>

                  

            {course.name}
          </Link>
        ))}
      </div>
    </div>

    

    // <div className="whole">
    //   <h1>Dashboard</h1>
    //   <hr />
    //   <h2>Published Courses ({courses.length})</h2>
    //   <div className="d-flex flex-row flex-wrap">
    //   {/* row row-cols-1 row-cols-md-3 g-4 */}
        
    //     {/* col-12 col-sm-6 col-md-4 col-lg-3 */}
    //     {/* col */}
    //       {courses.map((course, index) => (
    //         <div className="col-12 col-sm-6 col-md-4 col-lg-3 me-5"  > 
    //         <div class="card" >
    //           <img src="/images/nature.jpeg" class="card-img-top" alt="..." />
    //           <div class="card-body" style={{height:"230px"}}>
    //             <h5 class="card-title">{course.name}</h5>

    //             <Link
    //               key={course._id}
    //               to={`/Kanbas/Courses/${course._id}`}
    //               className="btn btn-primary"
    //             >
    //               {course.name}
    //             </Link>
    //             <p class="card-text">
    //               {course._id}
    //               <br/>
    //               {course.startDate}
    //               <br/>
    //               {course.endDate}
    //               <br/>
    //               {course.context}
                  
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //       ))}
        
    //   </div>
    // </div>
  );
}

export default Dashboard;