export class User {
    public id: number;
    public email: string;
    public phone_number: string;
    public full_name: string;
    public address: string;
    public avatar: string;
    public story: string;
    public birthday: Date;
    public role: number;
    public createdAt: Date;
    public token?: string;
}