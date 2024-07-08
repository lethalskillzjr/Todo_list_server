const mongoose = require('mongoose')

const todoSchema = mongoose.Schema(
    
    {
        task: {
            type: String,
            required: [true, "please fill in the product name"],
        },
        completed: {
            type: Boolean
        },
    },
    {
        timestamps: true
    }
)

const todo = mongoose.model('todo', todoSchema);

module.exports = todo;