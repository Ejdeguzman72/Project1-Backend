import User from "../models/user";
import db from "../util/pg-connector";

// creates a function to create a user witin the database
export function createUser(user: User):
Promise<User[]> {
    if (!user.username) {
        // tslint:disable-next-line:no-console
        console.warn("username requires name");
    }
    // query for inserting a new user into the ers database
    return db.query(`
    INSERT INTO user_tbl (userId, username, password, firstName, lastName, email, role)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING userId, username, password, firstName, lastName, email, role`,
    [user.userId, user.username, user.password, user.firstName, user.lastName, user.email, user.role])
    .then((data) => {
        return data.rows;
    }) .catch((err) => {
        return [];
    });
}

// function that will get all users by their ID number that are within the datbase.
export async function getUserById(id: number): Promise<User> {

    // selects user by their id listed in the database from the query
    const result = await db.query(`
    SELECT userid, username, password, firstname, lastname, email, role
    FROM public.user_tbl
    WHERE userId = $1`, [id]);
    // tslint:disable-next-line:no-console
    // console.log(result.rows[0]);
    return new User(result.rows[0]);
}
// function that will get all users that are listed in the database
export async function getAllUsers(): Promise<User[]> {
    const result = await db.query(`
    SELECT *
    FROM user_tbl`);

    return result.rows;
}
// method that updates information in the database for user_tbl
export async function patchUser(patch: User) {
    if (!patch.userId) {

        // tslint:disable-next-line:no-console
        console.warn("Requires an ID nnumber");
    }

    const currentState = await getUserById(patch.userId);
    const newState = {
        ...currentState, ...patch,
    };

    // query that updates the information in user_tbl and sets it to the parameters that were sent
    const result = await db.query(`
    UPDATE user_tbl
    SET username = $1, password = $2, firstname = $3, lastname = $4, email = $5, role = $6
    WHERE userid = $7
    RETURNING userid, username, password, firstname, lastname, email, role;`,
    [newState.username, newState.password, newState.firstName,
    newState.lastName, newState.email, newState.role, newState.userId]);

    if (result.rowCount === 0) {
        // tslint:disable-next-line: no-console
        console.warn("Error");
    } else {
        return result.rows[0];
    }
}
