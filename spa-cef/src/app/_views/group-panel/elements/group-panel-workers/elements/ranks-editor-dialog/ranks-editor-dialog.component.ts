import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { GroupWorker } from 'src/app/_models/groupWorker';
import { GroupRank } from 'src/app/_models/groupRank';
import { GroupRightsService } from 'src/app/_services/group-rights.service';
import { AltvService } from 'src/app/_services/altv.service';
import { NotifyService } from 'src/app/_services/notify.service';
import { Group } from 'src/app/_models/group';

@Component({
  selector: 'app-ranks-editor-dialog',
  templateUrl: './ranks-editor-dialog.component.html',
  styleUrls: ['./ranks-editor-dialog.component.css']
})
export class RanksEditorDialogComponent {

  rankToChange: number;

  constructor(@Inject(MAT_DIALOG_DATA) public groupData: { worker: GroupWorker, ranks: GroupRank[], slot: number,
              senderWorker: GroupWorker, group: Group },
              private altvService: AltvService, private notifyService: NotifyService, private groupRights: GroupRightsService) { }


  get currentRankName() {
    return this.groupData.ranks.find(x => x.id === this.groupData.worker.groupRankId);
  }

  public changeRank() {
    if (this.rankToChange === undefined) {
      return;
    }

    const rank = this.groupData.ranks.find(x => x.id === this.rankToChange);
    const senderRank = this.groupData.ranks.find(x => x.id === this.groupData.senderWorker.groupRankId);

    if (senderRank < rank || !this.groupRights.isOwner(this.groupData.group, this.groupData.senderWorker)) {
      this.notifyService.error('Wystąpił bląd!', 'Masz za niską rangę, aby awansować tego pracownika');
      return;
    }

    this.groupData.worker.groupRank = rank;
    this.groupData.worker.groupRankId = this.rankToChange;

    this.altvService.emit('group:changeWorkerRank', this.groupData.worker.characterId, this.rankToChange, this.groupData.slot);
  }

}
