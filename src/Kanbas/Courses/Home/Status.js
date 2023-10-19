
import {TbFileImport} from "react-icons/tb"
import {FaFileImport} from "react-icons/fa"
import {BiTargetLock} from "react-icons/bi"
import {BiSolidBarChartAlt2} from "react-icons/bi"
import {GrAnnounce} from "react-icons/gr"
import {AiOutlineBell} from "react-icons/ai"
import "./Stylee.css";
import ToDoList from "./ToDoList"

function Status() {
    const ImportExtistingContent = () => {
        console.log("Actually collapseALL");
    };
    

        
    return (
        <div>
            <div>
            <button onClick={ImportExtistingContent} className="btn btn-secondary thbutton me-2 mb-2" style={{textAlign: 'left'}}>
            <TbFileImport className="me-1"/>Import Extisting Content
            </button>
            </div>
            <div>
            <button onClick={ImportExtistingContent} className="btn btn-secondary thbutton me-2 mb-2" style={{textAlign: 'left'}}>
            <FaFileImport className="me-1"/>Import Extisting Content
            </button>
            </div>
            <div>
            <button onClick={ImportExtistingContent} className="btn btn-secondary thbutton me-2 mb-2" style={{textAlign: 'left'}}>
            <BiTargetLock className="me-1"/>Choose Home Page
            </button>
            </div>
            <div>
            <button onClick={ImportExtistingContent} className="btn btn-secondary thbutton me-2 mb-2" style={{textAlign: 'left'}}>
            <BiSolidBarChartAlt2 className="me-1"/>View Course Stream
            </button>
            </div>
            <div>
            <button onClick={ImportExtistingContent} className="btn btn-secondary thbutton me-2 mb-2" style={{textAlign: 'left'}}>
            <GrAnnounce className="me-1"/>New Announcement
            </button>
            </div>
            <div>
            <button onClick={ImportExtistingContent} className="btn btn-secondary thbutton me-2 mb-2" style={{textAlign: 'left'}}>
            <BiSolidBarChartAlt2 className="me-1"/>New Analytics
            </button>
            </div>
            <div>
            <button onClick={ImportExtistingContent} className="btn btn-secondary thbutton me-2 mb-2" style={{textAlign: 'left'}}>
            <AiOutlineBell className="me-1"/>View Course Notifications
            </button>
            </div>
            
            
            
            

        </div>

    );
}

export default Status;
