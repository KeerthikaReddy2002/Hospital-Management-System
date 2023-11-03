import React, { useState, useEffect } from "react";
import "../styles.css";
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from "axios";

function LabTest() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [tests, setTests] = useState({
        selectPatient: "",
        Hemogram: false,
        HB: false,
        MP: false,
        MF: false,
        BloodGroup: false,
        WidalTest: false,
        PregnancyTest: false,
        RBS: false,
        Urea: false,
        SCreatinine: false,
        UCA: false,
        TCholesterol: false,
        LipidProfile: false,
        TBilirubin: false,
        LFT: false,
        HIV: false,
        HBSAG: false,
        HCV: false,
        Dengue: false,
        SAmylase: false,
        Electrolytes: false,
        RAFactor: false,
        CRP: false,
        ASO: false,
        Calcium: false,
        UricAcid: false,
        ECG: false,
        VDRL: false,
        Thyroid: false,
        PopS: false,
        PopL: false,
        XRay: false,
        SpinalXRay: false,
        SingleXPose: false,
    });
    const getData = async () => {
        const info = await axios.get("http://localhost:8000/patientDetails");
        // console.log(info.data.patientInfo);
        setData(data => [...data, info.data]);
    };

    useEffect(() => {
        getData();
    }, []);

    function handleChange(event) {
        if (event.target.type === "checkbox") {
            setTests({ ...tests, [event.target.name]: event.target.checked });
        }
        else {
            setTests({ ...tests, [event.target.name]: event.target.value });
        }

    }

    function postLabDetails() {
        // Post the lab details to the database
        if (tests.selectPatient === "") {
            alert("Please select a patient");
            return;
        }
        axios.post("http://localhost:8000/labDetails", tests)
            .then(res => {
                alert(res.data.message);
                // console.log(res.data.total)
                navigate('/labBill', { state: { testInfo: res.data.test, total: res.data.total } });
            })
    }

    var val = data.length;
    var info = [];

    return (
        <div className="token content">
            <br></br><br></br>
            <h1 className="">Lab Test</h1>
            {
                // Push all of the patient details into the array info using for loop code
                data[val - 1]?.forEach(element => {
                    info.push(<option value={element._id} name="Name">{element.FirstName}</option>);
                })
            }
            <form className="container mt-3 mb-3" method="POST">
                <Row className="mb-3">
                    <Form.Group className="col">
                        <Form.Label>Choose the Patient</Form.Label>
                        <Form.Select onChange={handleChange} className="form-control" name="selectPatient" required>
                            <option value="" disabled selected>Select Patient</option>
                            {info}
                        </Form.Select>
                    </Form.Group>
                </Row>
                <table>
                    <tr>
                        <td className="checkboxMargin">
                            <Form.Check
                                inline
                                label="Hemogram"
                                name="Hemogram"
                                className="checkboxMargin"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                        <td className="checkboxMargin">
                            <Form.Check
                                inline
                                label="HB"
                                name="HB"
                                className="checkboxMargin"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                        <td className="checkboxMargin">
                            <Form.Check
                                inline
                                label="M.P"
                                name="MP"
                                className="checkboxMargin"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Form.Check
                                inline
                                label="M.F"
                                name="MF"
                                className="checkboxMargin"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                        <td>
                            <Form.Check
                                inline
                                label="Blood Group"
                                name="BloodGroup"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                        <td>
                            <Form.Check
                                inline
                                label="Widal Test"
                                name="WidalTest"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Form.Check
                                inline
                                label="Pregnancy Test"
                                name="PregnancyTest"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                        <td>
                            <Form.Check
                                inline
                                label="RBS"
                                name="RBS"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                        <td>
                            <Form.Check
                                inline
                                label="Urea"
                                name="Urea"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Form.Check
                                inline
                                label="S.Creatinine"
                                name="SCreatinine"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                        <td>
                            <Form.Check
                                inline
                                label="U-CA"
                                name="UCA"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                        <td>
                            <Form.Check
                                inline
                                label="T. Cholesterol"
                                name="TCholesterol"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Form.Check
                                inline
                                label="Lipid Profile"
                                name="LipidProfile"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                        <td>
                            <Form.Check
                                inline
                                label="T.Bilirubin"
                                name="TBilirubin"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                        <td>
                            <Form.Check
                                inline
                                label="L.F.T"
                                name="LFT"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Form.Check
                                inline
                                label="HIV"
                                name="HIV"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                        <td>
                            <Form.Check
                                inline
                                label="HBSAG"
                                name="HBSAG"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                        <td>
                            <Form.Check
                                inline
                                label="HCV"
                                name="HCV"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Form.Check
                                inline
                                label="Dengue"
                                name="Dengue"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                        <td>
                            <Form.Check
                                inline
                                label="S. Amylase"
                                name="SAmylase"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                        <td>
                            <Form.Check
                                inline
                                label="Electrolytes"
                                name="Electrolytes"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Form.Check
                                inline
                                label="RA Factor"
                                name="RAFactor"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                        <td>
                            <Form.Check
                                inline
                                label="CRP"
                                name="CRP"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                        <td>
                            <Form.Check
                                inline
                                label="ASO"
                                name="ASO"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Form.Check
                                inline
                                label="Calcium"
                                name="Calcium"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                        <td>
                            <Form.Check
                                inline
                                label="Uric Acid"
                                name="UricAcid"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                        <td>
                            <Form.Check
                                inline
                                label="ECG"
                                name="ECG"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Form.Check
                                inline
                                label="VDRL"
                                name="VDRL"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                        <td>
                            <Form.Check
                                inline
                                label="Thyroid"
                                name="Thyroid"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                        <td>
                            <Form.Check
                                inline
                                label="Pop(S)"
                                name="PopS"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Form.Check
                                inline
                                label="Pop(L)"
                                name="PopL"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                        <td>
                            <Form.Check
                                inline
                                label="X-Ray"
                                name="XRay"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                        <td>
                            <Form.Check
                                inline
                                label="Spinal X-Ray"
                                name="SpinalXRay"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Form.Check
                                inline
                                label="Single X-Pose"
                                name="SingleXPose"
                                type="checkbox"
                                onClick={handleChange}
                            />
                        </td>
                    </tr>

                </table>

                <br></br><br></br>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button onClick={postLabDetails} type="button" className="butToken">Generate Lab Bill</button>
                </div>
            </form>
        </div>
    );
}

export default LabTest;