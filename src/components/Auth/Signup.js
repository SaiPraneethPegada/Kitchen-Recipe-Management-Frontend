import React from "react";
import { url } from "../../App";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

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
import axios from "axios";
import TopBar from "./TopBar";

const theme = createTheme();

const initialValues = {
  userName: "",
  email: "",
  password: "",
};

export default function Signup() {
  const navigate = useNavigate();
  const validate = (values) => {
    const errors = {};

    if (!values.userName) {
      errors.userName = "Required";
    } else if (values.userName.length < 6) {
      errors.userName = "Minimum 6 characters required";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email";
    }

    if (!values.password) {
      errors.password = "Required";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (values) => {
      let res = await axios.post(`${url}/signup`, {
        userName: values.userName,
        email: values.email,
        password: values.password,
      });
      if (res.data.statusCode === 200) {
        alert(res.data.message);
        navigate("/signin");
        formik.resetForm();
      } else {
        alert(res.data.message);
      }
    },
  });

  return (
    <>
      <TopBar />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 13,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="userName"
                label="User Name"
                name="userName"
                error={
                  formik.touched.userName && Boolean(formik.errors.userName)
                }
                helperText={formik.touched.userName && formik.errors.userName}
                value={formik.values.userName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                type="email"
                name="email"
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                values={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>

              <Grid container>
                <Grid item>
                  <button
                    className="direct"
                    onClick={() => navigate("/signin")}
                    variant="body2"
                  >
                    {"Already have an account? Sign In"}
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
