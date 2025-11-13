import express from 'express';
import connection from './db.js';
import router, { checkJWT } from './auth.js';
import cors from 'cors';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/register', checkJWT, async (req, res) => {
    try {
        // console.log("req: ", req)
        const user_email = req.user.email;
        console.log(user_email)
        var user;

        const query = 'SELECT * FROM users WHERE email = ?';
        connection.query(query, [user_email], function (err, results) {
            if (err) throw err;

            if (results.length > 0) {
                user = results[0];
                console.log("user  inside callback: ", user)
            } else {
                res.status(404).send('User not found');
            }

            // A move en dehors a l'avenir
            console.log("user before res: ", user)
            console.log("hello")
    
            res.json({
                id: user.id,
                name: user.name,
                firstname: user.firstname,
                email: user.email,
            });
        });


    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/login', (req, res) => {
    res.send('connect a user');
});
app.get('/user', (req, res) => {
    res.send('view all user information');
});
app.get('/user/todos', (req, res) => {
    res.send('view all user tasks');
});
app.get('/users/:id or:email', (req, res) => {
    res.send('view user information');
});
app.put('/users/:id', (req, res) => {
    res.send('update user information');
});
app.delete('/users/:id', (req, res) => {
    res.send('delete user');
});
app.get('/todos', (req, res) => {
    res.send('view all the todos');
});
app.get('/todos/:id', (req, res) => {
    res.send('view the todo');
});
app.post('/todos', (req, res) => {
    res.send('create a todo');
});
app.put('/todos/:id', (req, res) => {
    res.send('update a todo');
});
app.delete('/todos/:id', (req, res) => {
    res.send('delete a todo');
});


app.use('/user', router);
app.get('/', (req, res) => res.send('server ok'));
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

export default app;