// src/components/admin/StudentManagement.jsx

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

const StudentManagement = () => {
  const [students, setStudents] = useState(
    users.filter((u) => u.role.toLowerCase() === "student")
  );
  const [editingStudent, setEditingStudent] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetStudent, setTargetStudent] = useState(null);
  const [confirmName, setConfirmName] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handleEdit = (student) => {
    setEditingStudent(student);
    setOpen(true);
  };

  const handleDeleteClick = (student) => {
    setTargetStudent(student);
    setConfirmName("");
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (confirmName === targetStudent.name) {
      setStudents(students.filter((s) => s.email !== targetStudent.email));
      setConfirmOpen(false);
    } else {
      alert("Tên không khớp!");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditingStudent(null);
  };

  const handleSave = () => {
    setStudents((prev) =>
      prev.map((s) => (s.email === editingStudent.email ? editingStudent : s))
    );
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingStudent({ ...editingStudent, [name]: value });
  };

  const filteredStudents = students
    .filter((s) => s.name.toLowerCase().includes(searchKeyword.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className={styles.adminContainer}>
      <h2 className={styles.adminTitle}>Quản lý sinh viên</h2>

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
            {filteredStudents.map((student) => (
              <TableRow key={student.email}>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.password}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(student)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(student)}>
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
        <DialogTitle>Chỉnh sửa sinh viên</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Tên"
            name="name"
            value={editingStudent?.name || ""}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Mật khẩu"
            name="password"
            value={editingStudent?.password || ""}
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
        <DialogTitle>Xác nhận xóa sinh viên</DialogTitle>
        <DialogContent>
          <p>
            Nhập lại tên sinh viên để xác nhận:{" "}
            <strong>{targetStudent?.name}</strong>
          </p>
          <TextField
            fullWidth
            autoFocus
            value={confirmName}
            onChange={(e) => setConfirmName(e.target.value)}
            placeholder="Nhập tên sinh viên"
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

export default StudentManagement;
