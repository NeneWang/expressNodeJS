const express  = require("express");
const mongoose = require("mongoose");


const app = express();
const importData = require("./data.json")
let port = process.env.PORT || 3000;



mongoose.connect("mongodb+srv://nelson:1223@cluster0.kzhr5.mongodb.net/todo?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

const todosSchema = new mongoose.Schema({
  userId: mongoose.Schema.ObjectId,
  todos: [
    {
      checked: Boolean,
      text: String,
      id: String,
    },
  ],
});
const Todos = mongoose.model("Todos", todosSchema);

app.get("/", (req, res) => {
    res.send("Hello World")
});

app.get("/players", (req, res) => {
    res.json(importData);
} )

app.get("/users", async (req, res) => {
    
  const adqUsers = await User.findOne({"username":"wangnelson2@gmail.com"}).exec();
    res.send(adqUsers);
} )


app.listen(port, () => {
    console.log(`Example app is listening on port http://localhost:${port}`);
})



