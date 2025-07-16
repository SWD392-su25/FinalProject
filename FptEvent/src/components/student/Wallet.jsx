// src/components/student/Wallet.jsx

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import { users } from "../../utils/mockUsers";
import styles from "../../styles/UserDashboard.module.css";
import StudentSidebar from "./StudentSidebar";

export default function Wallet() {
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState([]);
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [pendingAmount, setPendingAmount] = useState(0);
  const [ setIsWithdraw] = useState(false);

  const currentUser =
    JSON.parse(localStorage.getItem("currentUser")) ||
    JSON.parse(sessionStorage.getItem("currentUser"));
  const email = currentUser?.email;

  useEffect(() => {
    const walletKey = "wallet_" + email;
    const existingWallet = JSON.parse(localStorage.getItem(walletKey));

    if (existingWallet) {
      setHistory(existingWallet.history || []);

      // Tính balance từ các giao dịch đã được duyệt
      const approvedBalance = existingWallet.history?.reduce((sum, tx) => {
        if (tx.status === "Approved") {
          return sum + (tx.type === "Nạp tiền" ? tx.amount : -tx.amount);
        }
        return sum;
      }, 0) || 0;

      setBalance(approvedBalance);
    } else {
      const user = users.find((u) => u.email === email);
      const initialBalance = user?.wallet || 0;
      const initialHistory = [];

      localStorage.setItem(
        walletKey,
        JSON.stringify({ balance: initialBalance, history: initialHistory })
      );

      setBalance(initialBalance);
      setHistory(initialHistory);
    }
  }, [email]);

  const handleTopUp = () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value < 10000 || value > 10000000) {
      setAlert({
        type: "error",
        message: "Số tiền nạp phải từ 10.000 đến 10.000.000 VNĐ!",
      });
      return;
    }

    setIsWithdraw(false);
    setPendingAmount(value);
    setShowQR(true);
    setAlert(null);
  };

  const confirmTopUp = () => {
    const newTransaction = {
      type: "Nạp tiền",
      amount: pendingAmount,
      date: new Date().toLocaleString(),
      status: "Pending",
    };
    const newHistory = [newTransaction, ...history];

    localStorage.setItem(
      "wallet_" + email,
      JSON.stringify({ history: newHistory })
    );

    setHistory(newHistory);
    setAmount("");
    setAlert({
      type: "info",
      message: "Đang chờ Admin xác nhận giao dịch nạp tiền.",
    });
    setPendingAmount(0);
    setShowQR(false);
  };

  const handleWithdraw = () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value < 10000) {
      setAlert({
        type: "error",
        message: "Số tiền rút phải từ 10.000 VNĐ!",
      });
      return;
    }

    const available = history.reduce((sum, tx) => {
      if (tx.status === "Approved") {
        return sum + (tx.type === "Nạp tiền" ? tx.amount : -tx.amount);
      }
      return sum;
    }, 0);

    if (value > available) {
      setAlert({ type: "error", message: "Số dư không đủ để rút!" });
      return;
    }

    const newTransaction = {
      type: "Rút tiền",
      amount: value,
      date: new Date().toLocaleString(),
      status: "Pending",
    };

    const newHistory = [newTransaction, ...history];

    localStorage.setItem(
      "wallet_" + email,
      JSON.stringify({ history: newHistory })
    );

    setHistory(newHistory);
    setAmount("");
    setAlert({
      type: "info",
      message: "Yêu cầu rút tiền đã được gửi. Đang chờ Admin xác nhận.",
    });
  };

  return (
    <div className={styles.dashboardContainer}>
      <StudentSidebar />
      <div className={styles.content}>
        <Box sx={{ maxWidth: 600, mx: "auto", mt: 10, p: 3 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Ví sinh viên
          </Typography>

          <Typography variant="h6" color="primary" gutterBottom>
            Số dư đã xác nhận: {balance.toLocaleString()} VNĐ
          </Typography>

          {alert && (
            <Alert severity={alert.type} sx={{ mb: 2 }}>
              {alert.message}
            </Alert>
          )}

          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <TextField
              label="Nhập số tiền"
              fullWidth
              type="number"
              inputProps={{ min: 10000, max: 10000000 }}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Button variant="contained" onClick={handleTopUp}>
              Nạp tiền
            </Button>
            <Button variant="outlined" color="error" onClick={handleWithdraw}>
              Rút tiền
            </Button>
          </Box>

          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Lịch sử giao dịch:
          </Typography>

          <List>
            {history.length === 0 ? (
              <Typography variant="body2">Chưa có giao dịch nào.</Typography>
            ) : (
              history.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    secondaryAction={
                      <Chip
                        label={
                          item.status === "Approved"
                            ? "Đã duyệt"
                            : item.status === "Rejected"
                            ? "Từ chối"
                            : "Đang chờ"
                        }
                        color={
                          item.status === "Approved"
                            ? "success"
                            : item.status === "Rejected"
                            ? "error"
                            : "warning"
                        }
                        size="small"
                      />
                    }
                  >
                    <ListItemText
                      primary={`${item.type}: ${item.type === "Nạp tiền" ? "+" : "-"
                        }${item.amount.toLocaleString()} VNĐ`}
                      secondary={item.date}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))
            )}
          </List>
        </Box>

        <Dialog open={showQR} onClose={() => setShowQR(false)}>
          <DialogTitle>Xác nhận chuyển khoản</DialogTitle>
          <DialogContent sx={{ textAlign: "center" }}>
            <Typography gutterBottom>
              Quét mã QR dưới đây để chuyển khoản tới hệ thống.
            </Typography>
            <QRCodeCanvas
              value={`MOMO_PAY|user=${email}|amount=${pendingAmount}`}
              size={180}
            />
            <Typography mt={2}>
              Nội dung chuyển khoản: <strong>{email} - NapTien</strong>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowQR(false)} color="inherit">
              Hủy
            </Button>
            <Button onClick={confirmTopUp} variant="contained" color="primary">
              Xác nhận đã chuyển khoản
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
