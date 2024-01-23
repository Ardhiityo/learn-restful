const express = require("express");
const path = require("path");
const methodOverride = require('method-override');
const app = express();
const {
    v4: uuidv4
} = require('uuid');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json()); //untuk mengirim data tipe json
app.use(express.urlencoded({
    extended: true //untuk mengirim data tipe urlencoded
}))
app.use(methodOverride("_method"));

let comments = [{
        id: uuidv4(),
        username: "John",
        text: "lorem ipsum"
    },
    {
        id: uuidv4(),
        username: "Cenna",
        text: "lorem ipsum dolor"
    },
    {
        id: uuidv4(),
        username: "Thor",
        text: "lorem ipsum dolor sit"
    },
    {
        id: uuidv4(),
        username: "Mercator",
        text: "lorem ipsum dolor sit amet"
    },
    {
        id: uuidv4(),
        username: "King",
        text: "lorem ipsum dolor sit amet lorem Ips"
    },

]

app.get("/order", (req, res) => {
    res.send("Get method");
});

app.post("/order", (req, res) => {
    const {
        item,
        qty
    } = req.body;
    res.send(`${item} ${qty}`);
    console.log(`${item} ${qty}`);
});

app.get("/comments", (req, res) => {
    res.render("comments/index", {
        comments
    });
})

app.get("/comments/create", (req, res) => {
    res.render("comments/create");
})

app.post("/comments", (req, res) => {
    const {
        username,
        text
    } = req.body;
    comments.push({
        username,
        text,
        id: uuidv4()
    });
    res.redirect("/comments");
})

app.get("/comments/:id", (req, res) => {
    const {
        id
    } = req.params;
    const comment = comments.find(c => c.id === id);

    res.render("comments/show", {
        comment
    });
})

app.get("/comments/:id/edit", (req, res) => {
    const {
        id
    } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render("comments/edit", {
        comment
    });
});

app.patch("/comments/:id", (req, res) => {
    const {
        id
    } = req.params;
    const newComment = req.body.text;
    const comment = comments.find(c => c.id === id);
    comment.text = newComment;
    res.redirect("/comments");
})

app.delete("/comments/:id", (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect("/comments");
})

app.listen(8080, () => {
    console.log("Server is running on: http://localhost:8080");
})