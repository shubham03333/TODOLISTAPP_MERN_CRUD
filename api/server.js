const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const app = express();

const port = 3001;

app.use(express.json());

app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/mern-todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to DB"))
  .catch(console.error);
// app.get("/", (req, res) => res.send("Hello World!"));

const Todo = require("./models/Todo");

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todo/new", async (req, res) => {
  const todo = await new Todo({
    text: req.body.text,
  });
  todo.save();

  res.json(todo);
});
app.delete("/todo/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
});

app.get("/todo/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.complete = !todo.complete;

  todo.save();

  res.json(todo);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
