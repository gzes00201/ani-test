import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { timer } from 'rxjs';
import { BBQSPeople, BBQSPeopleState } from '../bbqs-animation-scene/bbqs-people';

@Component({
  selector: 'app-bbqs-current-rank',
  templateUrl: './bbqs-current-rank.component.html',
  styleUrls: ['./bbqs-current-rank.component.sass']
})
export class BbqsCurrentRankComponent implements OnInit {
  @Input() currentPeopleRank: BBQSPeople[] = [];
  @Input() runTimeMs: number = 0;

  BBQSPeopleState = BBQSPeopleState
  displayRank: BBQSPeople[] = [];
  constructor() { }
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['currentPeopleRank']){
      timer(this.runTimeMs === 0 ? 0 : 1000).subscribe(()=>{
        this.displayRank = this.currentPeopleRank.map(item=> item);
      })
    }
  }

}
