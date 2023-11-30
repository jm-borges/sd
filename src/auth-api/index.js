const express = require('express');
const cors = require('cors');
const knexConfig = require('./knexfile').db;
const knex = require('knex')(knexConfig);

const app = express();

app.use(cors());

app.get('/', async (req, res) => {
    try {
        const teachers = await knex.select('*').from('teachers');
        res.json(teachers);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving data');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
