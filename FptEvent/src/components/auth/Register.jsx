// src/components/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../../styles/AuthForm.module.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  Alert,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
// import API from "../configs/axios";
import FPTLogo from "../../assets/FPTLogo.png";
import FPTCampus from "../../assets/FPTCampus.png";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("MALE");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    // --- Client-side Validation ---
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp.");
      return;
    }
    // Basic email format check
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email không hợp lệ.");
      return;
    }
    // Basic phone number check (e.g., 10 digits)
    if (!/^\d{10}$/.test(phone)) {
      setError("Số điện thoại không hợp lệ (cần đủ 10 số).");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        fullName,
        email,
        phone,
        password,
        gender,
        role:"Student"
        // The API schema doesn't show a role field for registration,
        // so it's likely assigned by the backend.
      };

      await API.post("/register", payload);

      setSuccess(
        "Đăng ký thành công! Đang chuyển hướng đến trang đăng nhập..."
      );

      // Redirect to login page after a short delay to show success message
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      // Use the error message from the API if available, otherwise a generic one
      setError(
        err.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardWrapper}>
        <div className={styles.leftColumn}>
          <img src={FPTCampus} alt="FPT Campus" className={styles.image} />
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.formCard}>
            <img src={FPTLogo} alt="FPT Logo" className={styles.logo} />
            <h1 className={styles.title}>Create an Account</h1>
            <p className={styles.subtitle}>Fill in the form to register</p>

            {error && (
              <Alert severity="error" style={{ marginBottom: "1rem" }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" style={{ marginBottom: "1rem" }}>
                {success}
              </Alert>
            )}

            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={styles.input}
              disabled={loading}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              disabled={loading}
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles.input}
              disabled={loading}
            />

            {/* Using a simple select for gender */}
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className={styles.input}
              disabled={loading}
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>

            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                className={styles.eyeIcon}
                disabled={loading}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </div>

            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <Button
              variant="contained"
              fullWidth
              onClick={handleRegister}
              disabled={loading}
              style={{ marginTop: "1rem" }}
            >
              {loading ? "Registering..." : "Register"}
            </Button>

            <div className={styles.registerLink}>
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
