import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/_services/base.service';
import { ScoreboardPlayer } from 'src/app/_models/scoreboardPlayer';

@Component({
  selector: 'app-scoreboard-panel',
  templateUrl: './scoreboard-panel.component.html',
  styleUrls: ['./scoreboard-panel.component.css']
})
export class ScoreboardPanelComponent implements OnInit {

  toFetch?: { scoreboardData?: ScoreboardPlayer[], playersCount?: number  };

  constructor(private baseService: BaseService) { }

  ngOnInit() {
    setTimeout(() => {
      this.toFetch = this.baseService.scoreboardData;
    }, 1);
  }

  public pingWrapper(player: ScoreboardPlayer) {
    if (player.ping >= 200) {
      return 1;
    } else if (player.ping >= 150) {
      return 2;
    } else if (player.ping >= 100) {
      return 3;
    } else if (player.ping >= 50) {
      return 4;
    } else  {
      return 5;
    }
  }

}
