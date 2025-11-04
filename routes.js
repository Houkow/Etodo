const express = require('express');

const router = express.Router();
router.post("/register", (req, res) => {
    res.send("register a new user")
});
router.post("/login", (req,res) => {
    res.send("connect a user")
});
router.get("/user", (req,res) => {
    res.send ("view all user information")
});
router.get("/user/todos", (req,res) => {
    res.send ("view all user tasks")
});
router.get("/users/:id or:email", (req,res) => {
    res.send ("view user information")
});
router.put("/users/:id", (req,res) => {
    res.send ("update user information")
});
router.delete("/users/:id", (req,res) => {
    res.send ("delete user")
});
router.get("/todos", (req,res) => {
    res.send ("view all the todos")
});
router.get("/todos/:id", (req,res) => {
    res.send ("view the todo")
});
router.post("/todos", (req,res) => {
    res.send ("create a todo")
});
router.put("/todos/:id", (req,res) => {
    res.send ("update a todo")
});
router.delete("/todos/:id", (req,res) => {
    res.send ("delete a todo")
});
module.exports = router;