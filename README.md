# Simple todo list app in node.js 

If you want to run the app on your machine, first you have to set up local mongo db server. 
In my case connecting to database looks like this:

const MONGOLAB_URI = "mongodb://localhost:27017/NodeTodoList" 
mongoose.connect(MONGOLAB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

I have created NodeTodoList collection in database. You can crate your own collection, but you will have to change "NodeTodoList" to your own name. Next you have to run "npm run" and it should be working :D
