export class User {
    public id: number;
    public email: string;
    public phoneNumber: string;
    public fullName: string;
    public address: string;
    public avatar: string;
    public role: number;
    public createdAt: Date;
    public token?: string;
}