// SuccessScreen.tsx
import React from "react";
import { Container, Typography, Paper } from "@mui/material";

const SuccessScreen: React.FC = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "87vh",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
        borderRadius: "0 0 3rem 3rem",
        backgroundSize: '50px 50px, 50px 50px, 25px 25px, 25px 25px',
        backgroundColor: "#8CA6AB",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "2rem",
          borderRadius: "10px",
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          color="primary"
          gutterBottom
          sx={{
            fontWeight: "bold",
          }}
        >
          Compliment Added Successfully!
        </Typography>
        <Typography variant="body1" color="textSecondary">
          SickMan TM copy rights reserved 1982-2024
        </Typography>
      </Paper>
    </Container>
  );
};

export default SuccessScreen;
