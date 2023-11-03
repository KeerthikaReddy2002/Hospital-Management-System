import React from "react";
import "../styles.css";
import CallIcon from '@mui/icons-material/Call';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

function PrintToken() {
    const navigate = useNavigate();
    function goHome() {
        navigate("/");
    }
    const { state } = useLocation();
    const { Age, Doctor, FirstName, Gender, Token } = state;

    const print = () => {
        let printContents = document.getElementById('card').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print(printContents);
        document.body.innerHTML = originalContents;
        window.location.reload(false);
    }

    return (
        <div className="token ">
            <HomeIcon onClick={goHome} className="homeIcon" color="primary" />
            <br></br><br></br>
            <h1 style={{ textAlign: "center", fontFamily: 'Playfair Display', letterSpacing: "8px" }}>Receipt</h1>
            <br></br>
            <div className="printCard " id="card" >
                <hr className="boldBlue"></hr>
                <br></br>
                <div className="parentTele alignMUI">
                    <CallIcon color="primary" />
                    <span>
                        <h5 className="child" >&nbsp;:&nbsp;0883-2423557</h5>
                    </span>
                </div>
                <h1 className="hospitalName">RAJA HOSPITAL</h1>
                <br></br>
                <hr className="boldBlue"></hr>
                <br></br>
                <h5>Near Kotipalli Bus Stand, T.Nagar, RAJAMAHENDRAVARAM</h5>
                <br></br>
                <h5 style={{ textAlign: "right", paddingRight: "15%" }}><b>Token:</b> {Token}</h5>
                <br></br><br></br>
                <div style={{ textAlign: "left", paddingLeft: "12%" }} className="row">
                    <div className="col-sm">
                        <div className="row">
                            <h5><b>Patient Name:</b> {FirstName}</h5>
                        </div>
                        <div className="row">
                            <h5><b>Age:</b> {Age}</h5>
                        </div>
                        <div className="row">
                            <h5><b>Gender:</b> {Gender}</h5>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="row">
                            <h5><b>Doctor Name:</b> {Doctor}</h5>
                        </div>
                    </div>

                </div>
                <br></br><br></br><br></br><br></br>
                <br></br><br></br><br></br><br></br>
                <br></br><br></br><br></br><br></br>
                <br></br><br></br><br></br><br></br>
                <br></br><br></br><br></br><br></br>
                <br></br><br></br><br></br><br></br>
            </div>
            <br></br><br></br>
            <div className="" style={{ display: "flex", justifyContent: "center" }}>
                <button onClick={print} type="button" className="butToken">Print Card</button>
            </div>
            <br></br><br></br>
        </div>
    );
}

export default PrintToken;