import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  constructor(private http: HttpClient) { }

  getBuildings() {
    return this.http.get('http://localhost:8080/buildings'); // TODO MVR using fixed URL is bad
  }
}
