import express, {Request, Response} from "express";
import User from "../models/user";
import * as persmissionServices from "../services/persmissions-services";
import * as userService from "../services/user-service";

// creates the userRouter
const userRouter = express.Router();

// uses post method in dealing with requests and sending out responses
userRouter.post("", (request: Request, response: Response) => {

    // creates a user object constructed from the User class
    const user = new User(request.body);
    userService.createUser(user)
    .then((rows) => {
        if (rows.length > 0) {
            response.status(201).json(rows[0]);
        } else {
            response.sendStatus(400);
        }
    });
});

userRouter.get("/:userId", async (request: Request, response: Response) => {
    // tslint:disable-next-line:radix
    const id = parseInt(request.params.userId);

    const permission = await persmissionServices.checkPermissions("Finance_manager", request.session.userId, id);
    if (!permission) {
        response.sendStatus(401);
        return;
    }

    const user: User = await userService.getUserById(id);
    // tslint:disable-next-line: no-console
    console.log(user);
    if (user) {
        response.status(200).json(user);
    } else {
        response.sendStatus(404);
    }
});

// router uses patch method in order to receive requests and send out responses
userRouter.patch("", async (request: Request, response: Response) => {
    const permission = await persmissionServices.checkPermissions("Admin", request.session.userId);
    if (!permission) {
        response.sendStatus(401);
        return;
    }
    // path object created from User class from the params created from the body via postman
    const patch: User = request.body;

    // creates a patchUser from the patchUser function
    const patchUser: User = await userService.patchUser(patch);

    if (patchUser.userId) {
        response.json(patchUser);
    } else {
        response.sendStatus(200);
    }
});

userRouter.get("", async (request: Request, response: Response) => {
    const permission = await persmissionServices.checkPermissions("Finance_manager", request.session.userId);
    if (!permission) {
        response.sendStatus(401);
        return;
    }
    const user: User[] = await userService.getAllUsers();

    if (user) {
        response.json(user);
    } else {
        response.sendStatus(200);
    }
});

// router uses the delete method in dealing with receiving requests and sending out responses
userRouter.delete("/:userId", (request: Request, response: Response) => {
    response.sendStatus(200);
});

export default userRouter;
