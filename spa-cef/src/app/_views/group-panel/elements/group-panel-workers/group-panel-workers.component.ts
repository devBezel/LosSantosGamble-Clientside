import { Component, OnInit, Input } from '@angular/core';
import { GroupWorker } from 'src/app/_models/groupWorker';

@Component({
  selector: 'app-group-panel-workers',
  templateUrl: './group-panel-workers.component.html',
  styleUrls: ['./group-panel-workers.component.css']
})
export class GroupPanelWorkersComponent implements OnInit {

  @Input() workers: GroupWorker[];

  constructor() { }

  ngOnInit() {
  }

}
