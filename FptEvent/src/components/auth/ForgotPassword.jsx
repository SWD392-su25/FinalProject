// src/components/ForgotPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/AuthForm.module.css";
import { Alert, Button } from "@mui/material";
import FPTLogo from "../../assets/FPTLogo.png";
import FPTCampus from "../../assets/FPTCampus.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleReset = () => {
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    // Reset logic giả lập
    setError("");
    setSuccess(true);
    setTimeout(() => navigate("/login"), 2000);
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
            <h1 className={styles.title}>Reset Your Password</h1>
            <p className={styles.subtitle}>
              Enter your email to receive a reset link
            </p>

            {error && <Alert severity="error">{error}</Alert>}
            {success && (
              <Alert severity="success">
                A reset link has been sent to your email!
              </Alert>
            )}

            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />

            <Button variant="contained" fullWidth onClick={handleReset}>
              Send Reset Link
            </Button>

            <div className={styles.registerLink}>
              <p>
                Back to <a href="/login">Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
