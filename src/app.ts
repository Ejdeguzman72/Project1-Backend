import bodyParser from "body-parser";
import express from "express";
import session from "express-session";
import loginRouter from "./routers/login-router";
import reimbursementRouter from "./routers/reimbursement-router";
import userRouter from "./routers/user-router";
import { closePool } from "./util/pg-connector";

// creates appplication using the express module
const app = express();

// declares the port number
const port = process.env.port || 3000;

process.on("SIGINT", async () => {
    await closePool();
});

// registers middleware through the use of bodyParser
app.use(bodyParser.json());

// allows application to use session for a login
app.use(session({
    resave: false,
    saveUnitialized: true,
    secret: "my-secret",
}));

// registers userRouter
app.use("/user", userRouter);

// registers the reimbursementRouter
app.use("/reimbursements", reimbursementRouter);

// registers the loginRouter
app.use("/login", loginRouter);

// sets application to listen to port 3000
app.listen(port, () => {
    // tslint:disable-next-line: no-console
    console.log(`Application running on port ${port}.`);
});
