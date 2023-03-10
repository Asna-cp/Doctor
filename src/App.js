import React from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Doctors from "./scenes/doctors";
import Patients from "./scenes/patients";
import AddDoctors from "./scenes/addDoctors";
import Appointments from "./scenes/appointment";
import Treatments from "./scenes/addTreatments";
import ViewTreatments from "./scenes/addTreatments/viewTreatments";
import Login from "./scenes/login/login";

function App() {
  const [theme, colorMode] = useMode();
  const adminToken = localStorage.getItem("adminToken");

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* {!adminToken ? (
            <Routes>
              <Route path="/" element={<Login />} />
            </Routes>
          ) : ( */}
            <>
              <Sidebar />
              <main className="content">
                <Topbar />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/doctors" element={<Doctors />} />
                  <Route path="/patients" element={<Patients />} />
                  <Route path="/addDoctors" element={<AddDoctors />} />
                  <Route path="/appointments" element={<Appointments />} />
                  <Route path="/addTreatments" element={<Treatments />} />
                  <Route path="/viewTreatments" element={<ViewTreatments />} />
                </Routes>
              </main>
            </>
          {/* )} */}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;