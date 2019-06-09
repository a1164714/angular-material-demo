const _ = require("lodash");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

var TODOS = [
    { id: 1, userId: 1, name: "Get Milk", completed: false },
    { id: 2, userId: 1, name: "Fetch Kids", completed: true },
    { id: 3, userId: 2, name: "Buy flowers for wife", completed: false },
    { id: 4, userId: 3, name: "Finish Angular JWT Todo App", completed: false }
];

var USERS = [{ id: 1, username: "jemma" }, { id: 2, username: "paul" }, { id: 3, username: "sebastian" }];

var TREE_MAP = {
    "1": [
        { id: "3", name: "Apple", isExpandable: true },
        { id: "4", name: "Orange", isExpandable: false },
        { id: "5", name: "Banana", isExpandable: false }
    ],
    "2": [{ id: "6", name: "Tomato", isExpandable: true }, { id: "7", name: "Potato", isExpandable: false }],
    "3": [{ id: "8", name: "Fuji", isExpandable: false }, { id: "9", name: "Macintosh", isExpandable: false }],
    "6": [
        { id: "10", name: "Yellow", isExpandable: false },
        { id: "11", name: "White", isExpandable: false },
        { id: "12", name: "Black", isExpandable: false }
    ]
};

var ROOT_NODE = [
    { id: "1", name: "Fruits", isExpandable: true },
    { id: "2", name: "Vegetables", isExpandable: true }
];

function getTodos(userID) {
    var todos = _.filter(TODOS, ["userId", userID]);
    return todos;
}
function getTodo(todoID) {
    var todo = _.find(TODOS, function(todo) {
        return todo.id == todoID;
    });
    return todo;
}
function getUsers() {
    return USERS;
}

function getRoots(){
    return ROOT_NODE;
}

function getNodes(nodeId){
    return TREE_MAP[nodeId];
}

app.use(bodyParser.json());
app.use(expressJwt({ secret: "todo-app-super-shared-secret" }).unless({ path: ["/api/auth"] }));

app.get("/", function(req, res) {
    res.send("Angular JWT Todo API Server");
});

app.post("/api/auth", function(req, res) {
    const body = req.body;

    const user = USERS.find(user => user.username == body.username);
    if (!user || body.password != "todo") return res.sendStatus(401);

    var token = jwt.sign({ userId: user.id }, "todo-app-super-shared-secret", { expiresIn: "2h" });
    res.send({ token });
});

app.get("/api/todos", function(req, res) {
    console.log(req.user);
    res.type("json");
    res.send(getTodos(req.user.userId));
});

app.delete("/api/todos/:id", function(req, res) {
    var todoId = req.params.id;
    var userId = req.user.userId;
    var tmpI = -1;
    for (let i = 0; i < TODOS.length; i++) {
        const TODO = TODOS[i];
        if (TODO.id == todoId && TODO.userId == userId) {
            tmpI = i;
            break;
        }
    }
    if (tmpI != -1) {
        for (let i = tmpI; i < TODOS.length - 1; i++) {
            TODOS[i] = TODOS[i + 1];
        }
        TODOS.pop();
    }
    res.send({ flag: true });
});

app.get("/api/todos/:id", function(req, res) {
    var todoId = req.params.id;
    res.type("json");
    res.send(getTodo(todoId));
});

app.post("/api/todos", function(req, res) {
    var todo = req.body;
    var tmpI = 0;
    for (let i = 0; i < TODOS.length; i++) {
        const TODO = TODOS[i];
        if (TODO.id == todo.id && TODO.userId == todo.userId) {
            TODOS[i] = todo;
            break;
        }
        tmpI = i;
    }
    if (tmpI == TODOS.length - 1) {
        todo.id = TODOS[TODOS.length - 1].id + 1;
        TODOS[TODOS.length] = todo;
    }

    res.send({ flag: true });
});

app.get("/api/users", function(req, res) {
    res.type("json");
    res.send(getUsers());
});

app.get("/api/tree/root",function(req,res){
    res.type("json");
    res.send(getRoots());
});

app.get("/api/tree/child/:id", function(req, res) {
    var nodeId = req.params.id;
    res.type("json");
    res.send(getNodes(nodeId));
});

app.listen(4000, function() {
    console.log("Angular JWT Todo API Server listening on port 4000!");
});
