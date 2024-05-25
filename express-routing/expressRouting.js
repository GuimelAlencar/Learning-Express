const express = require("express");
const app = express();
const port = 3000;

const route1 = require('./routes/route1.js')
const route2 = require('./routes/route2.js')

// 1 - Basic Route methods
// 1.1 - GET, POST, PUT, PATCH and DELETE
app.get("/basicFunctions", (req, res) => {
  res.send("GET request received!");
});
app.post("/basicFunctions", (req, res) => {
  res.send("POST request received!");
});
app.put("/basicFunctions", (req, res) => {
  res.send("PUT request received!");
});
app.patch("/basicFunctions", (req, res) => {
  res.send("PATCH request received!");
});
app.delete("/basicFunctions", (req, res) => {
  res.send("DELETE request received!");
});
// 1.2 - Rout Method all() : Receive all methods
app.all("/allFunction", (req, res, next) => {
  res.send("Request received!");
  next();
});

// 2 - Basic route paths
// 2.1 - Basic path example
app.get("/pathExample", (req, res) => {
  res.send("GET request received!");
});

// 2.2 - string patterns

//This route path will match acd and abcd.
app.get("/ab?cd", (req, res) => {
  res.send("ab?cd");
});
//This route path will match abcd, abbcd, abbbcd, and so on.
app.get("/ab+cd", (req, res) => {
  res.send("ab+cd");
});
//This route path will match abcd, abxcd, abRANDOMcd, ab123cd, and so on.
app.get("/ab*cd", (req, res) => {
  res.send("ab*cd");
});
//This route path will match /abe and /abcde.
app.get("/ab(cd)?e", (req, res) => {
  res.send("ab(cd)?e");
});

// 2.3 - Regular expressions

//This route path will match anything with an “a” in it.
app.get(/a/, (req, res) => {
  res.send("/a/");
});
//This route path will match butterfly and dragonfly, but not butterflyman, dragonflyman, and so on.
app.get(/.*fly$/, (req, res) => {
  res.send("/.*fly$/");
});

// 3 - Route parameters
//To define routes with route parameters, simply specify the route parameters in the path of the route as shown below.
app.get("/users/:userId/books/:bookId", (req, res) => {
  res.send(req.params);
});

// 4 - Route Handlers
// 4.1 - More than one callback function can handle a route.
app.get(
  "/routeHandlers/1",
  (req, res, next) => {
    console.log("the response will be sent by the next callback function ...");
    next();
  },
  (req, res) => {
    res.send("GET request received!");
  }
);

// 4.2 - An array of callback functions can handle a route.
const functionA = function (req, res, next) {
  console.log("Function A executed");
  next();
};
const functionB = function (req, res, next) {
  console.log("Function B executed");
  next();
};
const functionC = function (req, res) {
  res.send("GET request received!");
};

app.get("/routeHandlers/2", [functionA, functionB, functionC]);

// 4.3 - Independent functions and arrays can handle a route together.
app.get("/routeHandlers/3", [functionA, functionB], (req, res) => {
  res.send("GET request received");
});

// 5 - Chainable route Handlers for a route path
app
  .route("/book")
  .get((req, res) => {
    res.send("Get a random book");
  })
  .post((req, res) => {
    res.send("Add a book");
  })
  .put((req, res) => {
    res.send("Update the book");
  });

// 6 - Modular, mountable route handler
app.use('/route1', route1);
app.use('/route2', route2);

// Listen function
app.listen(port, () => {
  console.log(
    "A instância da aplicação express está ativa na porta 3000, para acessa-la, use http://localhost:3000"
  );
});
