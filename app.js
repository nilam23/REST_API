const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

const dbConnection = require('./dbCon');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const executeQuery = (query, params) => {
    return new Promise((resolve, reject) => {
        dbConnection.query(query, params, (error, result) => {
            if(error){
                console.log(error.sqlMessage);
                reject(error);
            }
            resolve(result);
        });
    });
}

// get all courses
app.get('/api/courses', async (req, res) => {
    try {
        const query = 'SELECT * FROM courses';
        const params = [];
        var courses = await executeQuery(query, params);
        res.send(courses);
    } catch (error) {
        console.log(error.sqlMessage);
    }
});

// get a specific course given its ID
app.get('/api/courses/:id', async (req, res) => {
    try {
        const query = `select * from courses where id=?`;
        const params = [parseInt(req.params.id)];
        var course = await executeQuery(query, params);
        res.send(course);
    } catch (error) {
        console.log(error.sqlMessage);
    }
});

// create a new course
app.post('/api/courses', async (req, res) => {
    try {
        const course = {
            name: req.body.name
        };
        const query = 'INSERT INTO courses SET ?';
        const params = [course];
        await executeQuery(query, params);
        res.redirect('/api/courses');
    } catch (error) {
        console.log(error);
    }
});

// update an existing course
app.put('/api/courses/:id', async (req, res) => {
    try {
        const query = 'UPDATE courses SET name=? WHERE id=?';
        const params = [
            req.body.name,
            parseInt(req.params.id)
        ];
        const result = await executeQuery(query, params);
        if(!result.affectedRows)
            return res.send('Course not found.');
        return res.redirect('/api/courses');
    } catch (error) {
        console.log(error);
    }
});

// delete an existing course
app.delete('/api/courses/:id', async (req, res) => {
    try {
        const query = 'DELETE FROM courses WHERE id=?';
        const params = [parseInt(req.params.id)];
        const result = await executeQuery(query, params);
        if(!result.affectedRows)
            return res.send('Course not found.');
        return res.redirect('/api/courses');
    } catch (error) {
        console.log(error);
    }
});

app.listen(3000, () => console.log('Server running.'));