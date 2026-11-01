import { Search, Bell, ChevronDown } from "lucide-react";

function Navbar({ activePage = "Dashboard" }) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <h1>{activePage}</h1>
        <p>Manage your school efficiently</p>
      </div>

      <div className="navbar-right">
        <div className="global-search">
          <Search size={17} />
          <input type="text" placeholder="Search..." />
        </div>

        <button className="notification-button">
          <Bell size={19} />
          <span className="notification-dot"></span>
        </button>

        <div className="admin-profile">
          <div className="admin-avatar">SA</div>
          <div className="admin-details">
            <strong>School Administrator</strong>
            <span>Administrator</span>
          </div>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;