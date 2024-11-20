import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LearnPage from "./Pages/LearnPage.tsx";
import ADWN from "./Pages/Adwn.tsx";
import CodingCompetition from "./Pages/CodingCompetitiopn.tsx";
import HomePage from "./Pages/HomePage.tsx";
import UserDashboard from "./Pages/UserDashboard.tsx";
import Profile from "./Pages/Profile.tsx";
import Codingpage from "./Pages/Codingpage.tsx";
import LoginPage from "./Pages/LoginPage.tsx";
import SignUpPage from "./Pages/SignUpPage.tsx";
import TechnicalInterviewAnalysis from "./Pages/TechnicalInterviewAnalysis.tsx";
import StudyGroups from "./Pages/StudyGroups.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/interviews" element={<ADWN />} />
        <Route path="/battles" element={<CodingCompetition />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<UserDashboard />} />
        <Route path="/test" element={<Profile />} />
        <Route path="/coding" element={<Codingpage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/tech" element={<TechnicalInterviewAnalysis />} />
        <Route path="/study" element={<StudyGroups />} />
      </Routes>
    </Router>
  );
}

export default App;
