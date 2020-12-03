const express = require('express');
const mysql = require('mysql');
const morgan = require('morgan');
const path = require('path');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();

// Settings
const PORT = process.env.PORT || 3050;

//Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//Static files
app.use(express.static(path.join(__dirname, 'public')));


//MySQL connection 
const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database

});

// Routes
app.get('/', (req, res)=>{
    res.send("Welcome to my API");
});

//all customers
app.get('/operations', (req, res)=>{
    const sql = "SELECT id,details,amount,email,date_format(created, '%d-%m-%Y %T') as created ,type FROM operations ORDER BY created DESC"
    connection.query(sql, (error, results)=>{
        if(error) throw error;
        if(results.length > 0){
            res.status(200);
            res.json(results);
        }else{
            res.status(204);
            res.send('Not result');
        };
    });
});
app.get('/operations-last-10', (req, res)=>{
    const sql = 'SELECT * FROM operations ORDER BY created DESC LIMIT 10';
    connection.query(sql, (error, results)=>{
        if(error) throw error;
        if(results.length > 0){
            res.status(200);
            res.json(results);
        }else{
            res.send('Not result');
        };
    });
});

app.get('/operations/:id', (req, res)=>{
    const {id} = req.params;
    const sql = `SELECT * FROM operations WHERE id = ${id}`;
    connection.query(sql, (error, result)=>{
        if(error) throw error;
        if(result.length > 0){
            res.status(200);
            res.json(result);
        }else{
            res.send('Not result');
        };
    });
});

app.post('/add/:type', (req, res)=>{
    const {type} = req.params;
    const sql = `INSERT INTO ${type} SET ?`;

    const operationObj = {
        amount: req.body.amount,
        details: req.body.details,
        email: req.body.email,
        type: req.body.type
    };
    const userObj = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    };

    if(type === 'operations'){
        connection.query(sql, operationObj, error =>{
            if(error) throw error;
            res.status(201);
            res.send('Operation is created');
        });
    }else if(type === 'users'){
        connection.query(sql, userObj, error =>{
            if(error) throw error;
            res.status(201);
            res.send('New user created');     
        });
    }

});

app.put('/update/:id', (req, res)=>{
    const {id} = req.params;
    const {amount, details} = req.body;
    const sql = `UPDATE operations SET details = '${details}', amount = '${amount}' WHERE id=${id}`;
    connection.query(sql, error =>{
        if(error) throw error;
        res.status(200);
        res.send('Operation updated!');
    })
});
app.delete('/delete/:id', (req, res)=>{
    const {id} = req.params;
    const sql = `DELETE FROM operations WHERE id=${id}`;
    connection.query(sql, error =>{
        if(error) throw error;
        res.status(200);
        res.send('Operation is deleted!');
    })
});

//check connect
connection.connect(error =>{
    if(error) throw error;
    console.log('Database server running!');
});
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));