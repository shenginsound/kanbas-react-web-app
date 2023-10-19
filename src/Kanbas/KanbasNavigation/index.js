import { Link, useLocation } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { RiDashboard3Fill } from "react-icons/ri";
import { FaBook } from "react-icons/fa";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import {BsFillInboxFill} from "react-icons/bs";
import {AiFillClockCircle} from "react-icons/ai";
import {BsPlayBtnFill} from "react-icons/bs";
import {IoExitOutline} from "react-icons/io5";
import {AiOutlineQuestionCircle} from "react-icons/ai"
import "./index.css";



function KanbasNavigation() {
  const links = ["Account", "Dashboard", "Courses", "Calendar", "Inbox",
  "History", "Studio","Commons", "Help"];

  const linkToIconMap = {
    Account: <BiUserCircle className="wd-icon" />,
    Dashboard: <RiDashboard3Fill className="wd-icon" />,
    Courses: <FaBook className="wd-icon" />,
    Calendar: <BsFillCalendar2WeekFill className="wd-icon" />,
    Inbox: <BsFillInboxFill className="wd-icon" />,
    History: <AiFillClockCircle className="wd-icon" />,
    Studio: <BsPlayBtnFill className="wd-icon" />,
    Commons:<IoExitOutline className="wd-icon" />,
    Help: <AiOutlineQuestionCircle className="wd-icon"/>
    

  };

  const { pathname } = useLocation();
  return (
    <div className="list-group wd-kanbas-navigation" style={{ width: 150 }}>
        <img src="/images/n.jpg" alt="" className="image-aligner ms-4"></img>
      {links.map((link, index) => (
        <Link
          key={index}
          to={`/Kanbas/${link}`}
          className={`list-group-item ${pathname.includes(link) && "active"}`}
        >
          {linkToIconMap[link]}
          <br/>
          {link}
        </Link>
      ))}
    </div>
  );
}
export default KanbasNavigation;