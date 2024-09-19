const express = require("express");
const userRouter = require("./Routes/users");
const app = express();

app.use(express.json());

app.use("/users", userRouter);


app.listen(5000);