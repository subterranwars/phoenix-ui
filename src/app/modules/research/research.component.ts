import { Component, OnInit } from '@angular/core';
import {Player} from '../../model/Player';
import {PlayerService} from '../../services/player.service';
import {ResearchService} from '../../services/research.service';
import {ResearchLevel} from '../../model/ResearchLevel';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.scss']
})
export class ResearchComponent implements OnInit {

  researchInfos$;
  player: Player;

  constructor(private researchService: ResearchService, private playerService: PlayerService) { }

  ngOnInit(): void {
    this.researchInfos$ = this.researchService.listResearchs();
    this.playerService.getPlayer().subscribe((player: Player) => {
      this.player = player;
    });
  }

  research(researchLevel: ResearchLevel) {
    this.researchService.research(this.player, researchLevel.research.id);
  }

}
