import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  FileText,
  Bell,
  LogOut,
  CalendarDays,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

function TeacherInterface({ onLogout }) {
  const [activePage, setActivePage] = useState("Dashboard");

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "My Classes", icon: Users },
    { name: "Mark Attendance", icon: ClipboardCheck },
    { name: "Examinations", icon: FileText },
    { name: "Notices", icon: Bell },
  ];

  // ===== DASHBOARD =====
  const DashboardPage = () => (
    <main className="page">
      <div className="page-header">
        <div>
          <h2>Welcome, Priya Sharma 👋</h2>
          <p>Mathematics Teacher</p>
        </div>
        <div className="attendance-date">
          <CalendarDays size={17} />
          <span>October 2026</span>
        </div>
      </div>

      <div className="student-stats">
        <div className="student-stat-card">
          <div className="student-stat-icon blue"><Users size={20} /></div>
          <div><span>My Classes</span><strong>2</strong></div>
        </div>
        <div className="student-stat-card">
          <div className="student-stat-icon green"><Users size={20} /></div>
          <div><span>Total Students</span><strong>68</strong></div>
        </div>
        <div className="student-stat-card">
          <div className="student-stat-icon purple"><ClipboardCheck size={20} /></div>
          <div><span>Today's Attendance</span><strong>94%</strong></div>
        </div>
        <div className="student-stat-card">
          <div className="student-stat-icon orange"><FileText size={20} /></div>
          <div><span>Upcoming Exams</span><strong>2</strong></div>
        </div>
      </div>

      <div className="content-card" style={{ padding: "24px" }}>
        <h3 style={{ marginBottom: "16px" }}>Today's Schedule</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ padding: "14px", background: "#f8fafc", borderRadius: "10px", display: "flex", justifyContent: "space-between" }}>
            <div>
              <strong>Class 10-A</strong>
              <p style={{ fontSize: "13px", color: "#64748b" }}>Mathematics • Room 101</p>
            </div>
            <span style={{ fontSize: "13px", color: "#2563eb" }}>09:00 - 10:00</span>
          </div>
          <div style={{ padding: "14px", background: "#f8fafc", borderRadius: "10px", display: "flex", justifyContent: "space-between" }}>
            <div>
              <strong>Class 9-B</strong>
              <p style={{ fontSize: "13px", color: "#64748b" }}>Mathematics • Room 205</p>
            </div>
            <span style={{ fontSize: "13px", color: "#2563eb" }}>11:00 - 12:00</span>
          </div>
        </div>
      </div>
    </main>
  );

  // ===== MY CLASSES =====
  const ClassesPage = () => (
    <main className="page">
      <div className="page-header">
        <div>
          <h2>My Classes</h2>
          <p>Classes assigned to you</p>
        </div>
      </div>

      <div className="content-card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Class</th>
                <th>Subject</th>
                <th>Students</th>
                <th>Room</th>
                <th>Schedule</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>10-A</td>
                <td>Mathematics</td>
                <td>35</td>
                <td>Room 101</td>
                <td>Mon, Wed, Fri – 09:00</td>
              </tr>
              <tr>
                <td>9-B</td>
                <td>Mathematics</td>
                <td>33</td>
                <td>Room 205</td>
                <td>Tue, Thu – 11:00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );

  // ===== MARK ATTENDANCE =====
  const AttendancePage = () => {
    const [records, setRecords] = useState([
      { id: 1, name: "Aarav Sharma", roll: 1, status: "Present" },
      { id: 2, name: "Ananya Patel", roll: 2, status: "Present" },
      { id: 3, name: "Rohan Mehta", roll: 3, status: "Late" },
      { id: 4, name: "Sneha Joshi", roll: 4, status: "Absent" },
      { id: 5, name: "Vikram Singh", roll: 5, status: "Present" },
    ]);

    const changeStatus = (id, status) => {
      setRecords(records.map((r) => (r.id === id ? { ...r, status } : r)));
    };

    return (
      <main className="page">
        <div className="page-header">
          <div>
            <h2>Mark Attendance</h2>
            <p>Class 10-A • 03 October 2026</p>
          </div>
        </div>

        <div className="content-card">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Roll No.</th>
                  <th>Student Name</th>
                  <th>Status</th>
                  <th>Change Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr key={r.id}>
                    <td>{r.roll}</td>
                    <td>{r.name}</td>
                    <td>
                      <span className={`attendance-status ${
                        r.status === "Present" ? "attendance-present" :
                        r.status === "Late" ? "attendance-late" : "attendance-absent"
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td>
                      <div className="attendance-actions">
                        <button
                          className={r.status === "Present" ? "selected-present" : ""}
                          onClick={() => changeStatus(r.id, "Present")}
                        >
                          Present
                        </button>
                        <button
                          className={r.status === "Late" ? "selected-late" : ""}
                          onClick={() => changeStatus(r.id, "Late")}
                        >
                          Late
                        </button>
                        <button
                          className={r.status === "Absent" ? "selected-absent" : ""}
                          onClick={() => changeStatus(r.id, "Absent")}
                        >
                          Absent
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    );
  };

  // ===== EXAMS =====
  const ExamsPage = () => (
    <main className="page">
      <div className="page-header">
        <div>
          <h2>Examinations</h2>
          <p>Exams related to your subjects</p>
        </div>
      </div>

      <div className="content-card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Exam</th>
                <th>Class</th>
                <th>Date</th>
                <th>Time</th>
                <th>Room</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mid Term – Mathematics</td>
                <td>10-A</td>
                <td>15 Oct 2026</td>
                <td>09:00</td>
                <td>Room 101</td>
                <td><span className="exam-status exam-upcoming">Upcoming</span></td>
              </tr>
              <tr>
                <td>Mid Term – Mathematics</td>
                <td>9-B</td>
                <td>17 Oct 2026</td>
                <td>11:00</td>
                <td>Room 205</td>
                <td><span className="exam-status exam-upcoming">Upcoming</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );

  // ===== NOTICES =====
  const NoticesPage = () => (
    <main className="page">
      <div className="page-header">
        <div>
          <h2>Notices</h2>
          <p>School announcements</p>
        </div>
      </div>

      <div className="content-card">
        <div className="notice-list">
          <div className="notice-card">
            <div className="notice-icon"><Bell size={19} /></div>
            <div className="notice-content">
              <div className="notice-title-row">
                <h3>Staff Meeting</h3>
                <span className="notice-priority notice-high">Important</span>
              </div>
              <p>All teachers are requested to attend the staff meeting on 12 October.</p>
              <div className="notice-meta">
                <span>05 Oct 2026</span>
                <span>Posted by Admin</span>
              </div>
            </div>
          </div>
          <div className="notice-card">
            <div className="notice-icon"><Bell size={19} /></div>
            <div className="notice-content">
              <div className="notice-title-row">
                <h3>Exam Duty</h3>
                <span className="notice-priority notice-medium">Medium</span>
              </div>
              <p>Exam duty list for Mid Term examinations has been released.</p>
              <div className="notice-meta">
                <span>03 Oct 2026</span>
                <span>Posted by Admin</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard": return <DashboardPage />;
      case "My Classes": return <ClassesPage />;
      case "Mark Attendance": return <AttendancePage />;
      case "Examinations": return <ExamsPage />;
      case "Notices": return <NoticesPage />;
      default: return <DashboardPage />;
    }
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">E</div>
          <div>
            <h2>EduManage</h2>
            <p>Teacher Portal</p>
          </div>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-title">MENU</p>
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                className={activePage === item.name ? "sidebar-item active" : "sidebar-item"}
                onClick={() => setActivePage(item.name)}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        <div className="sidebar-bottom">
          <div className="sidebar-user">
            <div className="sidebar-avatar">PS</div>
            <div>
              <strong>Priya Sharma</strong>
              <span>Teacher</span>
            </div>
          </div>
          <button className="sidebar-logout" onClick={onLogout}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="main">
        <header className="navbar">
          <div className="navbar-left">
            <h1>{activePage}</h1>
            <p>Teacher Portal</p>
          </div>
        </header>
        <div className="page-content">{renderPage()}</div>
      </div>
    </div>
  );
}

export default TeacherInterface;