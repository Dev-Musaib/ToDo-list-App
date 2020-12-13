// Import Modules
const express = require('express');
const path = require('path');
const Todo = require('../db/models/todo-model.js');
const methodOverride = require('method-override');
require('../db/mongoose.js');

// Instantiate Express Server
const app = express();

// Set Up EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Built-in Middlewares
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join('../public')));

// Home Route
app.get('/', async(req, res) => {

    // Fetch All Users
    const todos = await Todo.find({});

    // Render Home Page
    res.render('index', {
        todos: todos
    });
})

// Todo Create Route
app.post('/todos', async(req, res) => {

    try {
        // Create User
        const todo = new Todo(req.body);

        // Save Todo
        todo.save()
        res.status(201).redirect('/');

    } catch(e) {
        res.status(400).send();
    }
})

// Todo Delete Route
app.delete('/todos/:id', async (req, res) => {
    // Find Todo
    await Todo.findByIdAndDelete(req.params.id);
    res.redirect('/');
})

// Open a Port
var server = app.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log("Express is working on port " + port);
});