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
    { id: 4, userId: 3, name: "Finish Angular JWT Todo App", completed: false },
    { id: 5, userId: 1, name: "Get Milk", completed: false },
    { id: 6, userId: 1, name: "Fetch Kids", completed: true },
    { id: 7, userId: 1, name: "Get Milk", completed: false },
    { id: 8, userId: 1, name: "Fetch Kids", completed: true },
    { id: 9, userId: 1, name: "Get Milk", completed: false },
    { id: 10, userId: 1, name: "Fetch Kids", completed: true }
];

var USERS = [{ id: 1, username: "jemma" }, { id: 2, username: "paul" }, { id: 3, username: "sebastian" }];

var TREE_MAP = {
    "1": [
        { id: "3", name: "Apple", hasChild: true },
        { id: "4", name: "Orange", hasChild: false },
        { id: "5", name: "Banana", hasChild: false }
    ],
    "2": [{ id: "6", name: "Tomato", hasChild: true }, { id: "7", name: "Potato", hasChild: false }],
    "3": [{ id: "8", name: "Fuji", hasChild: false }, { id: "9", name: "Macintosh", hasChild: false }],
    "6": [
        { id: "10", name: "Yellow", hasChild: false },
        { id: "11", name: "White", hasChild: false },
        { id: "12", name: "Black", hasChild: false }
    ]
};
var ROOT_NODE = [
    { item: { id: "1", name: "Fruits", hasChild: true }, level: 0 },
    { item: { id: "3", name: "Apple", hasChild: true }, level: 1 },
    { item: { id: "8", name: "Fuji", hasChild: false }, level: 2 },
    { item: { id: "9", name: "Macintosh", hasChild: false }, level: 2 },
    { item: { id: "4", name: "Orange", hasChild: false }, level: 1 },
    { item: { id: "5", name: "Banana", hasChild: false }, level: 1 },
    { item: { id: "2", name: "Vegetables", hasChild: true }, level: 0 },
    { item: { id: "6", name: "Tomato", hasChild: true }, level: 1 },
    { item: { id: "10", name: "Yellow", hasChild: false }, level: 2 },
    { item: { id: "11", name: "White", hasChild: false }, level: 2 },
    { item: { id: "12", name: "Black", hasChild: false }, level: 2 },
    { item: { id: "7", name: "Potato", hasChild: true }, level: 1 },
    { item: { id: "13", name: "Yellow", hasChild: false }, level: 2 },
    { item: { id: "14", name: "White", hasChild: false }, level: 2 },
    { item: { id: "15", name: "Black", hasChild: false }, level: 2 },
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

function getRoots() {
    return ROOT_NODE;
}

function getNodes(nodeId) {
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
    var query = req.query;

    var size = query.pageSize;
    var num = query.pageNum;

    var start = (num - 1) * size;
    var end = num * size;
    var arr = [];
    var userTodos = getTodos(req.user.userId);

    for (let i = start; (i < end) & (i < userTodos.length); i++) {
        arr[i - start] = userTodos[i];
    }
    var page = { list: arr, totalCount: userTodos.length, pageNum: num, pageSize: size };
    res.type("json");
    res.send({ code: "SUC000000", msg: "查询Todo列表成功", result: page });
});

// pageNum pageSize
// list totalCount pageNum pageSize

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

app.get("/api/tree/root", function(req, res) {
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
