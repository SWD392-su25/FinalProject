// src/components/admin/EventManagement.jsx

import React, { useState } from "react";
import mockEvents from "../../utils/mockEvents";
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
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { Edit, Delete, Search } from "@mui/icons-material";
import styles from "../../styles/AdminManagement.module.css";

const EventManagement = () => {
  const [events, setEvents] = useState(mockEvents);
  const [editingEvent, setEditingEvent] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetEvent, setTargetEvent] = useState(null);
  const [confirmName, setConfirmName] = useState("");

  // Search, Filter, Sort
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterRoom, setFilterRoom] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handleDeleteClick = (event) => {
    setTargetEvent(event);
    setConfirmName("");
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (confirmName === targetEvent.name) {
      setEvents(events.filter((e) => e.id !== targetEvent.id));
      setConfirmOpen(false);
    } else {
      alert("Tên không khớp!");
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingEvent(null);
  };

  const handleSave = () => {
    setEvents((prev) =>
      prev.map((e) => (e.id === editingEvent.id ? editingEvent : e))
    );
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingEvent({ ...editingEvent, [name]: value });
  };

  // Search - Filter - Sort logic
  const filteredEvents = events
    .filter(
      (e) =>
        e.name.toLowerCase().includes(searchKeyword.toLowerCase()) &&
        (!filterRoom || e.room.toLowerCase().includes(filterRoom.toLowerCase())) &&
        (!filterDate || new Date(e.time) >= new Date(filterDate))
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "time") return new Date(a.time) - new Date(b.time);
      if (sortBy === "room") return a.room.localeCompare(b.room);
      if (sortBy === "quantity") return a.quantity - b.quantity;
      return 0;
    });

  return (
    <div className={styles.adminContainer}>
      <h2 className={styles.adminTitle}>Quản lý sự kiện</h2>

      {/* Search, Filter, Sort UI */}
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
          label="Lọc theo ngày"
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          size="small"
          sx={{ marginRight: 2 }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Lọc theo phòng"
          value={filterRoom}
          onChange={(e) => setFilterRoom(e.target.value)}
          size="small"
          sx={{ marginRight: 2 }}
        />
        <TextField
          label="Sắp xếp"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          select
          size="small"
        >
          <MenuItem value="">-- Không sắp xếp --</MenuItem>
          <MenuItem value="name">Tên sự kiện</MenuItem>
          <MenuItem value="time">Thời gian</MenuItem>
          <MenuItem value="room">Phòng</MenuItem>
          <MenuItem value="quantity">Số lượng</MenuItem>
        </TextField>
      </div>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ảnh</TableCell>
              <TableCell>Tên sự kiện</TableCell>
              <TableCell>Thời gian</TableCell>
              <TableCell>Phòng</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell>
                  <img
                    src={event.image}
                    alt={event.name}
                    width={70}
                    height={70}
                    style={{ objectFit: "cover", borderRadius: 4 }}
                  />
                </TableCell>
                <TableCell>{event.name}</TableCell>
                <TableCell>{event.time}</TableCell>
                <TableCell>{event.room}</TableCell>
                <TableCell>{event.quantity}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(event)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(event)}>
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Chỉnh sửa sự kiện</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Tên sự kiện"
            name="name"
            value={editingEvent?.name || ""}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Thời gian"
            name="time"
            value={editingEvent?.time || ""}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Phòng"
            name="room"
            value={editingEvent?.room || ""}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Số lượng"
            name="quantity"
            type="number"
            value={editingEvent?.quantity || ""}
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

      {/* Confirm Delete */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <p>
            Nhập lại tên sự kiện để xác nhận:{" "}
            <strong>{targetEvent?.name}</strong>
          </p>
          <TextField
            autoFocus
            fullWidth
            value={confirmName}
            onChange={(e) => setConfirmName(e.target.value)}
            placeholder="Nhập tên sự kiện"
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

export default EventManagement;
