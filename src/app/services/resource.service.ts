import {Injectable} from '@angular/core';
import {Resources} from '../model/Resources';
import {ResourceDepot} from '../model/ResourceDepot';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ResourceService {
  resourceDepots = [];

  constructor() {

  }

  findNewResourceDepot(config) {
    const minAmount = 1000;
    const maxAmount = 20000;
    const amount = (Math.random() * (minAmount + maxAmount)) - minAmount;
    const floorAmount = Math.floor(amount);
    this.resourceDepots.push(new ResourceDepot(floorAmount, Resources.Iron));
    console.log(this.resourceDepots);
  }
}
