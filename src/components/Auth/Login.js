import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../../App";
import "../../App.css";
import TopBar from "./TopBar";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    let res = await axios.post(`${url}/signin`, {
      email,
      password,
    });
    console.log(res.data);
    if (res.data.statusCode === 200) {
      sessionStorage.setItem("token", res.data.sessionToken);
      let userData = JSON.stringify(res.data.user);
      sessionStorage.setItem("user", userData);
      navigate("/home");
    } else {
      alert(res.data.message);
    }
  };

  return (
    <>
      <TopBar />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            className="d-flex flex-column align-items-center"
            sx={{
              marginTop: 16,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              className=""
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <button
                    className="direct"
                    onClick={() => navigate("/forgot_password")}
                    variant="body2"
                  >
                    Forgot password?
                  </button>
                </Grid>
                <Grid item>
                  <button
                    className="direct"
                    onClick={() => navigate("/signup")}
                    variant="body2"
                  >
                    {"Don't have an account?"}
                  </button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
