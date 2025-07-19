import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";
import { parse, startOfWeek, getDay, format } from "date-fns";
import vi from "date-fns/locale/vi";
import "react-big-calendar/lib/css/react-big-calendar.css";

import allEvents from "../../utils/mockEvents";

// MUI imports
import { Box, Container, Typography, Paper, Button } from "@mui/material";

// Setup for date-fns
const locales = { vi };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

// Giả lập sự kiện người dùng đã đăng ký
const registeredEventIds = [1, 2, 4];
const events = allEvents
  .filter((event) => registeredEventIds.includes(event.id))
  .map((event) => {
    const [dateStr, timeStr] = event.time.split(" ");
    const [hour, minute] = timeStr.split(":").map(Number);
    const start = new Date(dateStr);
    start.setHours(hour, minute);
    const end = new Date(start);
    end.setHours(start.getHours() + 1);

    return {
      title: event.name,
      start,
      end,
      room: event.room,
    };
  });

export default function EventCalendar() {
  const [currentView, setCurrentView] = useState("week");
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" fontWeight="bold" color="primary">
          Lịch sự kiện thực tế
        </Typography>
        <Button variant="outlined" onClick={() => navigate("/home")}>
          Về trang chủ
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 2, height: "75vh", overflow: "auto" }}>
        <Calendar
          localizer={localizer}
          events={events}
          view={currentView}
          onView={(view) => setCurrentView(view)}
          views={["day", "week", "month"]}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          messages={{
            today: "Hôm nay",
            previous: "Trước",
            next: "Sau",
            month: "Tháng",
            week: "Tuần",
            day: "Ngày",
            agenda: "Danh sách",
            date: "Ngày",
            time: "Giờ",
            event: "Sự kiện",
          }}
        />
      </Paper>
    </Container>
  );
}
