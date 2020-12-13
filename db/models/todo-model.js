// Import Mongoose
const mongoose = require('mongoose');

// Create Todo Model
const Todo = mongoose.model('Todo', {
    todo: {
        type: String,
        required: true,

    },
    date: {
        type: Date,
        default: Date.now()
    }
});

// Export Todo
module.exports = Todo;