import {Resource} from './Resource';

export class ResourceDepot {
  type: any;
  amount: any;
  capacity: any;
  production: any;

  constructor(amount, capacity, production, type) {
    this.amount = Math.floor(amount);
    this.capacity = capacity;
    this.production = production; // per minute
    this.type = type;
  }
}
