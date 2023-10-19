import db from "../Database";
import { Link } from "react-router-dom";
import "./dashboard.css";
import "../index.css"

import 'bootstrap/dist/css/bootstrap.css';


function Dashboard() {
  const courses = db.courses;
  // <div class="d-flex flex-row flex-wrap">
  //                   <div class="col-12 col-sm-6 col-md-4 col-lg-3">
  //                       <div class="card">
  //                         <img src="/images/nature.jpeg" class="card-img-top" alt="...">
  //                         <div class="card-body">
  //                           <h5 class="card-title">CS5400 Web Development</h5>
  //                           <p class="card-text">CS5400 Web Development it is a good course~~~ Professor and TAs are so great</p>
  //                         </div>
  //                       </div>
  //                     </div>
  return (
    

    <div className="whole">
      <h1>Dashboard</h1>
      <hr />
      <h2>Published Courses ({courses.length})</h2>
      <div className="d-flex flex-row flex-wrap">
      {/* row row-cols-1 row-cols-md-3 g-4 */}
        
        {/* col-12 col-sm-6 col-md-4 col-lg-3 */}
        {/* col */}
          {courses.map((course, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 me-5"  > 
            <div class="card" >
              <img src="/images/nature.jpeg" class="card-img-top" alt="..." />
              <div class="card-body" style={{height:"230px"}}>
                <h5 class="card-title">{course.name}</h5>

                <Link
                  key={course._id}
                  to={`/Kanbas/Courses/${course._id}`}
                  className="btn btn-primary"
                >
                  {course.name}
                </Link>
                <p class="card-text">
                  {course._id}
                  <br/>
                  {course.startDate}
                  <br/>
                  {course.endDate}
                  <br/>
                  {course.context}
                  
                </p>
              </div>
            </div>
          </div>
          ))}
        
      </div>
    </div>
  );
}

export default Dashboard;