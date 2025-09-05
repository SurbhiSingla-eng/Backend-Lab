const Todo = require('../models/todo.model');

class TodoRepository {
    async getAllTodos() {
        return await Todo.find();
    }

    async getTodoById(id) {
        return await Todo.findById(id);
    }

    async createTodo(todoData) {
        const newTodo = new Todo(todoData);
        return await newTodo.save();
    }

    async updateTodo(id, updateData) {
        return await Todo.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteTodo(id) {
        return await Todo.findByIdAndDelete(id);
    }
}

module.exports = new TodoRepository();
