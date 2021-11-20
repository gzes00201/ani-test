import { Component, Input, OnInit } from '@angular/core';
import { BBQSPeople } from '../bbqs-animation-scene/bbqs-people';

@Component({
  selector: 'app-bbqs-rank-map',
  templateUrl: './bbqs-rank-map.component.html',
  styleUrls: ['./bbqs-rank-map.component.sass']
})
export class BbqsRankMapComponent implements OnInit {
  @Input() currentPeopleRank: BBQSPeople[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
