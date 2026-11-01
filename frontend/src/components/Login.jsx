import { useState } from "react";
import { School, Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Admin
    if (email === "admin@edumanage.com" && password === "admin123") {
      onLogin("admin");
      return;
    }

    // Teacher
    if (email === "teacher@edumanage.com" && password === "teacher123") {
      onLogin("teacher");
      return;
    }

    // Student
    if (email === "student@edumanage.com" && password === "student123") {
      onLogin("student");
      return;
    }

    setError("Invalid email or password. Please try again.");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* LEFT SIDE */}
        <div className="login-brand">
          <div className="login-brand-content">
            <div className="login-logo">
              <School size={30} />
            </div>
            <h1>EduManage</h1>
            <p className="login-subtitle">Digital School Management</p>
            <p className="login-description">
              A complete platform for managing students, teachers, attendance,
              fees, examinations and school administration.
            </p>
            <div className="login-features">
              <div><span>✓</span> Student Management</div>
              <div><span>✓</span> Attendance Tracking</div>
              <div><span>✓</span> Examination Management</div>
              <div><span>✓</span> Digital Administration</div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="login-form-container">
          <div className="login-form-wrapper">
            <div className="mobile-login-logo">
              <School size={25} />
              <span>EduManage</span>
            </div>

            <h2>Welcome Back</h2>
            <p className="login-welcome">
              Sign in to access your dashboard.
            </p>

            <form onSubmit={handleLogin}>
              <div className="login-field">
                <label>Email Address</label>
                <div className="login-input">
                  <Mail size={18} />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    required
                  />
                </div>
              </div>

              <div className="login-field">
                <label>Password</label>
                <div className="login-input">
                  <Lock size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {error && <div className="login-error">{error}</div>}

              <button type="submit" className="login-button">
                Sign In <ArrowRight size={18} />
              </button>
            </form>

            {/* DEMO CREDENTIALS */}
            <div className="demo-login">
              <p>Demo Accounts</p>
              <span><strong>Admin:</strong> admin@edumanage.com / admin123</span>
              <span><strong>Teacher:</strong> teacher@edumanage.com / teacher123</span>
              <span><strong>Student:</strong> student@edumanage.com / student123</span>
            </div>

            <p className="login-footer">© 2026 EduManage. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;