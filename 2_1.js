const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
let todos = [
    { id: 1, task: 'Wake up', completed: true },
    { id: 2, task: 'Learn backend development', completed: false },
    { id: 3, task: 'Build a REST API', completed: false }
];
app.get('/todos', (req, res) => {
    res.json(todos);
});
app.get('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id, 10);
    const todo = todos.find(t => t.id === todoId);

    if (todo) {
        res.json(todo);
    } else {
        res.status(404).json({ message: 'To-do item not found' });
    }
});
app.post('/todos', (req, res) => {
    const newTodo = {
        id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
        task: req.body.task,
        completed: false
    };

    if (!newTodo.task) {
        return res.status(400).json({ message: 'Task is required' });
    }

    todos.push(newTodo);
    res.status(201).json(newTodo);
});
app.put('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id, 10);
    const todo = todos.find(t => t.id === todoId);

    if (todo) {
        todo.task = req.body.task || todo.task;
        todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
        res.json(todo);
    } else {
        res.status(404).json({ message: 'To-do item not found' });
    }
});
app.delete('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id, 10);
    const todoIndex = todos.findIndex(t => t.id === todoId);

    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'To-do item not found' });
    }
});
app.listen(port, () => {
    console.log(`Server is running!`);
});
