// src/components/student/StudentSidebar.jsx

import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/UserDashboard.module.css";
import Avatar from "../../assets/Avatar.png";

const StudentSidebar = () => {
  const currentUser =
    JSON.parse(localStorage.getItem("currentUser")) ||
    JSON.parse(sessionStorage.getItem("currentUser"));

  return (
    <div className={styles.sidebar}>
      <img src={Avatar} alt="Avatar" className={styles.avatar} />
      <div className={styles.userName}>{currentUser?.name || "User"}</div>
      <Link to="/profile" className={styles.navLink}>
        Cài đặt tài khoản
      </Link>
      <Link to="/wallet" className={styles.navLink}>
        Ví của tôi
      </Link>
      <Link to="/history" className={styles.navLink}>
        Sự kiện của tôi
      </Link>
    </div>
  );
};

export default StudentSidebar;
