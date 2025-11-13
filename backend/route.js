const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require('./db');
const { verifyToken } = require('./middleware');

const app = express();
const PORT = 9000;
const secretKey = 'yfhbyrgarugftgoigjtuohg';

app.use(express.json());

app.get("/test", verifyToken, async(req, res) => {
    try{
        const users_id  = req.users.id;
        const [rows]= await connection.query('SELECT * FROM users WHERE id = ?', [users_id]);
        const users = rows[0];

        res.json({
        id : users.id,
        name : users.name,
        firstname : users.firstname,
        email : users.email

        });

        

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });

    }
});
app.post("/login", (req,res) => {
    res.send("connect a user")
});
app.get("/user", (req,res) => {
    res.send ("view all user information")
});
app.get("/user/todos", (req,res) => {
  
    res.send ("view all user tasks")
});
app.get("/users/:id or:email", (req,res) => {
    res.send ("view user information")
});
app.put("/users/:id", (req,res) => {
    res.send ("update user information")
});
app.delete("/users/:id", (req,res) => {
    res.send ("delete user")
});
app.get("/todos", (req,res) => {
    res.send ("view all the todos")
});
app.get("/todos/:id", (req,res) => {
    res.send ("view the todo")
});
app.post("/todos", (req,res) => {
    res.send ("create a todo")
});
app.put("/todos/:id", (req,res) => {
    res.send ("update a todo")
});
app.delete("/todos/:id", (req,res) => {
    res.send ("delete a todo")
});



app.get("/", (req, res) => res.send("server ok"));
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


module.exports = app;