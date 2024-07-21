require('dotenv').config();
const express = require('express');
const cors = require('cors');
const knexConfig = process.env.NODE_ENV === 'test'
    ? require('./knexfile.test').test
    : require('./knexfile').db;
const knex = require('knex')(knexConfig);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const validRoles = ['view', 'edit', 'admin'];
    if (!validRoles.includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
    }

    try {
        const existingUser = await knex('users').where({ username }).first();
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        await knex('users').insert({
            username,
            password: hashedPassword,
            role
        });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await knex('users').where({ username }).first();
        if (user && await bcrypt.compare(password, user.password)) {
            const accessToken = jwt.sign({ username: user.username, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            res.json({ accessToken });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
    }
});

app.get('/me', authenticateToken, async (req, res) => {
    try {
        const user = await knex('users').where({ username: req.user.username }).first();
        res.json({ username: user.username, role: user.role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving user information' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
