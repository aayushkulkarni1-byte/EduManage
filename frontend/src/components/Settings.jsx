import { useState } from "react";
import {
  Settings as SettingsIcon,
  School,
  User,
  Bell,
  Shield,
  Save,
  RotateCcw,
  CheckCircle
} from "lucide-react";

function Settings() {
  const [activeSection, setActiveSection] = useState("school");

  const [saved, setSaved] = useState(false);

  const [schoolSettings, setSchoolSettings] = useState({
    schoolName: "EduManage International School",
    schoolCode: "EMS001",
    email: "admin@edumanage.com",
    phone: "+91 98765 43210",
    address: "Thane, Maharashtra, India",
    academicYear: "2026-27"
  });

  const [adminSettings, setAdminSettings] = useState({
    name: "Admin User",
    email: "admin@edumanage.com",
    phone: "+91 98765 43210",
    role: "Super Administrator"
  });

  const [notifications, setNotifications] = useState({
    attendance: true,
    fees: true,
    examinations: true,
    notices: true,
    emailNotifications: true
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true,
    sessionTimeout: true
  });

  const updateSchool = (field, value) => {
    setSchoolSettings({
      ...schoolSettings,
      [field]: value
    });
  };

  const updateAdmin = (field, value) => {
    setAdminSettings({
      ...adminSettings,
      [field]: value
    });
  };

  const updateNotification = (field) => {
    setNotifications({
      ...notifications,
      [field]: !notifications[field]
    });
  };

  const updateSecurity = (field) => {
    setSecurity({
      ...security,
      [field]: !security[field]
    });
  };

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset the current changes?"
    );

    if (!confirmed) {
      return;
    }

    window.location.reload();
  };

  return (
    <main className="page">

      {/* HEADER */}

      <div className="page-header">

        <div>

          <h2>
            Settings
          </h2>

          <p>
            Manage school, administrator and system settings.
          </p>

        </div>


        {saved && (

          <div className="settings-saved">

            <CheckCircle size={16} />

            Changes saved successfully

          </div>

        )}

      </div>


      {/* SETTINGS LAYOUT */}

      <div className="settings-layout">


        {/* SIDEBAR */}

        <div className="settings-sidebar">

          <button
            className={
              activeSection === "school"
                ? "settings-nav active"
                : "settings-nav"
            }
            onClick={() =>
              setActiveSection("school")
            }
          >

            <School size={17} />

            <div>

              <strong>
                School
              </strong>

              <span>
                School information
              </span>

            </div>

          </button>


          <button
            className={
              activeSection === "admin"
                ? "settings-nav active"
                : "settings-nav"
            }
            onClick={() =>
              setActiveSection("admin")
            }
          >

            <User size={17} />

            <div>

              <strong>
                Administrator
              </strong>

              <span>
                Admin account
              </span>

            </div>

          </button>


          <button
            className={
              activeSection === "notifications"
                ? "settings-nav active"
                : "settings-nav"
            }
            onClick={() =>
              setActiveSection("notifications")
            }
          >

            <Bell size={17} />

            <div>

              <strong>
                Notifications
              </strong>

              <span>
                Notification preferences
              </span>

            </div>

          </button>


          <button
            className={
              activeSection === "security"
                ? "settings-nav active"
                : "settings-nav"
            }
            onClick={() =>
              setActiveSection("security")
            }
          >

            <Shield size={17} />

            <div>

              <strong>
                Security
              </strong>

              <span>
                Account security
              </span>

            </div>

          </button>

        </div>


        {/* SETTINGS CONTENT */}

        <div className="settings-content">


          {/* SCHOOL SETTINGS */}

          {activeSection === "school" && (

            <div className="settings-section">

              <div className="settings-section-header">

                <div className="settings-section-icon">

                  <School size={19} />

                </div>

                <div>

                  <h3>
                    School Information
                  </h3>

                  <p>
                    Manage your school's basic information.
                  </p>

                </div>

              </div>


              <div className="settings-form-grid">

                <div className="settings-field full">

                  <label>
                    School Name
                  </label>

                  <input
                    type="text"
                    value={schoolSettings.schoolName}
                    onChange={(e) =>
                      updateSchool(
                        "schoolName",
                        e.target.value
                      )
                    }
                  />

                </div>


                <div className="settings-field">

                  <label>
                    School Code
                  </label>

                  <input
                    type="text"
                    value={schoolSettings.schoolCode}
                    onChange={(e) =>
                      updateSchool(
                        "schoolCode",
                        e.target.value
                      )
                    }
                  />

                </div>


                <div className="settings-field">

                  <label>
                    Academic Year
                  </label>

                  <select
                    value={schoolSettings.academicYear}
                    onChange={(e) =>
                      updateSchool(
                        "academicYear",
                        e.target.value
                      )
                    }
                  >

                    <option>
                      2026-27
                    </option>

                    <option>
                      2027-28
                    </option>

                    <option>
                      2028-29
                    </option>

                  </select>

                </div>


                <div className="settings-field">

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    value={schoolSettings.email}
                    onChange={(e) =>
                      updateSchool(
                        "email",
                        e.target.value
                      )
                    }
                  />

                </div>


                <div className="settings-field">

                  <label>
                    Phone
                  </label>

                  <input
                    type="text"
                    value={schoolSettings.phone}
                    onChange={(e) =>
                      updateSchool(
                        "phone",
                        e.target.value
                      )
                    }
                  />

                </div>


                <div className="settings-field full">

                  <label>
                    Address
                  </label>

                  <textarea
                    rows="3"
                    value={schoolSettings.address}
                    onChange={(e) =>
                      updateSchool(
                        "address",
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

            </div>

          )}


          {/* ADMIN SETTINGS */}

          {activeSection === "admin" && (

            <div className="settings-section">

              <div className="settings-section-header">

                <div className="settings-section-icon">

                  <User size={19} />

                </div>

                <div>

                  <h3>
                    Administrator Account
                  </h3>

                  <p>
                    Manage administrator account information.
                  </p>

                </div>

              </div>


              <div className="admin-profile">

                <div className="large-admin-avatar">

                  {adminSettings.name
                    .charAt(0)
                    .toUpperCase()}

                </div>

                <div>

                  <h3>
                    {adminSettings.name}
                  </h3>

                  <p>
                    {adminSettings.role}
                  </p>

                </div>

              </div>


              <div className="settings-form-grid">

                <div className="settings-field">

                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={adminSettings.name}
                    onChange={(e) =>
                      updateAdmin(
                        "name",
                        e.target.value
                      )
                    }
                  />

                </div>


                <div className="settings-field">

                  <label>
                    Role
                  </label>

                  <input
                    type="text"
                    value={adminSettings.role}
                    disabled
                  />

                </div>


                <div className="settings-field">

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    value={adminSettings.email}
                    onChange={(e) =>
                      updateAdmin(
                        "email",
                        e.target.value
                      )
                    }
                  />

                </div>


                <div className="settings-field">

                  <label>
                    Phone
                  </label>

                  <input
                    type="text"
                    value={adminSettings.phone}
                    onChange={(e) =>
                      updateAdmin(
                        "phone",
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

            </div>

          )}


          {/* NOTIFICATION SETTINGS */}

          {activeSection === "notifications" && (

            <div className="settings-section">

              <div className="settings-section-header">

                <div className="settings-section-icon">

                  <Bell size={19} />

                </div>

                <div>

                  <h3>
                    Notifications
                  </h3>

                  <p>
                    Choose which notifications you want to receive.
                  </p>

                </div>

              </div>


              <div className="settings-options">

                <div className="settings-option">

                  <div>

                    <strong>
                      Attendance Notifications
                    </strong>

                    <span>
                      Receive alerts about student attendance.
                    </span>

                  </div>

                  <button
                    className={
                      notifications.attendance
                        ? "toggle active"
                        : "toggle"
                    }
                    onClick={() =>
                      updateNotification(
                        "attendance"
                      )
                    }
                  >

                    <span />

                  </button>

                </div>


                <div className="settings-option">

                  <div>

                    <strong>
                      Fee Notifications
                    </strong>

                    <span>
                      Receive alerts about pending and overdue fees.
                    </span>

                  </div>

                  <button
                    className={
                      notifications.fees
                        ? "toggle active"
                        : "toggle"
                    }
                    onClick={() =>
                      updateNotification(
                        "fees"
                      )
                    }
                  >

                    <span />

                  </button>

                </div>


                <div className="settings-option">

                  <div>

                    <strong>
                      Examination Notifications
                    </strong>

                    <span>
                      Receive alerts about upcoming examinations.
                    </span>

                  </div>

                  <button
                    className={
                      notifications.examinations
                        ? "toggle active"
                        : "toggle"
                    }
                    onClick={() =>
                      updateNotification(
                        "examinations"
                      )
                    }
                  >

                    <span />

                  </button>

                </div>


                <div className="settings-option">

                  <div>

                    <strong>
                      Notice Notifications
                    </strong>

                    <span>
                      Receive notifications when new notices are published.
                    </span>

                  </div>

                  <button
                    className={
                      notifications.notices
                        ? "toggle active"
                        : "toggle"
                    }
                    onClick={() =>
                      updateNotification(
                        "notices"
                      )
                    }
                  >

                    <span />

                  </button>

                </div>


                <div className="settings-option">

                  <div>

                    <strong>
                      Email Notifications
                    </strong>

                    <span>
                      Receive important system notifications by email.
                    </span>

                  </div>

                  <button
                    className={
                      notifications.emailNotifications
                        ? "toggle active"
                        : "toggle"
                    }
                    onClick={() =>
                      updateNotification(
                        "emailNotifications"
                      )
                    }
                  >

                    <span />

                  </button>

                </div>

              </div>

            </div>

          )}


          {/* SECURITY SETTINGS */}

          {activeSection === "security" && (

            <div className="settings-section">

              <div className="settings-section-header">

                <div className="settings-section-icon">

                  <Shield size={19} />

                </div>

                <div>

                  <h3>
                    Security
                  </h3>

                  <p>
                    Manage account and login security.
                  </p>

                </div>

              </div>


              <div className="settings-options">

                <div className="settings-option">

                  <div>

                    <strong>
                      Two-Factor Authentication
                    </strong>

                    <span>
                      Add an extra layer of security to administrator login.
                    </span>

                  </div>

                  <button
                    className={
                      security.twoFactor
                        ? "toggle active"
                        : "toggle"
                    }
                    onClick={() =>
                      updateSecurity(
                        "twoFactor"
                      )
                    }
                  >

                    <span />

                  </button>

                </div>


                <div className="settings-option">

                  <div>

                    <strong>
                      Login Alerts
                    </strong>

                    <span>
                      Get notified when a new login occurs.
                    </span>

                  </div>

                  <button
                    className={
                      security.loginAlerts
                        ? "toggle active"
                        : "toggle"
                    }
                    onClick={() =>
                      updateSecurity(
                        "loginAlerts"
                      )
                    }
                  >

                    <span />

                  </button>

                </div>


                <div className="settings-option">

                  <div>

                    <strong>
                      Session Timeout
                    </strong>

                    <span>
                      Automatically end inactive administrator sessions.
                    </span>

                  </div>

                  <button
                    className={
                      security.sessionTimeout
                        ? "toggle active"
                        : "toggle"
                    }
                    onClick={() =>
                      updateSecurity(
                        "sessionTimeout"
                      )
                    }
                  >

                    <span />

                  </button>

                </div>

              </div>


              <div className="security-warning">

                <Shield size={18} />

                <div>

                  <strong>
                    Security Reminder
                  </strong>

                  <p>
                    Never share your administrator password with anyone.
                  </p>

                </div>

              </div>

            </div>

          )}


          {/* ACTIONS */}

          <div className="settings-actions">

            <button
              className="secondary-button"
              onClick={handleReset}
            >

              <RotateCcw size={16} />

              Reset

            </button>


            <button
              className="primary-button"
              onClick={handleSave}
            >

              <Save size={16} />

              Save Changes

            </button>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Settings;