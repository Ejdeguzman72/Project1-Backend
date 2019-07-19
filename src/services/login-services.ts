import User from "../models/user";
import db from "../util/pg-connector";

/**
 * function for logging in users
 * @param username passes in for username
 * @param password passes in for password
 */
export async function loginUser(username: string, password: string): Promise<User> {

    // result for query that selects everything that pertains to the user that is being logged in
    const result = await db.query(`
    SELECT userid, username, password, firstname, lastname, email, role
    FROM user_tbl
    WHERE username = $1`,
    [username],
    );

    // console.log(username + " " + password)
    if (password === result.rows[0].password) {
        return new User(result.rows[0]);
    } else {
        return;
    }
}
