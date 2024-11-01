require("dotenv").config();
const jsonServer = require("json-server");
const morgan = require("morgan");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const PORT = process.env.PORT;

server.use(middlewares);
server.use(morgan("dev"));
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
// added block
});
server.use(
    jsonServer.rewriter({
        "/api/*": "/$1",
    })
);
server.use(router);

server.listen(PORT, () => {
    console.log(`JSON Server is running at port ${PORT}`);
});

// added block
module.exports = server;