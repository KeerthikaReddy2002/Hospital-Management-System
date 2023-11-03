import React, { useState, useEffect } from "react";
import "../styles.css";
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

function PatientDetails() {

    const [data, setData] = useState([]);
    const getData = async () => {
        const info = await axios.get("https://raja-hospital.onrender.com/patientDetails");
        // console.log(info.data);
        setData(data => [...data, info.data]);
    };

    useEffect(() => {
        getData();
    }, []);


    const [filterInfo, setFilter] = useState({
        date: "",
        mobile: "",
        selectDoctor: ""
    });

    const handleChange = event => {
        let { name, value } = event.target
        setFilter({
            ...filterInfo,
            [name]: value
        })
    }

    var val = data.length;
    var info = [];

    const Filter = () => {
        // console.log(filterInfo)
        if (filterInfo.mobile !== "" && filterInfo.mobile.length !== 10) {
            alert("Mobile Number must be 10 digits");
            return;
        }
        try {
            axios.post("https://raja-hospital.onrender.com/patientDetailsFilter", filterInfo)
                .then(response => {
                    setData(data => [...data, response.data.patientInfo]);
                    info = [];
                    val = data.length;
                    // console.log(data);
                }
                )
        }
        catch (err) {
            console.log(err);
        }
    }

    const reset = () => {
        setFilter({
            date: "",
            mobile: "",
            selectDoctor: ""
        })
        getData();
    }


    return (
        <div className="content">
            <br></br><br></br>
            <h1>Patient Details</h1>
            <br></br>


            {
                data[val - 1]?.forEach((patient) => {
                    info.push(<tr>
                        <td>{patient.FirstName}</td>
                        <td>{patient.FamilyName}</td>
                        <td>{patient.Gender}</td>
                        <td>{patient.Age}</td>
                        <td>{patient.Phone}</td>
                        <td>{patient.Doctor}</td>
                        <td>{patient.Date}</td>
                        <td>{patient.Time}</td>
                    </tr>)
                })
            }


            <form className="container mt-3 mb-3" method="POST">
                <Row className="">
                    <div className="col">
                        <Form.Group >
                            <Form.Label>Date</Form.Label>
                            <Form.Control onChange={handleChange} type="date" name="date" className="form-control" />
                        </Form.Group>
                    </div>
                    <div className="col">
                        <Form.Group >
                            <Form.Label>Filter First Name</Form.Label>
                            <Form.Control onChange={handleChange} type="text" name="mobile" className="form-control" placeholder="Enter Mobile Number" minLength={10} maxLength={10} />
                        </Form.Group>
                    </div>
                    <div className="col">
                        <Form.Group >
                            <Form.Label>Select Doctor</Form.Label>
                            <Form.Select onChange={handleChange} className="form-control" name="selectDoctor" required>
                                <option value="">Choose Doctor</option>
                                <option value="Dr. RS Chalam">Dr. RS Chalam</option>
                                <option value="Dr. Ravi">Dr. Ravi</option>
                                <option value="Dr. Narasimha">Dr. Narasimha</option>
                                <option value="Dr. Lakshmi">Dr. Lakshmi</option>
                            </Form.Select>
                        </Form.Group>
                    </div>

                </Row>
                <br></br>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button onClick={Filter} type="button" class="btn btn-dark">Filter</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input onClick={reset} class="btn btn-primary" type="reset" value="Reset"></input>
                </div>
            </form>

            <br></br>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Family Name</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Age</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Doctor</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {info}
                </tbody>
            </table>
        </div>
    );
}

export default PatientDetails;