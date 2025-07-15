import React, { useEffect, useState } from "react";
import styles from "../styles/HomePage.module.css";
import { Button, TextField } from "@mui/material";
import allEvents from "../utils/mockEvents";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

const featuredEvents = allEvents.slice(0, 3);

const HomePage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const cardsPerPage = 9;

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prevIndex) => (prevIndex + 1) % featuredEvents.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredEvents = allEvents.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIdx = (currentPage - 1) * cardsPerPage;
  const pagedEvents = filteredEvents.slice(startIdx, startIdx + cardsPerPage);
  const totalPages = Math.ceil(filteredEvents.length / cardsPerPage);

  return (
    <div className={styles.container}>
      <h1 className={styles.welcome}>Welcome to FPT Event Hub</h1>
      {currentUser && (
        <p className={styles.userInfo}>
          Welcome and enjoy the event <strong>{currentUser.name}</strong>
        </p>
      )}

      {/* Sự kiện nổi bật */}
      <section className={styles.featuredSection}>
        <h2 className={styles.sectionTitle}>🔥 Sự kiện nổi bật</h2>
        <div className={styles.carouselWrapper}>
          <div className={styles.carousel}>
            <button
              className={`${styles.navBtn} ${styles.leftBtn}`}
              onClick={() =>
                setCarouselIndex(
                  (carouselIndex - 1 + featuredEvents.length) %
                    featuredEvents.length
                )
              }
            >
              ‹
            </button>

            <img
              src={featuredEvents[carouselIndex].image}
              alt={featuredEvents[carouselIndex].name}
            />

            <button
              className={`${styles.navBtn} ${styles.rightBtn}`}
              onClick={() =>
                setCarouselIndex((carouselIndex + 1) % featuredEvents.length)
              }
            >
              ›
            </button>

            <div className={styles.carouselCaption}>
              {featuredEvents[carouselIndex].name}
            </div>
          </div>
        </div>
      </section>

      {/* Danh sách các sự kiện */}
      <section className={styles.eventListSection}>
        <h2 className={styles.sectionTitle}>📅 Danh sách sự kiện</h2>

        {/* Tìm kiếm */}
        <div className={styles.searchWrapper}>
          <TextField
            label="Tìm kiếm sự kiện..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            className={styles.searchInput}
          />
        </div>

        {/* Danh sách card */}
        <div className={styles.cardGrid}>
          {pagedEvents.map((event) => (
            <div className={styles.card} key={event.id}>
              <div className={styles.imageWrapper}>
                <img src={event.image} alt={event.name} />
              </div>
              <h3>{event.name}</h3>
              <Button
                variant="outlined"
                size="small"
                onClick={() => navigate(`/detail/${event.id}`)}
              >
                Details
              </Button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx + 1}
              onClick={() => setCurrentPage(idx + 1)}
              className={currentPage === idx + 1 ? styles.activePage : ""}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
