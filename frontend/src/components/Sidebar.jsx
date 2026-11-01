import {
  LayoutDashboard,
  Users,
  GraduationCap,
  ClipboardCheck,
  CreditCard,
  FileText,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

function Sidebar({ activePage, setActivePage, onLogout }) {
  const mainMenu = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Students", icon: Users },
    { name: "Teachers", icon: GraduationCap },
    { name: "Attendance", icon: ClipboardCheck },
    { name: "Fees", icon: CreditCard },
    { name: "Examinations", icon: FileText },
    { name: "Notices", icon: Bell },
  ];

  const systemMenu = [{ name: "Settings", icon: Settings }];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">E</div>
        <div>
          <h2>EduManage</h2>
          <p>School Management</p>
        </div>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-title">MAIN MENU</p>
        {mainMenu.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              className={
                activePage === item.name ? "sidebar-item active" : "sidebar-item"
              }
              onClick={() => setActivePage(item.name)}
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>

      <div className="sidebar-section">
        <p className="sidebar-title">SYSTEM</p>
        {systemMenu.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              className={
                activePage === item.name ? "sidebar-item active" : "sidebar-item"
              }
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
          <div className="sidebar-avatar">SA</div>
          <div>
            <strong>School Administrator</strong>
            <span>Administrator</span>
          </div>
        </div>

        <button className="sidebar-logout" onClick={onLogout}>
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;