import React from "react";
import { Link } from "react-router-dom";
import strings from "../lang/Lang";
import "./Dashboard.css";

// Sidebar component
const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/">{strings.login}</Link>
        </li>
        <li>
          <Link to="/Booking">{strings.booking}</Link>
        </li>
        <li>
          <Link to="/currency-converter">{strings.currency_converter}</Link>
        </li>
        <li>
          <Link to="/Language">{strings.language}</Link>
        </li>
        <li>
          <Link to="/UserGeneratedContentList">
            {strings.user_generated_content}
          </Link>
        </li>
        <li>
          <Link to="/LocalTransportation">{strings.local_transportation}</Link>
        </li>
        <li>
          <Link to="/Weather">Weather{strings.weather}</Link>
        </li>
        <li>
          <Link to="/Maps">Maps{strings.maps}</Link>
        </li>
        <li>
          <Link to="/destination-details">{strings.destination_details}</Link>
        </li>
    
        <li> {/* Added missing <li> tag */}
          <Link to="/socialSharing">Social Sharing</Link>
        </li>
      </ul>
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <Sidebar />
    </div>
  );
};

export default Dashboard;
