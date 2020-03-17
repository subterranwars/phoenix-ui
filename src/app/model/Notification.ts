export class Notification {
  constructor(public id: number, public label: string, public content: string, public read: boolean, public completionDate: Date) {}
}