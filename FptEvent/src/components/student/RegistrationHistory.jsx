// src/components/student/RegistrationHistory.jsx

import React from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import styles from "../../styles/UserDashboard.module.css";
import StudentSidebar from "../student/StudentSidebar";

// Mock data tạm thời, sau này thay bằng dữ liệu từ LocalStorage hoặc DB
const mockHistory =
  JSON.parse(localStorage.getItem("registrationHistory")) || [];

export default function RegistrationHistory() {
  if (mockHistory.length === 0) {
    <div className={styles.dashboardContainer}>
      <StudentSidebar />
      <div className={styles.content}>
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h6">Bạn chưa đăng ký sự kiện nào.</Typography>
      </Box>
    );
    </div>
    </div>
  }

  return (
    <div className={styles.dashboardContainer}>
      <StudentSidebar />
      <div className={styles.content}>
    <Box mt={5} px={3}>
      <Typography variant="h5" mb={3} fontWeight="bold" textAlign="center">
        Lịch sử đăng ký sự kiện
      </Typography>

      {mockHistory.map((item, index) => (
        <Paper key={index} sx={{ p: 3, mb: 3 }}>
          <Typography variant="subtitle1">
            <strong>Tên sự kiện:</strong> {item.eventName}
          </Typography>
          <Typography variant="subtitle2">
            <strong>Người đăng ký:</strong> {item.name}
          </Typography>
          <Typography variant="body2">
            <strong>Email:</strong> {item.email}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            Mã QR:
          </Typography>
          <QRCodeCanvas value={JSON.stringify(item)} size={160} />
        </Paper>
      ))}
    </Box>
    </div>
    </div>
  );
}
