export class Notification {
  constructor(public id: bigint, public label: string, public content: string, public read: boolean, public completionDate: Date) {}
}