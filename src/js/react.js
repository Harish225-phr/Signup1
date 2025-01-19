import {
    Box,
    Container,
    Paper,
    useMediaQuery,
    Button,
    TextField,
} from "@mui/material";
import { useState } from "react";

import style from "@/components/Login/Login.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Login = () => {
    const [ssoframeId, setssoframeId] = useState("");

    const getIframe = (service_id, service_type, login_type) => {
        getIframeSSO(service_id, service_type, login_type);
    };

    return (
        <>
            <Box className={style.fullbg}></Box>
            <Container
                maxWidth="md"
                sx={{ marginTop: 6, marginBottom: 6, position: "relative" }}
            >
                <div class="backdrop"></div>{" "}
                <div id="iframeContainer" class="iframe-container"></div>
                <script
                    src="To be Provided by the Department"
                    defer=""
                ></script>
                <Box className={style.backdrop} />
                <Paper elevation={1}>
                    <TextField
                        focused
                        size="small"
                        required
                        value={ssoframeId}
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^[a-zA-Z_@+.\d+]*$/.test(inputValue)) {
                                setssoframeId(inputValue);
                            }
                        }}
                        fullWidth
                        label="SSO Frame ID"
                        variant="outlined"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={() => getIframe(ssoframeId, "forgot_password")}
                        style={{ marginTop: 10 }}
                    >
                        forgot password iframe
                    </Button>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={() => getIframe(ssoframeId, "register")}
                        style={{ marginTop: 10 }}
                    >
                        Sign In with SSO register iframe
                    </Button>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={() => getIframe(ssoframeId, "login", "")}
                        style={{ marginTop: 10 }}
                    >
                        Sign In with SSO login iframe
                    </Button>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={() => getIframe(ssoframeId, "login", "Citizen")}
                        style={{ marginTop: 10 }}
                    >
                        Citizen Login
                    </Button>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={() => getIframe(ssoframeId, "login", "Government")}
                        style={{ marginTop: 10 }}
                    >
                        Gov Login
                    </Button>
                </Paper>
            </Container>
        </>
    );
};
export default Login;
