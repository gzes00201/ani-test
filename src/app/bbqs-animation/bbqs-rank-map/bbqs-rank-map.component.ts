import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { BBQSPeople, BBQSPeopleState } from '../bbqs-animation-scene/bbqs-people';
interface RankIns {
  no: number;
  ins?: BBQSPeople;
}
@Component({
  selector: 'app-bbqs-rank-map',
  templateUrl: './bbqs-rank-map.component.html',
  styleUrls: ['./bbqs-rank-map.component.sass']
})
export class BbqsRankMapComponent implements OnInit {
  @Input() currentPeopleRank: BBQSPeople[] = [];
  @Input() runTimeMs: number = 0;
  dieRankNo: number[] = []
  BBQSPeopleState = BBQSPeopleState;
  rank: RankIns[]  = [
    { no: 1},
    { no: 2},
    { no: 3 },
    { no: 4 },
    { no: 5 },
    { no: 6 },
    { no: 7 },
    { no: 8 },
  ]
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(changes['currentPeopleRank'].currentValue){
      this.dieRankNo = [];
      this.currentPeopleRank.forEach(people=>{
        const current = this.rank.find(item=> item.no === people.no)
        if(current){
          current.ins = people;
          if(people.status === BBQSPeopleState.DIE){
            this.dieRankNo.push(people.no);
          }
        }
      });
    }
  }

  ngOnInit(): void {
  }

}
