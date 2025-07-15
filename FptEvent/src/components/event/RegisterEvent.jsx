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

    // Điều hướng sang trang thành công, truyền dữ liệu qua state
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
        p: 3,
        backgroundColor: "#FFF8E7",
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h5"
        textAlign="center"
        fontWeight="bold"
        color="#5A4032"
        mb={1}
      >
        Đăng ký tham gia
      </Typography>
      <Typography variant="subtitle1" textAlign="center" color="#7A5D3F" mb={3}>
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
          backgroundColor: "#8F6B4A",
          ":hover": { backgroundColor: "#7c593f" },
        }}
      >
        Xác nhận đăng ký
      </Button>
    </Box>
  );
}
