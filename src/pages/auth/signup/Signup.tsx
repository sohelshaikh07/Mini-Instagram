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
import { SignUp } from '../../../@types/Auth';
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
    const [data, setData] = useState<SignUp>(() => ({ email: '', password: '', firstname: '', lastname: '' }));
    /*
     * Verify Credentials
     */
    const doSignup = (formData: any) => {
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
    const handleChange = (prop: keyof SignUp) => (e: React.ChangeEvent<HTMLInputElement>) => {
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
                    maxWidth="sm"
                >
                    <CssBaseline />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography
                                component="h1"
                                variant="h5"
                                display="flex"
                                justifyContent={"center"}
                                sx={{
                                    fontWeight: 700
                                }}
                            >
                                Sign up to Social Feed
                            </Typography>
                            <Box
                                component="form"
                                onSubmit={handleSubmit(doSignup)}
                                sx={{ mt: 1 }}
                            >
                                <Stack direction={"row"} gap={1}>
                                    <TextField
                                        margin="normal"
                                        required
                                        id="firstname"
                                        label="firstname"
                                        name="firstname"
                                        autoComplete="firstname"
                                        value={data.firstname}
                                        onChange={handleChange("firstname")}
                                        autoFocus
                                        fullWidth
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        id="lastname"
                                        label="lastname"
                                        name="lastname"
                                        autoComplete="lastname"
                                        value={data.lastname}
                                        onChange={handleChange("lastname")}
                                        fullWidth
                                    />
                                </Stack>
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
                                    Sign Up
                                </LoadingButton>

                                <Stack direction={"row"} sx={{ justifyContent: "flex-start", padding: "1.3rem 0" }} >
                                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                        Already having an account? &nbsp;
                                        <Link to="/auth/login" style={{ textDecoration: "none" }}>
                                            <Li underline="none">
                                                Signin
                                            </Li>
                                        </Link>
                                    </Typography>
                                </Stack>
                            </Box>
                        </Paper>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider >
    );
}
