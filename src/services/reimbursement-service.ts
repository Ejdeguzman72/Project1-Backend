import Reimbursement from "../models/reimbursement";
import db from "../util/pg-connector";

// creates a function that creates a reimbursement within the database
export function createReimbursment(reimbursement: Reimbursement):
Promise<Reimbursement[]> {
    if (!reimbursement.amount) {
        // tslint:disable-next-line:no-console
        console.warn("reimbursement requires an amount");
    }

    // query in order to make a new reimbursement
    return db.query(`
    INSERT INTO reimbursement_tbl (reimbursementid, author, amount,
    dateSubmitted, dateResolved, description, resolver, status, type)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING reimbursementid, author, amount,
    datesubmitted, dateresolved, description, resolver, status, type`,
    [reimbursement.reimbursementId, reimbursement.author, reimbursement.amount,
    reimbursement.dateSubmitted, reimbursement.dateResolved, reimbursement.description,
    reimbursement.resolver, reimbursement.status, reimbursement.type])
    .then((data) => {
        return data.rows;
    }) .catch((err) => {
        return [];
    });
}
// function that retrieves a reimbursement by the type
export async function getReimbursementByUserId(type: number): Promise<Reimbursement[]> {

    // query that will select reimbursement by the type and returns it
    const result = await db.query(`
    SELECT reimbursementId, author, amount, datesubmitted, dateresolved, description, resolver, status, type
    FROM reimbursement_tbl
    WHERE author = $1
    ORDER BY datesubmitted`, [type]);

    // tslint:disable-next-line:no-console
    console.log(result.rows[0]);

    return (result.rows);
}

// function that retrieves a reimbursement by the statusId
export async function getReimbursementByStatus(status: number): Promise<Reimbursement> {

    // query that selects the reimbursement by statusId and returns it
    const result = await db.query(`
    SELECT reimbursementid, author, amount, dateSubmitted, dateResolved, description, resolver, status, type
    FROM reimbursement_tbl
    WHERE status = $1`, [status]);

    // tslint:disable-next-line:no-console
    console.log(result.rows[0]);

    return new Reimbursement(result.rows[0]);
}

// function that retrieves reimbursement by reimbursementid
export async function getReimbursementByReimbursementId(rid: number): Promise<Reimbursement> {

    // creates the result variable which will be equal to the result from the executed query
    const result = await db.query(`
    SELECT reimbursementid, author, amount, dateSubmitted, dateResolved, description, resolver, status, type
    FROM reimbursement_tbl
    WHERE reimbursementid = $1`, [rid]);

    // tslint:disable-next-line:no-console
    console.log(result.rows[0]);

    return new Reimbursement(result.rows[0]);
}
// fucntion to patch reimbursement
export async function patchReimbursement(patch: Reimbursement) {
    if (!patch.reimbursementId) {

        // tslint:disable-next-line:no-console
        console.warn("requires an ID number");
    }
    // gets the current reimbursement
    const currentState = await getReimbursementByReimbursementId(patch.reimbursementId);

    // updates the reimbursement
    const newState = {
        ...currentState, ...patch,
    };

    // query that updates the reimbursement
    const result = await db.query(`
    UPDATE reimbursement_tbl
    SET author = $1, amount = $2, datesubmitted = $3, dateresolved = $4,
    description = $5, resolver = $6, status = $7, type = $8
    WHERE reimbursementId = $9;
    RETURNING author, amount, datesubmitted, dateresolved, description, resolver, status, type;`,
    [newState.author, newState.amount, newState.dateSubmitted, newState.dateResolved,
    newState.description, newState.resolver, newState.status, newState.type, newState.reimbursementId]);

    if (result.rowCount === 0) {
        // tslint:disable-next-line:no-console
        console.warn("warning!");
    } else {
        return result.rows[0];
    }
}
