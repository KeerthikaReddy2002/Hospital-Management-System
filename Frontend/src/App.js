import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import GenerateToken from "./components/GenerateToken";
import { createTheme,  ThemeProvider} from '@mui/material/styles';
import NavBar from "./components/NavBar";
import TokenView from "./components/TokenView";
import PrintToken from "./components/printToken";
import 'bootstrap/dist/css/bootstrap.min.css';
import PatientDetails from "./components/PatientDetails";
import LabTest from "./components/LabTest";
import LabBill from "./components/LabBill";


const theme = createTheme({
  palette: {
    primary: {
      main: "#1D2656",
    },
    secondary: {
      main: "#56D7F3",
    },
  },
});
function App()
{
  return(
    <div className="App">
      <ThemeProvider theme = {theme}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route path="/generateToken"
            element={
              <>
                <NavBar />
                <GenerateToken />
              </>
                }
              />
              <Route path="/TokenView" element={<TokenView />}/>
              <Route path="/PrintToken" element={<PrintToken />}/>
              <Route path="/labBill" element={<LabBill />}/>

              <Route path="/patientDetails"
              element={
                <>
                  <NavBar />
                  <PatientDetails />
                </>
                  }
              />
              <Route path="/labTests"
              element={
                <>
                  <NavBar />
                  <LabTest />
                </>
                  }
              />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;