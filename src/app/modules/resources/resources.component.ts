import { Component, OnInit } from '@angular/core';
import {ResourceService} from '../../services/resource.service';
import {PlayerService} from '../../services/player.service';
import {Player} from '../../model/Player';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  resourceSites;
  player: Player;

  resources: any = [
    { id: 1, name: 'iron', label: 'Eisen'},
    { id: 2, name: 'stone', label: 'Stein'},
    // { id: 3, name: 'food', label: 'Food'},
    { id: 4, name: 'oil', label: 'Öl'},
    ];

  resourceSitesForm: FormGroup;

  constructor(private resourceService: ResourceService, private playerService: PlayerService, public fb: FormBuilder) {
    this.resourceSitesForm = this.fb.group({
      resource: [''],
      duration: [1]
    });
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.resourceService.listResources().subscribe(resourceSites => {
      this.resourceSites = resourceSites;
      console.log(this.resourceSites);
    });
    this.playerService.getPlayer().subscribe((player: Player) => {
      this.player = player;
    });
  }

  changeResource(e) {
    console.log(this.resourceSitesForm.value);
    this.resourceSitesForm.get('resource').setValue(e.target.value, {
      onlySelf: true
    });
  }

  onSubmit() {
    this.resourceService.search(this.resourceSitesForm.value.resource, this.resourceSitesForm.value.duration);
  }

  updateDroneCount(id: number, event) {
    const droneCount: number = event.target.value;
    this.resourceService.updateDroneCount(id, droneCount)
      .subscribe(res => {
        this.refresh();
      });
  }

  deleteSite(id: number) {
    this.resourceService.delete(id).subscribe(res => {
      this.refresh();
    });
  }
}
