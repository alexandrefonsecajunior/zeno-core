export class User {
  constructor(
    public id: string,
    public username?: string,
    public firstName?: string,
    public lastName?: string,
    public dateOfBirth?: Date,
    public email?: string,
    public password?: string,
  ) {}
} 