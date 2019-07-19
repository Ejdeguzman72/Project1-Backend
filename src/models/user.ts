export default class User {
    public userId: number;
    public username: string;
    public password: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public role: string;
    constructor(obj) {
        if (!obj) {
            return;
        }
        this.userId = obj.userid;
        this.username = obj.username;
        this.password = obj.password;
        this.firstName = obj.firstname;
        this.lastName = obj.lastname;
        this.email = obj.email;
        this.role = obj.role;
    }
// tslint:disable-next-line: eofline
}