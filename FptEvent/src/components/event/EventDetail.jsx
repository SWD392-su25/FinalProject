import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Alert,
} from "@mui/material";
import allEvents from "../../utils/mockEvents";

export default function EventDetail() {
  const { eventID } = useParams();
  const navigate = useNavigate();

  // Tìm sự kiện theo ID
  const event = allEvents.find((item) => item.id === Number(eventID));

  // Lấy user hiện tại và kiểm tra role
  const currentUser =
    JSON.parse(localStorage.getItem("currentUser")) ||
    JSON.parse(sessionStorage.getItem("currentUser"));

  const isAdmin = currentUser?.role === "Admin";

  // Nếu không tìm thấy sự kiện
  if (!event) {
    return (
      <Container maxWidth="sm">
        <Box mt={5} textAlign="center">
          <Alert severity="error" variant="filled">
            Không tìm thấy sự kiện
          </Alert>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => navigate("/home")}
          >
            Quay về trang chủ
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url('https://images.unsplash.com/photo-1515169067865-5387ec356754?auto=format&fit=crop&w=1470&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        py: 5,
      }}
    >
      <Container maxWidth="md">
        <Box display="flex" justifyContent="center">
          <Card
            sx={{
              maxWidth: 700,
              width: "100%",
              boxShadow: 6,
              borderRadius: 3,
              overflow: "hidden",
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            }}
          >
            <CardMedia
              component="img"
              image={event.image}
              alt={event.name}
              sx={{
                height: 300,
                objectFit: "cover",
              }}
            />

            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                color="primary"
                gutterBottom
                textAlign="center"
              >
                {event.name}
              </Typography>

              <Typography variant="body1" color="text.secondary" mb={3}>
                <strong>🕒 Thời gian:</strong> {event.time}
                <br />
                <strong>📍 Địa điểm:</strong> {event.room}
                <br />
                <strong>👥 Số lượng:</strong> {event.quantity} người
              </Typography>

              {/* Nếu không phải Admin thì hiện nút đăng ký */}
              {!isAdmin && (
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={() =>
                    navigate(`/register/${event.id}`, {
                      state: { title: event.name },
                    })
                  }
                  sx={{
                    mb: 2,
                    backgroundColor: "#4CAF50",
                    ":hover": { backgroundColor: "#43A047" },
                    fontWeight: "bold",
                  }}
                >
                  Đăng ký tham gia
                </Button>
              )}

              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate("/home")}
              >
                Quay về trang chủ
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
