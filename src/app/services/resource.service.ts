import {Injectable} from '@angular/core';
import {Resources} from '../model/Resources';
import {ResourceDepot} from '../model/ResourceDepot';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ResourceService {
  resourceDepots = [];

  constructor() {

  }

}
