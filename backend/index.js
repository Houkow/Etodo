
const express = require('express');
const Jwt = require('jsonwebtoken');
const app = express();
const port = 3000;


app.use(express.json());

const SECRET_KEY = process.env.SECRET_KEY || 'dev-secret-key';
app.get('/jwt', (req, res) => {
  console.log(req.body)
  const userData = req.body;

  try {
    
    const token = Jwt.sign(userData, SECRET_KEY, { expiresIn: '1h' });

    
    res.header('Authorization', 'Bearer ' + token);

    res.json({
      status: true,
      message: "Token generated successfully ",
      token: token
    });
  } catch (error) {
    console.error("Error generating token:", error.message);
    res.status(500).json({ status: false, error: error.message });
  }
});


function checkJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: "Token missing " });
  }

  const token = authHeader.split(' ')[1]; 

  try {
    const decoded = Jwt.verify(token, SECRET_KEY);
    req.user = decoded; 
    next(); 
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token " });
  }
}


app.get('/protected', checkJWT, (req, res) => {
  res.json({
    message: "Access granted ",
    user: req.user
  });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
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
// app.get("/protected", verifyToken, (req, res) => {
//   res.json({
//     message: "Access granted",
//     user: req.user,
//   });
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
module.exports = app;