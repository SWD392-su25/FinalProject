import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert as MUIAlert,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import allEvents from "../../utils/mockEvents";

export default function RegisterEvent() {
  const navigate = useNavigate();
  const { eventID } = useParams();

  const event = allEvents.find((e) => e.id === Number(eventID));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState(null);

  const role = localStorage.getItem("role");

  if (role === "admin") {
    return (
      <Box mt={5} textAlign="center">
        <Typography variant="h6" color="error">
          Admin không được phép đăng ký tham gia sự kiện.
        </Typography>
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => navigate("/home")}
        >
          Quay về trang chủ
        </Button>
      </Box>
    );
  }

  if (!event) {
    return (
      <Box mt={5} textAlign="center">
        <Typography variant="h6" color="error">
          Không tìm thấy sự kiện!
        </Typography>
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => navigate("/home")}
        >
          Quay về trang chủ
        </Button>
      </Box>
    );
  }

  const handleRegister = () => {
    if (!name || !email) {
      setAlert({
        type: "error",
        message: "Vui lòng điền đầy đủ họ tên và email.",
      });
      return;
    }

    navigate("/register-success", {
      state: { name, email, eventName: event.name },
    });
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 5,
        p: 4,
        backgroundColor: "#e8f5e9", // xanh lá nhạt
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h5"
        textAlign="center"
        fontWeight="bold"
        color="green"
        mb={1}
      >
        Đăng ký tham gia sự kiện
      </Typography>
      <Typography
        variant="subtitle1"
        textAlign="center"
        color="text.secondary"
        mb={3}
      >
        {event.name}
      </Typography>

      {alert && (
        <MUIAlert severity={alert.type} sx={{ mb: 2 }}>
          {alert.message}
        </MUIAlert>
      )}

      <TextField
        label="Họ và tên"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Email liên hệ"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        fullWidth
        onClick={handleRegister}
        sx={{
          mt: 2,
          backgroundColor: "#43a047", // xanh lá đậm
          ":hover": { backgroundColor: "#388e3c" },
        }}
      >
        Xác nhận đăng ký
      </Button>
    </Box>
  );
}
