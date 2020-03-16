import { Component, OnInit } from '@angular/core';
import {ResourceService} from '../../services/resource.service';
import {PlayerService} from '../../services/player.service';
import {Player} from '../../model/Player';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn} from '@angular/forms';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  resourceSites;
  usedCount: number;
  totalCount: number;
  unusedCount: number;
  errors: any[];

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
      resource: ['']
    });
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.errors = [];
    this.playerService.getPlayer().subscribe((player: Player) => {
      this.player = player;
      this.totalCount = player.getTotalDroneCount();
      this.resourceSites = player.getResourceSites();
      this.resourceSites.forEach(site => {
        this.errors[site.id] = {
          droneCount : false
        };
      });
      if (this.resourceSites.length !== 0) {
        this.usedCount = player.getResourceSites().map(site => site.droneCount)
          .reduce((a, b) => {
            return a + b;
          });
      } else {
        this.usedCount = 0;
      }
      this.unusedCount = this.totalCount - this.usedCount;
    });
  }

  changeResource(e) {
    console.log(this.resourceSitesForm.value);
    this.resourceSitesForm.get('resource').setValue(e.target.value, {
      onlySelf: true
    });
  }

  onSubmit() {
    this.resourceService.search(this.resourceSitesForm.value.resource);
  }

  updateDroneCount(id: number, event) {
    const droneCount: number = event.target.value;
    const tmpUnusedCount = this.unusedCount;
    const newUnusedCount = tmpUnusedCount + this.player.getResourceSite(id).droneCount - droneCount;
    if (newUnusedCount < 0) {
      this.errors[id].droneCount = true;
    } else {
      this.errors[id].droneCount = false;
      this.resourceService.updateDroneCount(id, droneCount)
        .subscribe(res => {
          this.refresh();
        });
    }
  }

  deleteSite(id: number) {
    this.resourceService.delete(id).subscribe(res => {
      this.refresh();
    });
  }
}
