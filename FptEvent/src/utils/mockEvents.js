// src/utils/mockEvents.js

import Event01 from "../assets/event/Event01.png";
import Event02 from "../assets/event/Event02.png";
import Event03 from "../assets/event/Event03.png";
import Event04 from "../assets/event/Event04.png";
import Event05 from "../assets/event/Event05.png";

const allEvents = [
  {
    id: 1,
    name: "Summer Fest",
    time: "2025-07-15 08:00",
    room: "A101",
    quantity: 100,
    image: Event01,
  },
  {
    id: 2,
    name: "Giới thiệu chuyên ngành",
    time: "2025-07-20 13:30",
    room: "B202",
    quantity: 80,
    image: Event02,
  },
  {
    id: 3,
    name: "FPT Talent",
    time: "2025-08-05 09:00",
    room: "Hall C",
    quantity: 150,
    image: Event03,
  },
  {
    id: 4,
    name: "AI First",
    time: "2025-08-06 09:00",
    room: "D303",
    quantity: 120,
    image: Event04,
  },
  {
    id: 5,
    name: "Empower your Future",
    time: "2025-08-07 14:00",
    room: "E404",
    quantity: 90,
    image: Event05,
  },
];

export default allEvents;
