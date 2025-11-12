
app.post("/register", (req, res) => {
    res.send("register a new user")
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
module.exports = app;