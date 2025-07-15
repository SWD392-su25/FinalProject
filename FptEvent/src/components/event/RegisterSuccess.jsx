import React, { useEffect } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

export default function RegisterSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, email, eventName } = location.state || {};

  useEffect(() => {
    if (!name || !email || !eventName) {
      navigate("/home");
    }
    // ✅ Lưu vào localStorage
    const prev = JSON.parse(localStorage.getItem("registrationHistory")) || [];
    const updated = [...prev, { name, email, eventName }];
    localStorage.setItem("registrationHistory", JSON.stringify(updated));
    // TODO: Gửi email tại đây nếu cần
    // sendConfirmationEmail({ name, email, eventName });
  }, [name, email, eventName, navigate]);

  const qrValue = JSON.stringify({ name, email, event: eventName });

  return (
    <Box
      sx={{
        mt: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          maxWidth: 500,
          width: "100%",
          p: 4,
          borderRadius: 3,
          backgroundColor: "#FFFDF7",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="#3f51b5" mb={2}>
          🎉 Đăng ký thành công!
        </Typography>

        <Typography variant="body1" color="text.primary" mb={2}>
          Cảm ơn <strong>{name}</strong> đã đăng ký tham gia sự kiện:
        </Typography>

        <Typography
          variant="h6"
          fontWeight="bold"
          color="secondary"
          mb={3}
          sx={{ fontStyle: "italic" }}
        >
          {eventName}
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Một email xác nhận sẽ được gửi đến: <strong>{email}</strong>
        </Typography>

        <Typography variant="subtitle1" fontWeight="bold" color="#333" mb={1}>
          Mã QR xác nhận tham gia:
        </Typography>

        <Box
          sx={{
            border: "2px dashed #ccc",
            display: "inline-block",
            padding: 2,
            borderRadius: 2,
            mb: 3,
            backgroundColor: "#fff",
          }}
        >
          <QRCodeCanvas value={qrValue} size={180} />
        </Box>

        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#3f51b5",
            ":hover": { backgroundColor: "#2c3e91" },
          }}
          onClick={() => navigate("/home")}
        >
          Quay về trang chủ
        </Button>
      </Paper>
    </Box>
  );
}
