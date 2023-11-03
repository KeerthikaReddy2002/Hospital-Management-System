import React from "react";
import "../styles.css";
import CallIcon from '@mui/icons-material/Call';
import Button from "./Button";

function Home() {
    return (
        <div className="home">
            <br></br>
            <br></br>
            <br></br>
            <div className="whiteBox">
                <br></br>
                <div className="parentTele alignMUI">
                    <CallIcon color="primary" />
                    <span>
                        <h5 className="child" >&nbsp;:&nbsp;0883-2423557</h5>
                    </span>
                </div>
                <h1 className="hospitalName">RAJA HOSPITAL</h1>
                <br></br>
                <h5 style={{ textAlign: "center" }}>Near Kotipalli Bus Stand, T. Nagar, RAJAMAHENDRAVARAM</h5>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="homeButtons">
                <div >
                    <Button
                        text="New Patient"
                        goto="generateToken"
                        name="generateToken"
                    />
                </div>
                <div >
                    <Button
                        text="Patient Details"
                        goto="patientDetails"
                        name="patientDetails"
                    />
                </div>
                <div >
                    <Button
                        text="Lab Tests"
                        goto="labTests"
                        name="labTests"
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;