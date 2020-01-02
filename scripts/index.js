const http = require("http");
const url = require("url");
const getFile = require("./helper/getFile.js");

const mongoose = require("mongoose");
const hostname = "0.0.0.0";
const port = process.env.PORT || 4000;

//mLab database URI 
const MONGOLAB_URI = "mongodb://localhost:27017/NodeTodoList" // enter key and connect to mongo db


module.exports = MONGOLAB_URI;


// mongo

mongoose.connect(MONGOLAB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//create schema for single todo
const todoSchema = new mongoose.Schema({
  title: String
});
const Todo = mongoose.model("Todo", todoSchema);

const server = http.createServer((req, res) => {
  //define url parser to get the query/path..
  const reqUrl = url.parse(req.url, true);

  //get index.html file and send it to client when requested url is /
  if (reqUrl.pathname == "/" && req.method === "GET") {
    getFile(__dirname, "../public/index.html").then(htmlFile => {
      res.writeHead(200, {
        "Content-Type": "text/html"
      });
      res.end(htmlFile);
    });
  }

  //get todo.css file and send it to client when requested url is /style.css
  if (reqUrl.pathname == "/style.css" && req.method === "GET") {
    getFile(__dirname, "../public/style.css").then(cssFile => {
      res.writeHead(200, {
        "Content-Type": "text/css"
      });
      res.end(cssFile);
    });
  }

  //get todo.js file and send it to client when requested url is /todo.js
  if (reqUrl.pathname == "/todo.js" && req.method === "GET") {
    getFile(__dirname, "../public/todo.js").then(jsFile => {
      res.writeHead(200, {
        "Content-Type": "text/javascript"
      });
      res.end(jsFile);
    });
  }

  //send all todos
  if (reqUrl.pathname == "/get-todos" && req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    //find all todos in database and sent it to the client
    Todo.find({}, function (err, data) {
      res.end(JSON.stringify(data));
    });
  }


  if (reqUrl.pathname == "/add-todo" && req.method === "POST") {
    //get data from client
    req.on("data", chunk => {
      //decode buffer and get the new to do object
      let buff = new Buffer(chunk, "base64");
      let newTodoJSON = buff.toString("ascii");
      let newtodoOBJECT = JSON.parse(newTodoJSON);

      //create todo and save it to database
      const todo1 = new Todo({
        title: newtodoOBJECT.title
      });
      todo1.save();
    });
    res.end("todo list updated!"); // ending response to avoid pending on client-side
  }

  //delete todo from database
  if (reqUrl.pathname == "/delete-todo" && req.method === "POST") {
    //get data from client
    req.on("data", chunk => {
      //decode buffer and get the new to do object
      let buff = new Buffer(chunk, "base64");
      let deleteTodoJSON = buff.toString("ascii");
      let deleteTodoOBJECT = JSON.parse(deleteTodoJSON);

      console.log(deleteTodoOBJECT);
      Todo.deleteOne({
          _id: deleteTodoOBJECT.id
        },
        function (err) {
          console.log(err);
        }
      );
    });
    res.end("todo list updated!"); // ending response to avoid pending on client-side
  }
});

server.listen(port, hostname, function () {
  console.log("server is running");
});