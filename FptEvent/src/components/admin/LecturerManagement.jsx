// src/components/admin/LecturerManagement.jsx

import React, { useState } from "react";
import { users } from "../../utils/mockUsers";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { Edit, Delete, Search } from "@mui/icons-material";
import styles from "../../styles/AdminManagement.module.css";

const LecturerManagement = () => {
  const [lecturers, setLecturers] = useState(
    users.filter((u) => u.role.toLowerCase() === "lecture")
  );
  const [editingLecturer, setEditingLecturer] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetLecturer, setTargetLecturer] = useState(null);
  const [confirmName, setConfirmName] = useState("");

  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handleEdit = (lecturer) => {
    setEditingLecturer(lecturer);
    setOpen(true);
  };

  const handleDeleteClick = (lecturer) => {
    setTargetLecturer(lecturer);
    setConfirmName("");
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (confirmName === targetLecturer.name) {
      setLecturers(lecturers.filter((l) => l.email !== targetLecturer.email));
      setConfirmOpen(false);
    } else {
      alert("Tên không khớp!");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditingLecturer(null);
  };

  const handleSave = () => {
    setLecturers((prev) =>
      prev.map((l) => (l.email === editingLecturer.email ? editingLecturer : l))
    );
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingLecturer({ ...editingLecturer, [name]: value });
  };

  // Filter + Sort
  const filteredLecturers = lecturers
    .filter((l) => l.name.toLowerCase().includes(searchKeyword.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className={styles.adminContainer}>
      <h2 className={styles.adminTitle}>Quản lý giảng viên</h2>

      {/* Search & Sort UI */}
      <div className={styles.searchFilterRow}>
        <TextField
          label="Tìm kiếm theo tên"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          size="small"
          sx={{ marginRight: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Sắp xếp"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          select
          size="small"
        >
          <MenuItem value="">-- Không sắp xếp --</MenuItem>
          <MenuItem value="name">Tên</MenuItem>
        </TextField>
      </div>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Mật khẩu</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLecturers.map((lecturer) => (
              <TableRow key={lecturer.email}>
                <TableCell>{lecturer.email}</TableCell>
                <TableCell>{lecturer.name}</TableCell>
                <TableCell>{lecturer.password}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(lecturer)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(lecturer)}>
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog chỉnh sửa */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Chỉnh sửa giảng viên</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Tên"
            name="name"
            value={editingLecturer?.name || ""}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Mật khẩu"
            name="password"
            value={editingLecturer?.password || ""}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button variant="contained" onClick={handleSave}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog xác nhận xóa */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Xác nhận xóa giảng viên</DialogTitle>
        <DialogContent>
          <p>
            Nhập lại tên giảng viên để xác nhận:{" "}
            <strong>{targetLecturer?.name}</strong>
          </p>
          <TextField
            fullWidth
            autoFocus
            value={confirmName}
            onChange={(e) => setConfirmName(e.target.value)}
            placeholder="Nhập tên giảng viên"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Hủy</Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmDelete}
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LecturerManagement;
