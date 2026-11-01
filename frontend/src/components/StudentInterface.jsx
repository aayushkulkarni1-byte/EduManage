import { useState } from "react";
import {
  LayoutDashboard,
  ClipboardCheck,
  CreditCard,
  FileText,
  Bell,
  User,
  LogOut,
  CalendarDays,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

function StudentInterface({ onLogout }) {
  const [activePage, setActivePage] = useState("Dashboard");

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "My Attendance", icon: ClipboardCheck },
    { name: "My Fees", icon: CreditCard },
    { name: "Examinations", icon: FileText },
    { name: "Notices", icon: Bell },
    { name: "My Profile", icon: User },
  ];

  // ===== DASHBOARD =====
  const DashboardPage = () => (
    <main className="page">
      <div className="page-header">
        <div>
          <h2>Welcome, Aarav Sharma 👋</h2>
          <p>Class 10-A • Roll No. 12</p>
        </div>
        <div className="attendance-date">
          <CalendarDays size={17} />
          <span>October 2026</span>
        </div>
      </div>

      <div className="student-stats">
        <div className="student-stat-card">
          <div className="student-stat-icon green">
            <CheckCircle size={20} />
          </div>
          <div>
            <span>Attendance</span>
            <strong>94%</strong>
          </div>
        </div>
        <div className="student-stat-card">
          <div className="student-stat-icon orange">
            <CreditCard size={20} />
          </div>
          <div>
            <span>Pending Fees</span>
            <strong>₹10,000</strong>
          </div>
        </div>
        <div className="student-stat-card">
          <div className="student-stat-icon blue">
            <FileText size={20} />
          </div>
          <div>
            <span>Upcoming Exams</span>
            <strong>3</strong>
          </div>
        </div>
        <div className="student-stat-card">
          <div className="student-stat-icon purple">
            <Bell size={20} />
          </div>
          <div>
            <span>New Notices</span>
            <strong>2</strong>
          </div>
        </div>
      </div>

      <div className="content-card" style={{ padding: "24px" }}>
        <h3 style={{ marginBottom: "16px" }}>Recent Notices</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ padding: "14px", background: "#f8fafc", borderRadius: "10px" }}>
            <strong>Annual Sports Day</strong>
            <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
              Sports day will be held on October 15.
            </p>
          </div>
          <div style={{ padding: "14px", background: "#f8fafc", borderRadius: "10px" }}>
            <strong>Semester Examination</strong>
            <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
              Exam timetable has been published.
            </p>
          </div>
        </div>
      </div>
    </main>
  );

  // ===== ATTENDANCE =====
  const AttendancePage = () => (
    <main className="page">
      <div className="page-header">
        <div>
          <h2>My Attendance</h2>
          <p>View your daily attendance records</p>
        </div>
      </div>

      <div className="student-stats">
        <div className="student-stat-card">
          <div className="student-stat-icon green"><CheckCircle size={20} /></div>
          <div><span>Present</span><strong>42</strong></div>
        </div>
        <div className="student-stat-card">
          <div className="student-stat-icon orange"><Clock size={20} /></div>
          <div><span>Late</span><strong>3</strong></div>
        </div>
        <div className="student-stat-card">
          <div className="student-stat-icon purple"><XCircle size={20} /></div>
          <div><span>Absent</span><strong>2</strong></div>
        </div>
        <div className="student-stat-card">
          <div className="student-stat-icon blue"><ClipboardCheck size={20} /></div>
          <div><span>Percentage</span><strong>94%</strong></div>
        </div>
      </div>

      <div className="content-card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
                <th>Remark</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>03 Oct 2026</td>
                <td><span className="attendance-status attendance-present">Present</span></td>
                <td>-</td>
              </tr>
              <tr>
                <td>02 Oct 2026</td>
                <td><span className="attendance-status attendance-present">Present</span></td>
                <td>-</td>
              </tr>
              <tr>
                <td>01 Oct 2026</td>
                <td><span className="attendance-status attendance-late">Late</span></td>
                <td>Arrived 15 min late</td>
              </tr>
              <tr>
                <td>30 Sep 2026</td>
                <td><span className="attendance-status attendance-absent">Absent</span></td>
                <td>Medical leave</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );

  // ===== FEES =====
  const FeesPage = () => (
    <main className="page">
      <div className="page-header">
        <div>
          <h2>My Fees</h2>
          <p>View fee status and payment history</p>
        </div>
      </div>

      <div className="student-stats">
        <div className="student-stat-card">
          <div className="student-stat-icon blue"><CreditCard size={20} /></div>
          <div><span>Total Fees</span><strong>₹50,000</strong></div>
        </div>
        <div className="student-stat-card">
          <div className="student-stat-icon green"><CheckCircle size={20} /></div>
          <div><span>Paid</span><strong>₹40,000</strong></div>
        </div>
        <div className="student-stat-card">
          <div className="student-stat-icon orange"><CreditCard size={20} /></div>
          <div><span>Pending</span><strong>₹10,000</strong></div>
        </div>
      </div>

      <div className="content-card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Fee Type</th>
                <th>Amount</th>
                <th>Paid</th>
                <th>Balance</th>
                <th>Status</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tuition Fee</td>
                <td>₹50,000</td>
                <td className="paid-amount">₹40,000</td>
                <td className="pending-amount">₹10,000</td>
                <td><span className="fee-status fee-partial">Partial</span></td>
                <td>30 Nov 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );

  // ===== EXAMS =====
  const ExamsPage = () => (
    <main className="page">
      <div className="page-header">
        <div>
          <h2>Examinations</h2>
          <p>Upcoming and past examinations</p>
        </div>
      </div>

      <div className="content-card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Exam</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Time</th>
                <th>Room</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mid Term</td>
                <td>Mathematics</td>
                <td>15 Oct 2026</td>
                <td>09:00</td>
                <td>Room 101</td>
                <td><span className="exam-status exam-upcoming">Upcoming</span></td>
              </tr>
              <tr>
                <td>Mid Term</td>
                <td>Science</td>
                <td>16 Oct 2026</td>
                <td>09:00</td>
                <td>Room 102</td>
                <td><span className="exam-status exam-upcoming">Upcoming</span></td>
              </tr>
              <tr>
                <td>Unit Test</td>
                <td>English</td>
                <td>20 Sep 2026</td>
                <td>10:00</td>
                <td>Room 205</td>
                <td><span className="exam-status exam-completed">Completed</span></td>
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
                <h3>Annual Sports Day</h3>
                <span className="notice-priority notice-high">High</span>
              </div>
              <p>Sports day will be held on October 15. All students must participate.</p>
              <div className="notice-meta">
                <span>01 Oct 2026</span>
                <span>Posted by Admin</span>
              </div>
            </div>
          </div>

          <div className="notice-card">
            <div className="notice-icon"><Bell size={19} /></div>
            <div className="notice-content">
              <div className="notice-title-row">
                <h3>Semester Examination</h3>
                <span className="notice-priority notice-high">Important</span>
              </div>
              <p>Exam timetable has been published. Please check the notice board.</p>
              <div className="notice-meta">
                <span>28 Sep 2026</span>
                <span>Posted by Admin</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  // ===== PROFILE =====
  const ProfilePage = () => (
    <main className="page">
      <div className="page-header">
        <div>
          <h2>My Profile</h2>
          <p>Your personal information</p>
        </div>
      </div>

      <div className="content-card" style={{ padding: "28px" }}>
        <div className="student-profile">
          <div className="large-student-avatar">A</div>
          <h2>Aarav Sharma</h2>
          <span>Class 10 - A • Roll No. 12</span>
        </div>

        <div className="student-details-grid">
          <div><label>Student ID</label><strong>STU001</strong></div>
          <div><label>Gender</label><strong>Male</strong></div>
          <div><label>Date of Birth</label><strong>12 May 2011</strong></div>
          <div><label>Admission Date</label><strong>01 Jun 2024</strong></div>
          <div><label>Parent Name</label><strong>Ramesh Sharma</strong></div>
          <div><label>Parent Phone</label><strong>+91 98765 43210</strong></div>
          <div><label>Email</label><strong>aarav.sharma@student.com</strong></div>
          <div><label>Status</label><span className="status-badge status-active">Active</span></div>
          <div className="student-address">
            <label>Address</label>
            <strong>Thane, Maharashtra</strong>
          </div>
        </div>
      </div>
    </main>
  );

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard": return <DashboardPage />;
      case "My Attendance": return <AttendancePage />;
      case "My Fees": return <FeesPage />;
      case "Examinations": return <ExamsPage />;
      case "Notices": return <NoticesPage />;
      case "My Profile": return <ProfilePage />;
      default: return <DashboardPage />;
    }
  };

  return (
    <div className="app">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">E</div>
          <div>
            <h2>EduManage</h2>
            <p>Student Portal</p>
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
            <div className="sidebar-avatar">AS</div>
            <div>
              <strong>Aarav Sharma</strong>
              <span>Student • 10-A</span>
            </div>
          </div>
          <button className="sidebar-logout" onClick={onLogout}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="main">
        <header className="navbar">
          <div className="navbar-left">
            <h1>{activePage}</h1>
            <p>Student Portal</p>
          </div>
        </header>
        <div className="page-content">{renderPage()}</div>
      </div>
    </div>
  );
}

export default StudentInterface;