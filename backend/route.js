import express from 'express';
import connection from './db.js';
import router, { checkJWT } from './auth.js';
import cors from 'cors';

const app = express();

// ✅ IMPORTANT: Render impose process.env.PORT
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// ✅ FIX CORS pour production (GitHub Pages + Render)
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// view all user information
app.get('/user', checkJWT, (req, res) => {
    const query = 'SELECT * FROM users';

    connection.query(query, (err, results) => {
        if (err) return res.status(500).json({ message: 'DB Error' });

        if (results.length === 0) {
            return res.status(404).send('User not found');
        }

        return res.json({
            users: results
        });
    });
});

// view current user
app.get('/user/me', checkJWT, (req, res) => {
    const user_email = req.user.email;

    const query = 'SELECT * FROM users WHERE email = ?';

    connection.query(query, [user_email], (err, results) => {
        if (err) return res.status(500).json({ message: 'DB Error' });

        if (results.length === 0) {
            return res.status(404).send('User not found');
        }

        const user = results[0];

        return res.json({
            id: user.id,
            name: user.name,
            firstname: user.firstname,
            email: user.email,
            role: user.role
        });
    });
});

// get all todos
app.get('/todos', checkJWT, (req, res) => {
    const query = 'SELECT * FROM todo';

    connection.query(query, (err, results) => {
        if (err) return res.status(500).json({ message: 'DB Error' });

        return res.json({ todos: results });
    });
});

// get user todos
app.get('/user/todos', checkJWT, (req, res) => {
    const task_userid = req.user.id;

    const query = 'SELECT * FROM todo WHERE user_id = ?';

    connection.query(query, [task_userid], (err, results) => {
        if (err) return res.status(500).json({ message: 'DB Error' });

        if (results.length === 0) {
            return res.status(404).send('Todos not found');
        }

        return res.json({ todos: results });
    });
});

// update todo
app.put('/todos/:id', checkJWT, (req, res) => {
    const todoId = req.params.id;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ message: "Missing status" });
    }

    const query = "UPDATE todo SET status = ? WHERE id = ?";

    connection.query(query, [status, todoId], (err) => {
        if (err) return res.status(500).json({ message: "DB Error" });

        return res.json({ message: "Status updated successfully" });
    });
});

// create todo
app.post('/todos', checkJWT, (req, res) => {
    const { title, description, due_time, user_id } = req.body;

    const query = `
        INSERT INTO todo (title, description, due_time, user_id)
        VALUES (?, ?, ?, ?)
    `;

    connection.query(query, [title, description, due_time, user_id], (err) => {
        if (err) return res.status(500).json({ message: "DB Error" });

        return res.status(201).send("Todo created successfully");
    });
});

// delete todo
app.delete('/todos/:id', checkJWT, (req, res) => {
    const todoId = req.params.id;

    const query = "DELETE FROM todo WHERE id = ?";

    connection.query(query, [todoId], (err) => {
        if (err) return res.status(500).json({ message: "DB Error" });

        return res.json({ message: "Todo deleted successfully" });
    });
});

// routes auth
app.use('/user', router);

// health check
app.get('/', (req, res) => res.send('server ok'));

// start server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});

export default app;