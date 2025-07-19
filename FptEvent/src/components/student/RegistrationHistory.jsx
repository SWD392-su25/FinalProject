import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../../styles/UserDashboard.module.css";
import StudentSidebar from "./StudentSidebar";
import { useNavigate } from "react-router-dom"; // 👉 THÊM import này

export default function RegistrationHistory() {
  const [history, setHistory] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // 👉 THÊM dòng này

  // Load history from localStorage
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("registrationHistory")) || [];
    setHistory(stored);
    setFiltered(stored);
  }, []);

  // Tìm kiếm theo tên sự kiện
  const handleSearch = () => {
    const result = history.filter((item) =>
      item.eventName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltered(result);
  };

  // Xoá 1 mục
  const handleDelete = (index) => {
    const updated = [...history];
    updated.splice(index, 1);
    setHistory(updated);
    setFiltered(updated);
    localStorage.setItem("registrationHistory", JSON.stringify(updated));
  };

  // Xoá tất cả
  const handleClearAll = () => {
    localStorage.removeItem("registrationHistory");
    setHistory([]);
    setFiltered([]);
  };

  return (
    <div className={styles.dashboardContainer}>
      <StudentSidebar />
      <div className={styles.content}>
        <Box mt={5} px={3}>
          <Typography variant="h5" mb={3} fontWeight="bold" textAlign="center">
            Lịch sử đăng ký sự kiện
          </Typography>

          {/* Thanh tìm kiếm */}
          <Box display="flex" gap={2} mb={3}>
            <TextField
              label="Tìm kiếm theo tên sự kiện"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IconButton color="primary" onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
            {filtered.length > 0 && (
              <Button variant="outlined" color="error" onClick={handleClearAll}>
                Xoá tất cả
              </Button>
            )}
          </Box>

          {/* Không có lịch sử */}
          {filtered.length === 0 ? (
            <Box textAlign="center" mt={5}>
              <Typography variant="h6">Không có sự kiện nào.</Typography>
            </Box>
          ) : (
            filtered.map((item, index) => (
              <Paper key={index} sx={{ p: 3, mb: 3, position: "relative" }}>
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

                <IconButton
                  onClick={() => handleDelete(index)}
                  sx={{ position: "absolute", top: 10, right: 10 }}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Paper>
            ))
          )}

          {/* ✅ Nút quay về trang chủ */}
          {history.length > 0 && (
            <Box textAlign="center" mt={4}>
              <Button
                variant="contained"
                onClick={() => navigate("/home")}
                sx={{
                  backgroundColor: "#3f51b5",
                  ":hover": { backgroundColor: "#2c3e91" },
                }}
              >
                Quay về trang chủ
              </Button>
            </Box>
          )}
        </Box>
      </div>
    </div>
  );
}
