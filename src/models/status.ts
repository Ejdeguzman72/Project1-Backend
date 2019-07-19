export default class Status {
    public statusId: number;
    public status: number;
    constructor(obj) {
        if (!obj) {
            return;
        }
        this.statusId = obj.statusId;
        this.status = obj.status;
    }
// tslint:disable-next-line: eofline
}