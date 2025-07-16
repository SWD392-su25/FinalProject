// src/components/navigation/Header.jsx

import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  Button,
} from "@mui/material";
import FPTLogo from "../../assets/FPTLogo.png";
import AvatarImg from "../../assets/Avatar.png";
import { logout } from "../../utils/authUtils";

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const currentUser =
    JSON.parse(localStorage.getItem("currentUser")) ||
    JSON.parse(sessionStorage.getItem("currentUser"));
  const role = currentUser?.role || "User";

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={2}
      sx={{ zIndex: 1200 }}
    >
      <Toolbar>
        {/* Logo + Tên */}
        <Box sx={{ display: "flex", alignItems: "center", ml: 20 }}>
          <img
            src={FPTLogo}
            alt="FPT Logo"
            height={40}
            style={{ marginRight: 8, width: "auto" }}
          />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/home"
            sx={{
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FPT Event Hub
          </Typography>
        </Box>

        {/* Menu chính */}
        <Box sx={{ display: "flex", flexGrow: 1, gap: 2, ml: 5 }}>
          <Button component={RouterLink} to="/home" color="inherit">
            Home
          </Button>
          {(role === "Student" || role === "Lecturer") && (
            <Button component={RouterLink} to="/event-calendar" color="inherit">
              Calendar
            </Button>
          )}
          {role === "Admin" && (
            <>
              <Button component={RouterLink} to="/admin/events" color="inherit">
                Quản lý sự kiện
              </Button>
              <Button
                component={RouterLink}
                to="/admin/students"
                color="inherit"
              >
                Quản lý sinh viên
              </Button>
              <Button
                component={RouterLink}
                to="/admin/lecturers"
                color="inherit"
              >
                Quản lý giảng viên
              </Button>
            </>
          )}
        </Box>

        {/* Avatar + Tên người dùng + Menu */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mr: 20 }}>
          <Typography variant="body1" fontWeight="medium">
            {currentUser?.name}
          </Typography>

          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Avatar" src={AvatarImg} />
            </IconButton>
          </Tooltip>

          <Menu
            sx={{ mt: "45px" }}
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem disabled>
              Role: <strong style={{ marginLeft: 4 }}>{role}</strong>
            </MenuItem>
            <MenuItem
              component={RouterLink}
              to="/profile"
              onClick={handleCloseUserMenu}
            >
              Profile
            </MenuItem>
            <MenuItem
              component={RouterLink}
              to="/history"
              onClick={handleCloseUserMenu}
            >
              History
            </MenuItem>
            {role === "Student" && (
              <MenuItem
                component={RouterLink}
                to="/wallet"
                onClick={handleCloseUserMenu}
              >
                Wallet
              </MenuItem>
            )}
            <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
