import express, {Request, Response} from "express";
import Reimbursement from "../models/reimbursement";
import * as persmissionServices from "../services/persmissions-services";
import * as reimbursementService from "../services/reimbursement-service";

// creates a router connection
// this router will be used in conjunction with router-servicse in order to carry out
// tasks specific related to reimbursements
const reimbursementRouter = express.Router();

// uses post method - writing to something
reimbursementRouter.post("", (request: Request, response: Response) => {

    // will create a reimbursement as an object
    const reimbursement = new Reimbursement(request.body);

    // tslint:disable-next-line: no-console
    console.log(reimbursement);

    // router calls the function defined in reimbursement-services in order to create a new reimburement
    reimbursementService.createReimbursment(reimbursement)

    .then((rows) => {
        if (rows.length > 0) {
            response.status(201).json(rows[0]);
        } else {
            response.sendStatus(400);
        }
    });
});
// uses the get method in order to retrieve the reimbursement according to type
reimbursementRouter.get("/author/userId/:tid", async (request: Request, response: Response) => {

    // takes the parameter used in postman to use as the id in executing the query
    // tslint:disable-next-line: radix
    const tid = parseInt(request.params.tid);

    const permission = await persmissionServices.checkPermissions("Finance_manager", request.session.userId, tid);
    if (!permission) {
        response.sendStatus(401);
        return;
    }
    // creates a reimbursement object
    const reimbursement: Reimbursement[] = await reimbursementService.getReimbursementByUserId(tid);

    if (reimbursement) {
        response.status(200).json(reimbursement);
    } else {
        response.sendStatus(404);
    }
});

// uses the get method in order to retrieve the reimbursement according to statusId
reimbursementRouter.get("/status/:sid", async (request: Request, response: Response) => {

    const permission = await persmissionServices.checkPermissions("Finance_manager", request.session.userId);
    if (!permission) {
        response.sendStatus(401);
        return;
    }
    // takes the parameter and assigns it to id
    // tslint:disable-next-line: radix
    const sid = parseInt(request.params.sid);

    // creates a reimbursement object
    const reimbursement: Reimbursement = await reimbursementService.getReimbursementByStatus(sid);

    if (reimbursement.status) {
        response.status(200).json(reimbursement);
    } else {
        response.sendStatus(404);
    }
});

// reimbursementRouter uses the get method in dealing with request and reponse
reimbursementRouter.get("/:rid", async (request: Request, response: Response) => {

    // creates a variable rid as the parameter that is passed
    // tslint:disable-next-line:radix
    const rid = parseInt(request.params.rid);

    // creates a reimbursement object
    const reimburement: Reimbursement = await reimbursementService.getReimbursementByReimbursementId(rid);

    if (reimburement.reimbursementId) {
        response.status(300).json(reimburement);
    } else {
        response.sendStatus(404);
    }
});

// uses patch method in dealing with requests and reposnse
reimbursementRouter.patch("", async (request: Request, response: Response) => {

    const permission = await persmissionServices.checkPermissions("Finance_manager", request.session.userId);
    if (!permission) {
        response.sendStatus(401);
        return;
    }
    // creates a reimbursement object as a patch variable
    const patch: Reimbursement = request.body;

    // creates variale for the updated reimbursement
    // reimbursement query is set as an async function
    const patchReimbursement: Reimbursement = await reimbursementService.patchReimbursement(patch);

    if (patchReimbursement.reimbursementId) {
        response.json(patchReimbursement);
    } else {
        response.sendStatus(200);
    }
});

// uses the delete method to delete a reimbursement according to the Id.
reimbursementRouter.delete("/:reimbursementId", (request: Request, response: Response) => {
    response.sendStatus(200);
});

export default reimbursementRouter;
