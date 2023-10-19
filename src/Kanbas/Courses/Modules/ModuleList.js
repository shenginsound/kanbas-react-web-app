import React from "react";
import { useParams } from "react-router-dom";
import db from "../../Database";
import 'bootstrap/dist/css/bootstrap.css';
import "./style.css"

import {BsGripVertical} from "react-icons/bs"
import {BiDotsVerticalRounded} from "react-icons/bi"
import {AiOutlinePlus} from "react-icons/ai"
import {BsFillJournalBookmarkFill} from "react-icons/bs"
import {BsFillCheckCircleFill} from "react-icons/bs"


function ModuleList() {
  const { courseId } = useParams();
  const modules = db.modules;
  return (
    <ul className="list-group module-style list-height">
      {
       modules
         .filter((module) => module.course === courseId)
         .map((module, index) => (
           <li key={index} className="list-group-item list-group-item-action">
             <h5>
             <BsGripVertical className="me-2"/>
                {module.name}

                <BiDotsVerticalRounded className="float-end me-2" />
                <AiOutlinePlus className="float-end me-2" />
                <BsFillCheckCircleFill className="float-end green-style me-2" />
                
               
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