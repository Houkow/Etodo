const cors = require('cors');
const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./db');
const Jwt = require('jsonwebtoken');



const app = express();
const PORT= 8000;
const SECRET_KEY = process.env.SECRET_KEY || 'dev-secret-key';

app.use(express.json());
app.use(cors({origin: 'http://localhost:3000'}));
const router = express.Router();


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




router.post('/register', async (req, res) => {
    const { name, firstname, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO users (name, email, firstname, password) VALUES (?, ?, ?, ?)';
        db.query(query, [name, email, firstname, hashedPassword], (err, result) => {
            if (err) throw err;
            res.status(201).send('User registered successfully');
        });
    } catch (error) {
        res.status(500).send('Error registering user');
    }
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;


    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            const user = results[0];

            const isMatch = await bcrypt.compare(password, user.password);
            

            if (isMatch) {
                const token = Jwt.sign({ password: user.password, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
        console.log('Token généré :', token);
            } else {
                res.status(401).send('Invalid credentials');
            }
        } else {
            res.status(404).send('User not found');
        }
    });
});

router.get('/protected', checkJWT, (req, res) => {
  res.json({
    message: "Access granted ",
    user: req.user
  });
});


app.use("/user", router);
app.get("/", (req, res)=> res.send("server ok"));
app.listen(PORT,()=> console.log(`server running on ${PORT}`));