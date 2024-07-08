const express = require('express')
const mongoose = require('mongoose')
//const Product = require('./models/productModel')
const Todo = require ('./models/Todo')
const cors = require('cors');

const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

//routes
//get all todos
app.get('/todos', async(req, res) => {
    try {
        const todos = await Todo.find({})
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

//add todo
app.post('/todos', async(req, res) => {
    try {
        const todo = await Todo.create(req.body)
        res.status(200).json(todo);

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

//update a product
app.put('/todos/:id', async(req, res) => {
    try {
        const {id} = req.params
        const todo = await Todo.findByIdAndUpdate(id, req.body)
        // if cannot find product in database
        if(!todo){
            return res.status(404).json({message: 'cannot find any todo with ID ${id}'})
        }
        const updatedTodo = await Todo.findById(id)
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete todo
app.delete('/todos/:id', async(req, res) => {
    try {
        const {id} = req.params
        const todo = await Todo.findByIdAndDelete(id)
        if(!todo){
            return res.status(404).json({message: 'cannot find any todo with ID $(id)'})
        }
        res.status(200).json(todo);
    } catch (error) {
            res.status(500).json({message: error.message})
    }
})

mongoose.connect('mongodb+srv://Ginko:fYAUVKh0fsSTJOsL@cluster0.mmlv1.mongodb.net/todo-task?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('connected to mongoDB')
    app.listen(7000, () => {
        console.log('node api is running at port 7000')
    })
}).catch((error) => {
    console.log(error)
})