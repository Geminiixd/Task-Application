const mysql = require('mysql2').createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'todos'
})
const express = require('express')

const PORT = 3000
const app = express()


const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const query = 'INSERT INTO todos (text, completed) VALUES (?, ?)';
        const [rows, fields] = await mysql.promise.query(query, [req.body.text, req.body.completed || false]); // Default completed to false
        res.status(201).json({ id: rows[0].id, text: req.body.text, completed: req.body.completed || false });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/help', async (req, res) => {

    const query = 'SELECT * FROM todos';
    const [rows, fields] = await mysql.promise.query(query);
    res.json(rows);
    res.status(200).header('Access-Control-Allow-Origin', '*').send()
});























app.listen(PORT, () => {
    console.log('Server is running...')
})