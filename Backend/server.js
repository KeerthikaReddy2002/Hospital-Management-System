const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');
require('dotenv').config();

let dateObject = new Date();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// Database
// mongoose
//     .connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.2/patientTable')
//     .then(() => {
//         console.log('Connected to database!');
//     })
//     .catch(() => {
//         console.log('Connection failed!');
//     });

mongoose
    .connect(`mongodb+srv://rajahospital:${process.env.PASSWORD}@cluster0.gbmk4jq.mongodb.net/patientTable?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });



const patientSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    FamilyName: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    },
    Phone: {
        type: String,
        required: true
    },
    Doctor: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        required: true
    },
    Time: {
        type: String,
        required: true
    },
    Token: {
        type: Number,
        required: true
    },
    Tests: {
        type: Array,
        required: true
    },
});

TestCosts = {
    Hemogram:
    {
        cost: 400,
        Name: "Hemogram"
    },
    HB: {
        cost: 70,
        Name: "HB"
    },
    MP: {
        cost: 260,
        Name: "MP"
    },
    MF: {
        cost: 50,
        Name: "MF"
    },
    BloodGroup: {
        cost: 100,
        Name: "Blood Group"
    },
    WidalTest: {
        cost: 250,
        Name: "Widal Test"
    },
    PregnancyTest: {
        cost: 150,
        Name: "Pregnancy Test"
    },
    RBS: {
        cost: 70,
        Name: "RBS"
    },
    Urea: {
        cost: 150,
        Name: "Urea"
    },
    SCreatinine: {
        cost: 150,
        Name: "S. Creatinine"
    },
    UCA: {
        cost: 120,
        Name: "UCA"
    },
    TCholesterol: {
        cost: 150,
        Name: "T. Cholesterol"
    },
    LipidProfile: {
        cost: 500,
        Name: "Lipid Profile"
    },
    TBilirubin: {
        cost: 150,
        Name: "T. Bilirubin"
    },
    LFT: {
        cost: 700,
        Name: "LFT"
    },
    HIV: {
        cost: 400,
        Name: "HIV"
    },
    HBSAG: {
        cost: 300,
        Name: "HBSAG"
    },
    HCV: {
        cost: 500,
        Name: "HCV"
    },
    Dengue: {
        cost: 1150,
        Name: "Dengue"
    },
    SAmylase: {
        cost: 600,
        Name: "S. Amylase"
    },
    Electrolytes: {
        cost: 500,
        Name: "Electrolytes"
    },
    RAFactor: {
        cost: 370,
        Name: "RA. Factor"
    },
    CRP: {
        cost: 370,
        Name: "CRP"
    },
    ASO: {
        cost: 350,
        Name: "ASO"
    },
    Calcium: {
        cost: 280,
        Name: "Calcium"
    },
    UricAcid: {
        cost: 250,
        Name: "Uric Acid"
    },
    ECG: {
        cost: 250,
        Name: "ECG"
    },
    VDRL: {
        cost: 180,
        Name: "VDRL"
    },
    Thyroid: {
        cost: 550,
        Name: "Thyroid"
    },
    PopS: {
        cost: 800,
        Name: "Pop (S)"
    },
    PopL: {
        cost: 1000,
        Name: "Pop (L)"
    },
    XRay: {
        cost: 500,
        Name: "X-Ray"
    },
    SpinalXRay: {
        cost: 600,
        Name: "Spinal X-Ray"
    },
    SingleXPose: {
        cost: 350,
        Name: "Single XPose"
    }
}

const Patient = new mongoose.model('Patient', patientSchema);

let count = 0;

function schedulereset() {
    // get current time
    let reset = new date();
    // update the hours, mins, secs to the 24th hour (which is when the next day starts)
    reset.sethours(24, 0, 0, 0);
    // calc amount of time until restart
    let t = reset.gettime() - date.now();
    settimeout(function () {
        // reset variable
        count = 0;
        // schedule the next variable reset
        schedulereset();
    }, t);
}

// Routes
app.get('/', (req, res) => {
    res.json({ message: "Hello from server!" });
});
app.post('/patientInfo', (req, res) => {
    const { first_name, family_name, gender, age, mobile, selectDoctor } = req.body;
    let date = ("0" + dateObject.getDate()).slice(-2);
    let month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
    let year = dateObject.getFullYear();
    let hours = dateObject.getHours();
    let minutes = dateObject.getMinutes();
    let seconds = dateObject.getSeconds();

    count = count + 1;

    const newPatient = new Patient({
        FirstName: first_name,
        FamilyName: family_name,
        Gender: gender,
        Age: age,
        Phone: mobile,
        Doctor: selectDoctor,
        Date: year + "-" + month + "-" + date,
        Time: hours + ":" + minutes + ":" + seconds,
        Token: count,
    });
    newPatient.save();
    res.json({ message: "Patient info saved!", id: newPatient._id, firstName: first_name, doctorName: selectDoctor, token: count });
});

app.post('/tokenInfo', async (req, res) => {
    // console.log(req.body.id);
    var id = req.body.id;
    const patients = await Patient.findById(id);
    // console.log(patients);
    res.json({ message: "Token info saved!", patientInfo: patients });
});

app.get('/patientDetails', async (req, res) => {

    var tempDate = new Date();
    let date = ("0" + tempDate.getDate()).slice(-2);
    let month = ("0" + (tempDate.getMonth() + 1)).slice(-2);
    let year = tempDate.getFullYear();
    var currDate = year + '-' + month + '-' + date;

    tempDate.setDate(tempDate.getDate() - 6);
    let date1 = ("0" + tempDate.getDate()).slice(-2);
    let month1 = ("0" + (tempDate.getMonth() + 1)).slice(-2);
    let year1 = tempDate.getFullYear();
    var finalDate = year1 + '-' + month1 + '-' + date1;

    // console.log(currDate);
    // console.log(finalDate);

    // {Date: {$gte: "2023-10-26" , $lte:"2024-01-02"}}

    const patients = await Patient.find({
        Date: {
            $gte: finalDate,
            $lte: currDate
        }
    }).sort({ Date: 'asc' });

    // const patients = await Patient.find({});
    res.send(patients);
});

app.post('/patientDetailsFilter', async (req, res) => {
    const { date, mobile, selectDoctor } = req.body;

    // console.log(date);
    if (date == "" && mobile != "" && selectDoctor == "") {
        const patients = await Patient.find({ Phone: mobile });
        // console.log(patients);
        res.json({ message: "Mobile filter", patientInfo: patients });
    }
    else if (date == "" && mobile == "" && selectDoctor != "") {
        const patients = await Patient.find({ Doctor: selectDoctor });
        res.json({ message: "Doctor filter", patientInfo: patients });
    }
    else if (date != "" && mobile == "" && selectDoctor == "") {
        const patients = await Patient.find({ Date: date });
        res.json({ message: "Date filter", patientInfo: patients });
    }
    else if (date == "" && mobile != "" && selectDoctor != "") {
        const patients = await Patient.find({ Phone: mobile, Doctor: selectDoctor });
        res.json({ message: "Mobile and doctor filter", patientInfo: patients });
    }
    else if (date != "" && mobile != "" && selectDoctor == "") {
        const patients = await Patient.find({ Date: date, Phone: mobile });
        res.json({ message: "Date and mobile filter", patientInfo: patients });
    }
    else if (date != "" && mobile == "" && selectDoctor != "") {
        const patients = await Patient.find({ Date: date, Phone: mobile, Doctor: selectDoctor });
        res.json({ message: "Date and doctor filter", patientInfo: patients });
    }
    else if (date == "" && mobile == "" && selectDoctor == "") {
        const patients = await Patient.find({});
        res.json({ message: "No filter", patientInfo: patients });
    }
    else {
        res.json({ message: "No filter" });
    }
});


app.post('/labDetails', async (req, res) => {
    testInfo = req.body;
    const patients = await Patient.findById(testInfo["selectPatient"]);
    temp = [];
    costOfTests = {};
    for (let key in testInfo) {
        if (testInfo[key] == true) {
            // console.log(key)
            temp.push(key);
        }
    }
    var tot = 0;
    if (temp.length > 0) {
        for (let i = 0; i < temp.length; i++) {
            patients.Tests.push(temp[i]);
            costOfTests[temp[i]] = TestCosts[temp[i]];
            tot = tot + TestCosts[temp[i]]["cost"];
        }
        const result = await patients.save();
    }
    // console.log(patients.Tests);

    res.json({ message: "Lab details saved!", test: costOfTests, total: tot });
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});