// Configuring Express.JS
const express = require("express");
const app = express();
const port = 2012;
const cors = require("cors");
app.use(cors(), express.json());

// Configuring Dotenv
require("dotenv").config();

// Configuring Mongoose
const mongoose = require("mongoose");
const url = `mongodb+srv://${process.env.DBUsername}:${process.env.Password}@abyan-cluster.bosaac5.mongodb.net/ToDo`;

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log(
      "Successfully connected to your database:",
      mongoose.connection.name
    );
  } catch (error) {
    console.log(error);
  }
};

// Creating our schema
const toDo = new mongoose.Schema({
  toDo: String,
});

// Creating Model
const ToDo = mongoose.model("ToDo", toDo);

// Assuring our server is running properly
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// Getting what to do from client
app.post("/add", async (req, res) => {
  try {
    const userData = req.body;
    console.log(userData);

    const newTask = new ToDo({
      toDo: userData.todo,
    });
    await newTask.save();

    res.send({
      message: "Successful!",
      sent: userData.todo,
    });
  } catch (error) {
    res.send({ Error: error });
  }
});

// Getting all students
app.get("/all", async (req, res) => {
  try {
    const allTasks = await ToDo.find();
    res.send(allTasks);
  } catch (error) {
    res.send(error);
  }
});

// Deleting Tasks
app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteTask = await ToDo.findByIdAndDelete(id);
    res.send({ message: "Successful!" });
  } catch (error) {
    console.error(error);
  }
});

// Updating Task
app.put("/update/:id", async (req, res) => {
  try {
    const toDo = req.body;
    const id = req.params.id;
    const updateTask = await ToDo.findByIdAndUpdate(id, toDo, {
      new: true,
    });
    res.send({ message: "Successful", updatedData: updateTask });
  } catch (error) {
    console.error(error);
  }
});

// Listening our app
app.listen(port, async () => {
  console.log("Your app is running on port:", port);
  await connectDB();
});
