import express from "express";                                  // Import express package
import moment from "moment-timezone";

const app = express();                                          // Instance for express
const PORT = 5000; // Set port as 5000

let posts = [];                                                 // Handle posts

app.use(express.static("public"));                              // Access public folder
app.use(express.urlencoded({extended: true}));                  // Handle actions like form submissions

app.get("/", (req, res) => {                                    // 'Home' page
    res.render("index.ejs");
});

app.get("/post", (req, res) => {                                // 'Create a new post' page
    res.render("post.ejs");
});

app.get("/view", (req, res) => {                                // 'View posts' page
    res.render("view.ejs", {posts});
});

app.get("/update", (req, res) => {                              // 'Update a post' page
    res.render("update.ejs", {posts});
});

app.get("/delete", (req, res) => {                              // 'Delete a post' page
    res.render("delete.ejs", {posts});
});

app.get("/about", (req, res) => {                               // 'About' page
    res.render("about.ejs");
});

app.get("/contact", (req, res) => {                             // 'Contact' page
    res.render("contact.ejs")
});

app.post("/create", (req, res) => {                             // Add new post
    const currentDate = moment().tz("Asia/Kolkata").format("DD-MM-YYYY HH:mm:ss");
    const newPost = {
        id: posts.length+1,
        title: req.body.title,
        content: req.body.content,
        datePosted: currentDate.toLocaleString("en-US", {timeZone: "Asia/Kolakata"}),
        dateUpdated: null
    };
    posts.push(newPost);
    res.redirect("/");
});

app.post("/edit", (req, res) => {                               // Edit a post
    const currentDate = moment().tz("Asia/Kolkata").format("DD-MM-YYYY HH:mm:ss");
    const postId = parseInt(req.body.id, 10);
    const post = posts.find(p => p.id === postId);
    post.title = req.body.title;
    post.content = req.body.content;
    post.dateUpdated = currentDate.toLocaleString("en-US", {timeZone: "Asia/Kolakata"});
    res.redirect("/");
});

app.post("/remove", (req, res) => {                             // Delete a post
    const postId = parseInt(req.body.id, 10);
    const postIndex = posts.findIndex(p => p.id === postId);
    posts.splice(postIndex, 1);
    res.redirect("/");
});

app.listen(PORT, (req, res) => {                                // Listen the server on the port
    console.log(`Server running on port ${PORT}`);
});

