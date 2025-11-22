import express from 'express';
import connection from './db.js';
import router, { checkJWT,} from './auth.js';
import cors from 'cors';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/user', checkJWT, async (req, res) => {
    try {
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
                role : user.role
            });
        });


    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

app.get('/todos', checkJWT, async (req, res) => {
   try {
        var todos;

        const query = 'SELECT * FROM todo ';
        connection.query(query, function (err, results) {
            if (err) throw err;

            todos = results;

            if (results.length > 0) {
                todos = results;
                console.log("user  inside callback: ", todos)
            
            } else {
                res.status(404).send('User not found');
            }
    
            res.json({todos});
        });


    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

app.get('/user/todos', checkJWT, async (req, res) => {
   try {
        const task_userid = req.user.id;
        const data_userid = req.query.user_id;
        console.log(task_userid);

        
        if (data_userid && (data_userid) !== (task_userid)) {
            return res.status(403).send('Forbidden');
        }

        const query = 'SELECT * FROM todo WHERE user_id = ? ';
        connection.query(query, [task_userid], function (err, results) {

            if (results.length > 0) {
                return res.json({ todos: results });
            } else {
                return res.status(404).send('Todos not found');
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
app.put('/todos/:id', checkJWT, (req, res) => {
    const todoId = req.params.id;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ message: "Missing status" });
    }

    const query = "UPDATE todo SET status = ? WHERE id = ?";

    connection.query(query, [status, todoId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error updating task" });
        }

        return res.json({ message: "Status updated successfully" });
    });
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