const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const { Pool } = require('pg');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL Connection Pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve Static Files from the /public directory
app.use(express.static('public'));

// Basic CRUD Routes

// Get All Projects
app.get('/api/projects', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM projects');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a New Project
app.post('/api/projects', async (req, res) => {
    const { project_name, image_name, date, materials, location, attributes, comment } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO projects (project_name, image_name, date, materials, location, attributes, comment) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [project_name, image_name, date, materials, location, attributes, comment]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a Project by ID
app.delete('/api/projects/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM projects WHERE id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Test Route for Connection
app.get('/api/test', async (req, res) => {
    try {
        const result = await pool.query('SELECT 1 + 1 AS result');
        res.json({ message: 'Database connected successfully!', result: result.rows[0].result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Catch-All Route to Serve index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Start the Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
