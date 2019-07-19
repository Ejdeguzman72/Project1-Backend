import { Pool } from "pg";  // import Pool module from pg package

// creates database connection
const db = new Pool({
    database: "postgres",
    host: process.env.ERS_URL || "localhost",
    password: process.env.ERS_PASSWORD || "Louisville19!",
    port: 5432,
    user: process.env.ERS_USER || "postgres",
// tslint:disable-next-line:eofline
});
// function will close the database connection once it is called
export function closePool() {
    db.end();
// tslint:disable-next-line: eofline
}
export default db;
