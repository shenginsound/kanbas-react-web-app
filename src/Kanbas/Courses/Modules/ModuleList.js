import React, {useEffect ,useState } from "react";
import { useParams } from "react-router-dom";
import db from "../../Database";
import 'bootstrap/dist/css/bootstrap.css';
import "./style.css"

import {BsGripVertical} from "react-icons/bs"
import {BiDotsVerticalRounded} from "react-icons/bi"
import {AiOutlinePlus} from "react-icons/ai"
import {BsFillJournalBookmarkFill} from "react-icons/bs"
import {BsFillCheckCircleFill} from "react-icons/bs"

import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
  setModules,

} from "./modulesReducer";
import * as client from "./client";



function ModuleList() {
  const { courseId } = useParams();
  // const [modules, setModules] = useState(db.modules);
  // // const modules = db.modules;
  // const [module, setModule] = useState({
  //   name: "New Module",
  //   description: "New Description",
  //   course: courseId,
  // });
  // const addModule = (module) => {
  //   setModules([
  //     { ...module, _id: new Date().getTime().toString() },
  //       ...modules,
  //   ]);
  // };
  // const deleteModule = (moduleId) => {
  //   setModules(modules.filter(
  //     (module) => module._id !== moduleId));
  // };
  // const updateModule = () => {
  //   setModules(
  //     modules.map((m) => {
  //       if (m._id === module._id) {
  //         return module;
  //       } else {
  //         return m;
  //       }
  //     })
  //   );
  // }
  

  const modules = useSelector((state) => state.modulesReducer.modules);
  const module = useSelector((state) => state.modulesReducer.module);
  const dispatch = useDispatch();
  const handleUpdateModule = async () => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };
  const handleDeleteModule = (moduleId) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModule(moduleId));
    });
  };

  const handleAddModule = () => {
    client.createModule(courseId, module).then((module) => {
      dispatch(addModule(module));
    });
  };

  useEffect(() => {
    client.findModulesForCourse(courseId)
      .then((modules) =>
        dispatch(setModules(modules))
    );
  }, [courseId]);





  return (
    <ul className="list-group module-style list-height">
      <li className="list-group-item">
        <button className="btn btn-success me-2 ms-2 float-end"
        onClick={handleAddModule}>
              Add</button>
        <button className="btn btn-primary me-2 ms-2 float-end" onClick={handleUpdateModule}>
                Update
        </button>

        <input className="me-2 ms-2" value={module.name}
          onChange={(e) => dispatch(setModule({
            ...module, name: e.target.value }))}
        />
        <br></br>
        <textarea className="me-2 ms-2 mt-2" value={module.description}
          onChange={(e) => dispatch(setModule({
            ...module, description: e.target.value }))}
        />
      </li>

      {
       modules
         .filter((module) => module.course === courseId)
         .map((module, index) => (
           <li key={index} className="list-group-item list-group-item-action">
            <button className="btn btn-success me-2 ms-2 float-end"
              onClick={() =>  dispatch(setModule(module))}>
              Edit
            </button>

            <button className="btn btn-danger me-2 ms-2 float-end"
              onClick={() => handleDeleteModule(module._id)}>
              Delete
            </button>

             <h5>
             <BsGripVertical className="me-2"/>
                {module.name}

                {/* <BiDotsVerticalRounded className="float-end me-2" />
                <AiOutlinePlus className="float-end me-2" />
                <BsFillCheckCircleFill className="float-end green-style me-2" /> */}
                
               
            </h5>
             <p className="ms-4">{module.description}</p>
             {
                module.lessons && (
                    <ul className="list-group">
                        {
                            module.lessons.map((lesson, index) => (
                                <li key={index} className="list-group-item list-group-item-secondary">
                                    <h4>{lesson.name}</h4>
                                    <p>{lesson.description}</p>
                                </li>
                            ))
                        }
                    </ul>
                )
             }
           </li>
      ))
      }
    </ul>
  );
}
export default ModuleList;