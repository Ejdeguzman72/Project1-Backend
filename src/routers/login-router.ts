import express, { Request, Response } from "express";
import User from "../models/user";
import * as loginServices from "../services/login-services";

// creates router
const loginRouter = express.Router();

// uses the post method in order to deal with request and response
// this will deal with the login process
loginRouter.post("", async (request: Request, response: Response) => {

    // creates a varaible based off the requested body
    const userLogin = request.body;

    // creates a loggedUser object taking the username and password from the
    // userLogin variable.
    const loggedUser: User = await loginServices.loginUser(userLogin.username, userLogin.password);

    // validates logged user with the current session id with the user id
    if (loggedUser) {
        // tslint:disable-next-line:no-unused-expression
        request.session.userId = loggedUser.userId;

        response.status(200).json(loggedUser);
    } else {
        response.status(400).json({
            message: "Credentials do not match",
        });
    }
});
export default loginRouter;
