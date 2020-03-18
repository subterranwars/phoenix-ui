export class Message {
  constructor(public id: bigint, public topic: string, public message: string, public received: Date, public from: string, public read: boolean) {
  }
}
