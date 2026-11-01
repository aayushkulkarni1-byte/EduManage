import {
  Users,
  GraduationCap,
  ClipboardCheck,
  CreditCard,
  Bell,
  TrendingUp,
  CalendarDays,
} from "lucide-react";

function Dashboard() {
  const stats = [
    {
      title: "Total Students",
      value: "1,248",
      change: "+8.2% this month",
      icon: Users,
      color: "blue",
    },
    {
      title: "Total Teachers",
      value: "86",
      change: "+2 this month",
      icon: GraduationCap,
      color: "green",
    },
    {
      title: "Average Attendance",
      value: "94.2%",
      change: "+1.4% this week",
      icon: ClipboardCheck,
      color: "purple",
    },
    {
      title: "Pending Fees",
      value: "₹2.4L",
      change: "Needs attention",
      icon: CreditCard,
      color: "orange",
    },
  ];

  const attendance = [
    { day: "Monday", percent: 94 },
    { day: "Tuesday", percent: 91 },
    { day: "Wednesday", percent: 96 },
    { day: "Thursday", percent: 89 },
    { day: "Friday", percent: 93 },
  ];

  const notices = [
    {
      title: "Annual Sports Day",
      desc: "Sports day will be held on October 15.",
      time: "2 hours ago",
    },
    {
      title: "Semester Examination",
      desc: "Exam timetable has been published.",
      time: "Yesterday",
    },
    {
      title: "Parent Teacher Meeting",
      desc: "PTM scheduled for October 10.",
      time: "2 days ago",
    },
  ];

  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="page">
      {/* Welcome */}
      <div className="page-header">
        <div>
          <h2>Good Morning, Admin 👋</h2>
          <p>Here's what's happening in your school today.</p>
        </div>
        <div className="attendance-date">
          <CalendarDays size={17} />
          <span>{today}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="student-stats">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div className="student-stat-card" key={stat.title}>
              <div className={`student-stat-icon ${stat.color}`}>
                <Icon size={22} />
              </div>
              <div>
                <span>{stat.title}</span>
                <strong>{stat.value}</strong>
                <p style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>
                  {stat.change}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "20px" }}>
        {/* Attendance Overview */}
        <div className="content-card" style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 700 }}>Attendance Overview</h3>
              <p style={{ fontSize: "13px", color: "#94a3b8", marginTop: "4px" }}>
                Weekly student attendance
              </p>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button className="secondary-button" style={{ height: "34px", fontSize: "12px" }}>
                This Week
              </button>
              <button className="secondary-button" style={{ height: "34px", fontSize: "12px" }}>
                This Month
              </button>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {attendance.map((item) => (
              <div key={item.day}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontSize: "13px", color: "#475569" }}>{item.day}</span>
                  <span style={{ fontSize: "13px", fontWeight: 600 }}>{item.percent}%</span>
                </div>
                <div
                  style={{
                    height: "8px",
                    background: "#f1f5f9",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${item.percent}%`,
                      height: "100%",
                      background: "#2563eb",
                      borderRadius: "4px",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Notices */}
        <div className="content-card" style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "18px" }}>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 700 }}>Recent Notices</h3>
              <p style={{ fontSize: "13px", color: "#94a3b8", marginTop: "4px" }}>
                Latest school announcements
              </p>
            </div>
            <button className="secondary-button" style={{ height: "34px", fontSize: "12px" }}>
              View All
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {notices.map((notice, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "12px",
                  padding: "12px",
                  background: "#f8fafc",
                  borderRadius: "10px",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "#eff6ff",
                    color: "#2563eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Bell size={18} />
                </div>
                <div>
                  <strong style={{ fontSize: "14px", display: "block" }}>{notice.title}</strong>
                  <p style={{ fontSize: "13px", color: "#64748b", margin: "4px 0" }}>
                    {notice.desc}
                  </p>
                  <span style={{ fontSize: "12px", color: "#94a3b8" }}>{notice.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;