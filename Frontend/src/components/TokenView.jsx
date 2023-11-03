import React from "react";
import "../styles.css";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function TokenView() {

    const { state } = useLocation();
    const { id, firstName, doctorName, token } = state;

    const print = () => {
        let printContents = document.getElementById('toprint').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print(printContents);
        document.body.innerHTML = originalContents;
        window.location.reload(false);
    }

    const navigate = useNavigate();
    const handleClick = () => {
        try {
            axios.post("http://localhost:8000/tokenInfo", { id: id })
                .then(response => {
                    alert(response.data.message);
                    // console.log(response.data.patientInfo);
                    navigate("/printToken", { state: response.data.patientInfo });
                }
                )
        }
        catch (error) {
            console.error(error.response.data);
        }
    }
    return (
        <div className="token">
            <br></br><br></br>
            <h1 style={{ textAlign: "center" }}>Token Information</h1>
            <br></br><br></br>
            <div className="d-flex align-items-center justify-content-center">
                <div >
                    <div id="toprint" className="tokenDisplay row ">
                        <div className="col">
                            <br></br>
                            <h4 style={{ textAlign: "center" }}>Token Number</h4>
                            <h2 style={{ fontSize: "120px", textAlign: "center" }}>{token}</h2>
                        </div>
                        <div className="col">
                            <br></br>
                            <div className="row">
                                <br></br>
                                <h4 style={{ textAlign: "center" }}>Patient Name</h4>
                                <h2 style={{ textAlign: "center" }}>{firstName}</h2>
                            </div>
                            <br></br>
                            <div className="row">
                                <h4 style={{ textAlign: "center" }}>Doctor Name</h4>
                                <h2 style={{ textAlign: "center" }}>{doctorName}</h2>
                            </div>
                        </div>
                    </div>
                    <br></br><br></br>
                    <div className="" style={{ display: "flex", justifyContent: "center" }}>
                        <button onClick={handleClick} type="button" className="butToken">Generate Card</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={print} type="button" className="butToken">Print Token</button>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default TokenView;