export class Progress {
  constructor(public indeterminate: boolean, public value: number, public milliseconds: number) {
  }

  get seconds() {
    return this.milliseconds / 1000;
  }
}
