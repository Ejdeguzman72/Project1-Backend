export default class Reimbursement {
    public reimbursementId: number;
    public author: number;
    public amount: number;
    public dateSubmitted: Date;
    public dateResolved: Date;
    public description: string;
    public resolver: number;
    public status: number;
    public type: number;
    constructor(obj) {
        if (!obj) {
            return;
        }
        this.reimbursementId = obj.reimbursementid;
        this.author = obj.author;
        this.amount = obj.amount;
        this.dateSubmitted = obj.dateSubmitted;
        this.dateResolved = obj.dateResolved;
        this.description = obj.description;
        this.resolver = obj.resolver;
        this.status = obj.status;
        this.type = obj.type;
    }
}
