

const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./db');


const app = express();
const PORT= 3000;

app.use(express.json());

const router = express.Router();



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
                res.status(200).send('Login successful');
            } else {
                res.status(401).send('Invalid credentials');
            }
        } else {
            res.status(404).send('User not found');
        }
    });
});

app.use("/user", router);
app.get("/", (req, res)=> res.send("server ok"));
app.listen(PORT,()=> console.log(`server running on ${PORT}`));