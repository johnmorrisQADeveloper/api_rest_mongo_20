const express = require('express')
const router = express.Router()
const Todo = require('../models/Todo')

// get all Todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find()
    res.json(todos)
  } catch (error) {
    res.json(error)
  }
})

// post a Todos
router.post('/', async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    completed: req.body.completed
  })
  try {
    const todoSaved = await todo.save()
    res.json(todoSaved)
  } catch (error) {
    res.json(error)
  }
})

// get a specific Todo
router.get('/:todoId', async (req, res) => {
  console.log(req.params.TodoId)
  try {
    const todo = await Todo.findById(req.params.todoId)
    res.json(todo)
  } catch (error) {
    res.json(error)
  }
})

// get n number of Todo
router.get('/count/:number', async (req, res) => {
  console.log(req.params.number)
  try {
    const todo = await Todo.find().limit(Number(req.params.number))
    res.json(todo)
  } catch (error) {
    res.json(error)
  }
})

// delete a specific Todo
router.delete('/:todoId', async (req, res) => {
  console.log(req.params.todoId)
  try {
    const todo = await Todo.deleteOne({ _id: req.params.todoId })
    res.json(todo)
  } catch (error) {
    res.json(error)
  }
})

// update a record
router.patch('/:todoId', async (req, res) => {
  console.log(req.params.todoId)
  try {
    const { _id, title, completed, __v } = req.body
    const vidoes = await Todo.updateOne({ _id: req.params.todoId },
      { $set: { _id, title, completed, __v } })
    res.json(vidoes)
  } catch (error) {
    res.json(error)
  }
})
module.exports = router
