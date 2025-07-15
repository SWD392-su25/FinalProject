// src/components/Login.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/AuthForm.module.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  Alert,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import { login } from "../../utils/authUtils";
import FPTLogo from "../../assets/FPTLogo.png";
import FPTCampus from "../../assets/FPTCampus.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    setError("");

    const foundUser = login(email, password);
    if (foundUser) {
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      if (!rememberMe) {
        sessionStorage.setItem("currentUser", JSON.stringify(foundUser));
      }
      navigate("/home");
    } else {
      setError("Sai email hoặc mật khẩu");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardWrapper}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          <img src={FPTCampus} alt="FPT Campus" className={styles.image} />
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          <div className={styles.formCard}>
            <img src={FPTLogo} alt="FPT Logo" className={styles.logo} />
            <h1 className={styles.title}>Welcome to FEH</h1>
            <p className={styles.subtitle}>
              Please enter your details to login
            </p>

            {error && <Alert severity="error">{error}</Alert>}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />

            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                className={styles.eyeIcon}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </div>

            <div className={styles.rememberForgot}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                }
                label="Remember me"
              />
              <span className={styles.forgot}>
                <Link to="/forgot-password">Forgot password?</Link>
              </span>
            </div>

            <Button variant="contained" fullWidth onClick={handleLogin}>
              Login
            </Button>

            <div className={styles.registerLink}>
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
