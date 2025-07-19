import React, { useEffect } from "react";
import { Box, Typography, Button, Paper, Fade } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function RegisterSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, email, eventName } = location.state || {};

  useEffect(() => {
    if (!name || !email || !eventName) {
      navigate("/home");
      return;
    }

    const prev = JSON.parse(localStorage.getItem("registrationHistory")) || [];

    const isDuplicate = prev.some(
      (item) =>
        item.name === name &&
        item.email === email &&
        item.eventName === eventName
    );

    if (!isDuplicate) {
      const updated = [...prev, { name, email, eventName }];
      localStorage.setItem("registrationHistory", JSON.stringify(updated));
    }
  }, [name, email, eventName, navigate]);

  const qrValue = JSON.stringify({ name, email, event: eventName });

  return (
    <Fade in timeout={600}>
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
            backgroundColor: "#e8f5e9",
            textAlign: "center",
          }}
        >
          <CheckCircleIcon
            sx={{
              fontSize: 60,
              color: "#43a047",
              mb: 1,
            }}
          />

          <Typography variant="h4" fontWeight="bold" color="green" mb={1}>
            Đăng ký thành công!
          </Typography>

          <Typography variant="body1" color="text.primary" mb={2}>
            Cảm ơn <strong>{name}</strong> đã đăng ký tham gia sự kiện:
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            color="green"
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
              border: "2px dashed #4caf50",
              display: "inline-block",
              padding: 2,
              borderRadius: 2,
              backgroundColor: "#fff",
              mb: 4, // Khoảng cách dưới QR
            }}
          >
            <QRCodeCanvas value={qrValue} size={180} />
          </Box>

          {/* Nút về trang chủ tách riêng rõ ràng */}
          <Box mt={2}>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#43a047",
                ":hover": { backgroundColor: "#388e3c" },
              }}
              onClick={() => navigate("/home")}
            >
              Quay về trang chủ
            </Button>
          </Box>
        </Paper>
      </Box>
    </Fade>
  );
}
