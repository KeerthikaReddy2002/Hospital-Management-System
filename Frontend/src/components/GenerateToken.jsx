import React, { useState } from "react";
import "../styles.css";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function GenerateToken() {
    const minAge = 0;
    const maxAge = 120;
    // const [age, setAge] = useState(1);

    const [patientInfo, setPatientInfo] = useState({
        first_name: "",
        family_name: "",
        gender: "Male",
        age: 0,
        mobile: 0,
        selectDoctor: "Dr. RS Chalam"
    });

    const handleChange = event => {
        let { name, value } = event.target
        setPatientInfo({
            ...patientInfo,
            [name]: value
        })
    }

    const navigate = useNavigate();
    const postPatientInfo = () => {
        // console.log(patientInfo)
        try {
            if (patientInfo.age < minAge || patientInfo.age > maxAge) {
                alert("Age must be between " + minAge + " and " + maxAge);
                return;
            }
            else if (patientInfo.first_name === "") {
                alert("First Name is required");
                return;
            }
            else if (patientInfo.mobile.length !== 10) {
                alert("Mobile Number must be 10 digits");
                return;
            }
            else if (patientInfo.family_name === "") {
                alert("Family Name is required");
                return;
            }

            axios.post("https://raja-hospital.onrender.com/patientInfo", patientInfo)
                .then(response => {
                    alert(response.data.message);
                    navigate("/TokenView", { state: { id: response.data.id, firstName: response.data.firstName, doctorName: response.data.doctorName, token: response.data.token } });
                }
                )
        }
        catch (error) {
            console.error(error.response.data);
        }

    };

    return (
        <div className="token content">
            <br></br>
            <h1>Add Patient Details</h1>
            <br></br>

            <form className="container mt-3 mb-3" method="POST">
                <Row className="mb-2 sm-4 ">
                    <Form.Group className="col col-sm-6">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control onChange={handleChange} type="name" name="first_name" placeholder="Enter First Name" className="form-control" required />
                    </Form.Group>
                    <Form.Group className="col col-sm-6">
                        <Form.Label>Family Name</Form.Label>
                        <Form.Control onChange={handleChange} type="name" name="family_name" placeholder="Enter Family Name" className="form-control" />
                    </Form.Group>
                </Row>

                <Row className="mb-2 sm-4">
                    <Form.Group className="col col-sm-6">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select onChange={handleChange} className="form-control" name="gender" required>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="col col-sm-6" >
                        <Form.Label>Age</Form.Label>
                        <Form.Control onChange={handleChange} required className="form-control" type="number" name="age" placeholder="Enter age" min={0} max="120" />
                    </Form.Group>
                </Row>


                <Row className="mb-3">
                    <Form.Group className="col">
                        <Form.Label>Mobile Number</Form.Label>
                        <InputGroup>
                            <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                            <Form.Control onChange={handleChange} aria-label="Mobile Number" type="text" aria-describedby="basic-addon1" className="form-control" name="mobile" placeholder="Enter Phone Number" required minLength={10} maxLength={10} />
                        </InputGroup>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group className="col">
                        <Form.Label>Choose the consulting doctor</Form.Label>
                        <Form.Select onChange={handleChange} className="form-control" name="selectDoctor" required>
                            <option value="Dr. RS Chalam">Dr. RS Chalam</option>
                            <option value="Dr. Ravi">Dr. Ravi</option>
                            <option value="Dr. Narasimha">Dr. Narasimha</option>
                            <option value="Dr. Lakshmi">Dr. Lakshmi</option>
                        </Form.Select>
                    </Form.Group>

                </Row>



                <br></br><br></br>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button onClick={postPatientInfo} type="button" className="butToken">Generate Token</button>
                </div>

            </form>

        </div>
    );
}

export default GenerateToken;