// src/components/Profile.jsx
import React, { useState, useEffect } from "react";
import { Button, TextField, Typography, Container, Paper } from "@mui/material";

const Profile = () => {
  const [user, setUser] = useState({ email: "", name: "" });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const storedUser =
      JSON.parse(localStorage.getItem("currentUser")) ||
      JSON.parse(sessionStorage.getItem("currentUser"));
    if (storedUser) {
      setUser({ email: storedUser.email, name: storedUser.name || "" });
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    sessionStorage.setItem("currentUser", JSON.stringify(user));
    setEditing(false);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "2rem", marginTop: "5rem" }}>
        <Typography variant="h5" gutterBottom>
          Personal Information
        </Typography>

        <TextField
          label="Email"
          name="email"
          value={user.email}
          fullWidth
          margin="normal"
          disabled
        />

        <TextField
          label="Full Name"
          name="name"
          value={user.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled={!editing}
        />

        <div style={{ marginTop: "1rem" }}>
          {editing ? (
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          ) : (
            <Button variant="outlined" onClick={() => setEditing(true)}>
              Edit
            </Button>
          )}
        </div>
      </Paper>
    </Container>
  );
};

export default Profile;
