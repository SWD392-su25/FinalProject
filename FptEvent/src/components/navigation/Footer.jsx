// src/components/Footer.jsx

import React from "react";
import { Box, Typography, Link, Container } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f8f9fa", // tương tự bg-light
        color: "#6c757d",
        py: 3,
        px: 2,
        mt: "auto",
        boxShadow: "0 -1px 4px rgba(0,0,0,0.05)",
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography variant="body2">
          © {new Date().getFullYear()} <strong>FPT Event Hub</strong>. All
          rights reserved.
        </Typography>
        <Typography variant="body2" mt={1}>
          Nếu gặp bất cứ lỗi gì, hãy phản ánh qua email:{" "}
          <Link href="mailto:support@example.com" underline="hover">
            support@example.com
          </Link>{" "}
          để nhận được sự hỗ trợ sớm nhất.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
