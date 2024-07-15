const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rajesh11',
    database: 'my_database'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
});

// Get all employees
app.get('/employees', (req, res) => {
    connection.query('SELECT * FROM employees', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Add a new employee
app.post('/employees', (req, res) => {
    const newEmployee = req.body;
    connection.query('INSERT INTO employees SET ?', newEmployee, (err, result) => {
        if (err) throw err;
        res.status(201).json({ id: result.insertId, ...newEmployee });
    });
});

// Update an employee
app.put('/employees/:id', (req, res) => {
    const { id } = req.params;
    const updatedEmployee = req.body;
    connection.query('UPDATE employees SET ? WHERE id = ?', [updatedEmployee, id], (err, result) => {
        if (err) throw err;
        res.json({ id, ...updatedEmployee });
    });
});

// Delete an employee
app.delete('/employees/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM employees WHERE id = ?', id, (err, result) => {
        if (err) throw err;
        res.status(204).send();
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
