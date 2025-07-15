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

  const event = allEvents.find((item) => item.id === Number(eventID));

  if (!event) {
    return (
      <Container maxWidth="sm">
        <Box mt={5} textAlign="center">
          <Alert severity="error" variant="filled">
            Không tìm thấy sự kiện
          </Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box mt={5} display="flex" justifyContent="center">
        <Card sx={{ maxWidth: 600, width: "100%", boxShadow: 5 }}>
          <CardMedia
            component="img"
            image={event.image}
            alt={event.name}
            sx={{
              width: "100%",
              aspectRatio: "16/9",
              objectFit: "cover",
              borderTopLeftRadius: "4px",
              borderTopRightRadius: "4px",
            }}
          />

          <CardContent>
            <Typography
              variant="h5"
              component="div"
              fontWeight="bold"
              color="primary"
              gutterBottom
            >
              {event.name}
            </Typography>

            <Typography variant="body1" color="text.secondary">
              <strong>Thời gian:</strong> {event.time} <br />
              <strong>Địa điểm:</strong> {event.room} <br />
              <strong>Số lượng:</strong> {event.quantity} người
            </Typography>

            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#8F6B4A",
                "&:hover": { backgroundColor: "#7c5a3d" },
              }}
              onClick={() =>
                navigate(`/register/${event.id}`, {
                  state: { title: event.name },
                })
              }
            >
              Đăng ký tham gia
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
