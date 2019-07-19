import User from "../models/user";
import * as userService from "../services/user-service";

export async function checkPermissions(role: string, currentId: number, userId: number = 0) {
    const result = await userService.getUserById(currentId);
    if (userId === currentId) {

        // tslint:disable-next-line:no-console
        console.log("user confirmed");
        return true;
    } else if (result.role === role) {

        // tslint:disable-next-line:no-console
        console.log("You have permissions!");
        return true;
    } else {

        // tslint:disable-next-line:no-console
        console.log("This is the wrong user");
        return false;
    }
}
