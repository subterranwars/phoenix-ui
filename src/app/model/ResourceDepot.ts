import {Resource} from './Resource';

export class ResourceDepot {
  type: Resource;
  amount;

  constructor(amount, type: Resource) {
    this.type = type;
    this.amount = amount;
  }
}
