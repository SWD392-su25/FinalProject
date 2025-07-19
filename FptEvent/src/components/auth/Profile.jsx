// src/components/auth/Profile.jsx

import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Avatar,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import styles from "../../styles/UserDashboard.module.css";
import StudentSidebar from "../student/StudentSidebar";
import defaultAvatar from "../../assets/Avatar.png";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    avatar: defaultAvatar,
  });

  useEffect(() => {
    const currentUser =
      JSON.parse(localStorage.getItem("currentUser")) ||
      JSON.parse(sessionStorage.getItem("currentUser"));

    if (currentUser) {
      setUser((prev) => ({
        ...prev,
        name: currentUser.name || "",
        email: currentUser.email || "",
        avatar: currentUser.avatar || defaultAvatar,
        dob: currentUser.dob || "",
        phone: currentUser.phone || "",
        gender: currentUser.gender || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUser((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDateChange = (date) => {
    if (date) {
      setUser((prev) => ({
        ...prev,
        dob: date.toISOString(),
      }));
    }
  };

  const handleSave = () => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    sessionStorage.setItem("currentUser", JSON.stringify(user));
    alert("Thông tin đã được lưu!");
  };

  const handleBackHome = () => {
    navigate("/"); // hoặc "/home" tùy router bạn cấu hình
  };

  return (
    <div className={styles.dashboardContainer}>
      <StudentSidebar />
      <div className={styles.content}>
        <Typography variant="h4" fontWeight="bold" color="primary" mb={3}>
          Hồ sơ cá nhân
        </Typography>

        <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <Avatar
              src={user.avatar}
              alt="Avatar"
              sx={{
                width: 120,
                height: 120,
                border: "3px solid #1976d2",
              }}
            />
            <input
              accept="image/*"
              id="upload-avatar"
              type="file"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
            <label htmlFor="upload-avatar">
              <IconButton
                color="primary"
                component="span"
                sx={{
                  mt: 1,
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                }}
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <TextField
            fullWidth
            label="Họ và tên"
            name="name"
            value={user.name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Số điện thoại"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: <span style={{ marginRight: 8 }}>+84</span>,
            }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={user.email}
            disabled
            margin="normal"
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Ngày sinh"
              value={user.dob ? dayjs(user.dob) : null}
              onChange={handleDateChange}
              format="DD/MM/YYYY"
              slotProps={{
                textField: { fullWidth: true, margin: "normal" },
              }}
            />
          </LocalizationProvider>

          <Typography mt={2} mb={1}>
            Giới tính
          </Typography>
          <RadioGroup
            row
            name="gender"
            value={user.gender}
            onChange={handleChange}
          >
            <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
            <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
            <FormControlLabel value="Khác" control={<Radio />} label="Khác" />
          </RadioGroup>

          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 4 }}
            onClick={handleSave}
          >
            Lưu thông tin
          </Button>

          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            sx={{ mt: 2 }}
            onClick={handleBackHome}
          >
            Quay về trang chính
          </Button>
        </Paper>
      </div>
    </div>
  );
};

export default Profile;
