import './App.css';
import { createTheme, CssBaseline, ThemeProvider, Container, CircularProgress, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Login from "./Layout/Login";
import Prizes from "./Menus/Prizes";
import Menu from "./Layout/Menu";
import Content from "./Layout/Content";
import Sections from "./Layout/Sections";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    const [selectedTab, setSelectedTab] = useState(Sections[0].id);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Optional: You can add code here to check if the user is already logged in
        // and set the token if it exists, or handle redirection.
    }, []);

    const handleLogin = (token) => {
        console.log("Login successful, setting token:", token);
        setToken(token);
    };

    if (loading) {
        return (
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Container>
                    <CircularProgress />
                </Container>
            </ThemeProvider>
        );
    }

    console.log("Rendering App with token:", token);

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div className="App">
                {!token ? (
                    <Login onLogin={handleLogin} />
                ) : (
                    <>
                        <Menu selectedTab={selectedTab} changeSelectedTab={(e, v) => setSelectedTab(v)} />
                        <Prizes token={token} />
                    </>
                )}
            </div>
        </ThemeProvider>
    );
}

export default App;
