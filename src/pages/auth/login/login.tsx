import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { authenticationService } from "../../../utils/auth.service";
import LoadingButton from "@mui/lab/LoadingButton";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Stack, Link as Li, Divider, Chip } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleLogin from "react-google-login";
import { User } from '../../../@types/Auth';
import { Link } from "react-router-dom";
// import {  } from '../../../HOOKS/useGlobalStyle'


const theme = createTheme({
  palette: {

    text: {
      secondary: "#637381"
    }
  }
});

export default function Login() {
  // Initial hooks
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { handleSubmit } = useForm();
  const [data, setData] = useState<User>(() => ({ email: '', password: '' }));
  /*
   * Verify Credentials
   */
  const doLogin = (formData: any) => {
    console.log(data);
    // setButtonDisabled(true);
    // authenticationService
    //   .verifyCredentials(formData)
    //   .then((response: any) => {
    //     setButtonDisabled(false);
    //   })
    //   .catch((error) => {
    //     setButtonDisabled(false);
    //   });
  };

  /*
   *Handle Show And Hide password 
   */
  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  /*
  *Handle State Change
  */
  const handleChange = (prop: keyof User) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [prop]: e.target.value });
  }


  /*
   * Render
   */

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="div"
        sx={{
          display: 'flex',
          minHeight: "100vh",
          minWidth: "100%",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Container
          component="main"
          maxWidth="xs"
        >
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Paper elevation={3} sx={{ padding: 4 }}>
              <Typography
                component="h1"
                variant="h5"
                display="flex"
                justifyContent={"center"}
                sx={{
                  fontWeight: 700
                }}
              >
                Sign in to Social Feed
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit(doLogin)}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={handleChange("email")}
                  autoFocus
                />

                <FormControl fullWidth variant="outlined" sx={{ marginTop: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    name="password"
                    value={data.password}
                    onChange={handleChange('password')}
                  />
                </FormControl>

                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 1 }}
                  loading={isButtonDisabled}
                  size="large"
                >
                  Sign In
                </LoadingButton>

                <Stack direction={"row"} sx={{ justifyContent: "flex-end", paddingBottom: "1rem" }} >
                  <Typography variant="caption">
                    <Link to="/" style={{ textDecoration: "none", color: theme.palette.text.secondary }}>
                      Forgot password?
                    </Link>
                  </Typography>
                </Stack>
                <Stack direction={"row"} sx={{ justifyContent: "flex-start", paddingBottom: "1rem" }} >
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    Don’t have an account?&nbsp;
                    <Link to="/auth/signup" style={{ textDecoration: "none" }}>
                      <Li underline="none">
                        Sign-up
                      </Li>
                    </Link>
                  </Typography>
                </Stack>


                <Divider>
                  <Chip label="OR" />
                </Divider>

                <Stack direction="row" justifyContent="center" sx={{ marginTop: "1.7rem" }}>
                  <GoogleLogin
                    clientId="971623344603-0qquan9pcdb9iu7oq9genvpnel77i7oa.apps.googleusercontent.com"
                    buttonText="Login With Google"
                    onSuccess={() => console.log("Hii")}
                    onFailure={() => console.log("Hii")}
                    cookiePolicy={'single_host_origin'}
                  />
                </Stack>

              </Box>
            </Paper>
          </Box>

        </Container>
      </Box >
    </ThemeProvider >
  );
}
