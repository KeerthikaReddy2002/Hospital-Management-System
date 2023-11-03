import React from 'react';
import "../styles.css";
import CallIcon from '@mui/icons-material/Call';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';


function LabBill() {
    var info = [];
    const navigate = useNavigate();
    function goHome() {
        navigate("/");
    }
    const print = () => {
        let printContents = document.getElementById('printCard').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print(printContents);
        document.body.innerHTML = originalContents;
        window.location.reload(false);
    }
    const { state } = useLocation();

    return (
        <div className="token labBill">
            <HomeIcon onClick={goHome} className="homeIcon" color="primary" />

            {
                Object.keys(state.testInfo).map((key) => {
                    info.push(
                        <tr>
                            <td>{state.testInfo[key].Name}</td>
                            <td>{state.testInfo[key].cost}</td>
                        </tr>
                );}
                )}

            <br></br>
            <h1 style={{ textAlign: "center", fontFamily: 'Playfair Display', letterSpacing: "8px" }}>Lab Bill</h1>
            <div className='printCard' id="printCard">
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
                <h5 style={{ textAlign: "center" }}>Near Kotipalli Bus Stand, T.Nagar, RAJAMAHENDRAVARAM</h5>
                <br></br>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Test name</th>
                            <th scope="col">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {info}
                    </tbody>
                    <br></br>
                    <thead>
                        <tr>
                            <th scope="col">Total Amount</th>
                            <th scope='col'>{state.total}</th>
                        </tr>
                    </thead>
                </table>


            </div>
            <br></br><br></br>
            <div className="" style={{ display: "flex", justifyContent: "center" }}>
                <button onClick={print} type="button" className="butToken">Print Bill</button>
            </div>
            <br></br><br></br><br></br>
        </div>
    );
}

export default LabBill;