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
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import styles from "../../styles/UserDashboard.module.css";
import StudentSidebar from "../student/StudentSidebar";
import defaultAvatar from "../../assets/Avatar.png";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "", //
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

  return (
    <div className={styles.dashboardContainer}>
      <StudentSidebar />
      <div className={styles.content}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Thông tin tài khoản
        </Typography>
        <Box mt={2} mb={3} position="relative" textAlign="center">
          <Avatar
            src={user.avatar}
            alt="Avatar"
            sx={{ width: 120, height: 120, margin: "0 auto" }}
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
                position: "absolute",
                bottom: 0,
                right: "calc(50% - 60px)",
                backgroundColor: "white",
              }}
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </Box>

        <Box sx={{ position: "relative", mx: 50 }}>
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

          {/* Ngày sinh sử dụng DatePicker */}
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

          <Typography mt={2}>Giới tính</Typography>
          <RadioGroup
            row
            name="gender"
            value={user.gender}
            onChange={handleChange}
          >
            <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
            <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
          </RadioGroup>

          <Button variant="contained" sx={{ mt: 3 }} onClick={handleSave}>
            Hoàn thành
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Profile;
