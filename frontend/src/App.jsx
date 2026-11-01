import { useState } from "react";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Students from "./components/Students";
import Teachers from "./components/Teachers";
import Attendance from "./components/Attendance";
import Fees from "./components/Fees";
import Examinations from "./components/Examinations";
import Notices from "./components/Notices";
import Settings from "./components/Settings";

// New interfaces
import StudentInterface from "./components/StudentInterface";
import TeacherInterface from "./components/TeacherInterface";

import "./App.css";

function App() {
  const [role, setRole] = useState(null); // null | "admin" | "teacher" | "student"
  const [activePage, setActivePage] = useState("Dashboard");

  const handleLogin = (userRole) => {
    setRole(userRole);
  };

  const handleLogout = () => {
    setRole(null);
    setActivePage("Dashboard");
  };

  // LOGIN PAGE
  if (!role) {
    return <Login onLogin={handleLogin} />;
  }

  // STUDENT INTERFACE
  if (role === "student") {
    return <StudentInterface onLogout={handleLogout} />;
  }

  // TEACHER INTERFACE
  if (role === "teacher") {
    return <TeacherInterface onLogout={handleLogout} />;
  }

  // ADMIN INTERFACE
  const renderPage = () => {
    switch (activePage) {
      case "Dashboard": return <Dashboard />;
      case "Students": return <Students />;
      case "Teachers": return <Teachers />;
      case "Attendance": return <Attendance />;
      case "Fees": return <Fees />;
      case "Examinations": return <Examinations />;
      case "Notices": return <Notices />;
      case "Settings": return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        onLogout={handleLogout}
      />
      <div className="main">
        <Navbar activePage={activePage} />
        <div className="page-content">{renderPage()}</div>
      </div>
    </div>
  );
}

export default App;