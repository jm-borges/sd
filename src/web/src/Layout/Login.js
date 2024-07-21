import React, { useState } from 'react';
import { TextField, Button, Container, Typography, CircularProgress, Alert } from '@mui/material';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            console.log('Response Status:', response.status);  // Log do status da resposta

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Login failed with status:', response.status);
                console.error('Response Text:', errorText);
                setError('Login failed. Please check your credentials.');
                setLoading(false);
                return;
            }

            const data = await response.json();
            console.log('Response Data:', data);  // Log dos dados da resposta

            if (data.accessToken) {
                onLogin(data.accessToken);
            } else {
                console.error('Login failed, no token found');
                setError('Login failed, no token found.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred during login. Please try again.');
        }
        setLoading(false);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Login</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleLogin}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
        </Container>
    );
};

export default Login;
