const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");



const app = express();
const importData = require("./data.json")
let port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


mongoose.connect("mongodb+srv://nelson:1223@cluster0.kzhr5.mongodb.net/questBoard?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const userSchema = new mongoose.Schema({
    username: String,
    tags: String,
    questsCompleted: Number,

});
const User = mongoose.model("User", userSchema);

const questSchema = new mongoose.Schema({
    questName: String,
    completed: Boolean,
    description: String,
    tags: String,
    questBoard: Number
});
const Quest = mongoose.model("Quest", questSchema);



app.get("/", (req, res) => {
    res.send("Welcom to Questboard API")
});


app.get("/users", async (req, res) => {

    const adqUsers = await User.find({}).exec();
    res.send(adqUsers);
})


app.post("/users", async (req, res) => {
    const {
        username,
        tags,
        questsCompleted
    } = req.body;
    const user = await User.findOne({
        username
    }).exec();
    if (user) {
        user.tags = tags;
        user.questsCompleted = questsCompleted;
        res.json({
            message: "User updated",
            newUser: user
        });
    } else {
        const newUser = await User.create({
            username,
            tags,
            questsCompleted
        });
        res.json({
            message: "user created",
            newUser: newUser
        });
    }

});

app.get("/quests", async (req, res) => {

    const adqQuests = await Quest.find({}).exec();
    res.send(adqQuests);
});

app.post("/quests", async (req, res) => {
    const {
        o_id,
        questName,
        completed,
        description,
        tags,
        questBoard,
    } = req.body;
    const quest = await Quest.findById(o_id)

    if (quest) {
        quest.questName = questName;
        quest.completed = completed;
        quest.description = description;
        quest.tags = tags;
        quest.questBoard = questBoard;
        res.json({
            message: "Quest updated",
            newUser: quest
        });
    } else {
        const newQuest = await Quest.create({
            questName,
            completed,
            description,
            tags,
            questBoard,
        });
        res.json({
            message: "quest created",
            newUser: newQuest
        });
    }
})

app.post("/new-quest", async (req, res) => {
    const {
        questName,
        description,
        tags,
        questBoard,
    } = req.body;

    const completed = false;
    const newQuest = await Quest.create({
        questName,
        completed,
        description,
        tags,
        questBoard,
    });
    res.json({
        message: "quest created",
        newUser: newQuest
    });

})



app.listen(port, () => {
    console.log(`Example app is listening on port http://localhost:${port}`);
})