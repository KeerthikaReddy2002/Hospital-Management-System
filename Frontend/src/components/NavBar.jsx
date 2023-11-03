import React from "react";
import "../navbar.css";
import TokenIcon from '@mui/icons-material/Token';
import PeopleIcon from '@mui/icons-material/People';
import { NavLink, useNavigate } from 'react-router-dom'
import Logo from "../images/Logo.png";
import ScienceIcon from '@mui/icons-material/Science';
import HomeIcon from '@mui/icons-material/Home';

function NavBar() {
    const navigate = useNavigate();
    function goHome() {
        navigate("/");
    }
    return (
        <div className="sidebar">
            <HomeIcon onClick={goHome} className="homeIcon" color="secondary" />
            <br></br>
            <br></br>
            <img src={Logo} className="logo" alt="logo-img" />
            <br></br>
            <br></br>
            <br></br>
            <NavLink
                to='/generateToken'
                activeClassName="active"
            >
                <div className="alignMUI">
                    <TokenIcon color="secondary" />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>Generate Token</span>
                </div>
            </NavLink>
            <NavLink activeClassName="active" to='/patientDetails' >
                <div className="alignMUI">
                    <PeopleIcon color="secondary" />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>Patient Details</span>
                </div>
            </NavLink>
            <NavLink activeClassName="active" to='/labTests' >
                <div className="alignMUI">
                    <ScienceIcon color="secondary" />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>Lab Tests</span>
                </div>
            </NavLink>
        </div>
    );
}

export default NavBar;