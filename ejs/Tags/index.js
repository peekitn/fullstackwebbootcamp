// <%= variable %> - JS OUTPUT
// <% console.log("Hello") %> - JS EXECUTE
//<%- <h1>Hello</h1> %> - RENDER HTML
// <% % % %> - Show <% or %>
//<% # This is a comment %> - STOP EXECUTION
//<%- include("header.ejs") %> - INSERT ANOTHER EJS FILE

import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const data = {
    title: "EJS Tags",
    seconds: new Date().getSeconds(),
    items: ["apple", "banana", "cherry"],
    htmlContent: "<strong>This is some strong text</strong>",
  };
  res.render("index.ejs", data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
