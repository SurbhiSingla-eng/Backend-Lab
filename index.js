const express = require('express');
const mongoose = require('mongoose');

// The online compiler automatically loads your secrets into process.env
const MONGO_URI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

const todoRepository = require('./repositories/todo.repository');
const app = express();

app.use(express.json());

// --- Database Connection ---
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Atlas connected successfully.'))
    .catch(err => console.error('MongoDB connection error:', err));


// --- API ROUTES ---

// GET /todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await todoRepository.getAllTodos();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving todos' });
    }
});

// GET /todos/:id
app.get('/todos/:id', async (req, res) => {
    try {
        const todo = await todoRepository.getTodoById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving todo' });
    }
});

// POST /todos
app.post('/todos', async (req, res) => {
    try {
        const newTodo = await todoRepository.createTodo(req.body);
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ message: 'Error creating todo', error });
    }
});

// PUT /todos/:id
app.put('/todos/:id', async (req, res) => {
    try {
        const updatedTodo = await todoRepository.updateTodo(req.params.id, req.body);
        if (!updatedTodo) return res.status(404).json({ message: 'Todo not found' });
        res.json(updatedTodo);
    } catch (error) {
        res.status(400).json({ message: 'Error updating todo', error });
    }
});

// DELETE /todos/:id
app.delete('/todos/:id', async (req, res) => {
    try {
        const deletedTodo = await todoRepository.deleteTodo(req.params.id);
        if (!deletedTodo) return res.status(404).json({ message: 'Todo not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting todo' });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});
