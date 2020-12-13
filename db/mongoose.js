// Import Mongoose
const mongoose = require('mongoose');

// Local Variables
const urlName = 'mongodb://127.0.0.1:27017';
const dbName = 'todo-app';

// Connect To Server
mongoose.connect(`${urlName}/${dbName}`, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true
});

// Export Mongoose
module.exports = mongoose;