export class Token {
  token: string;
  expireTime: number;

  constructor(token: string, expireTime: number) {
    this.token = token;
    this.expireTime = expireTime;
  }
}
