import { Component, Input, OnInit } from '@angular/core';
import { BBQSPeople, BBQSPeopleState } from '../bbqs-animation-scene/bbqs-people';

@Component({
  selector: 'app-bbqs-current-rank',
  templateUrl: './bbqs-current-rank.component.html',
  styleUrls: ['./bbqs-current-rank.component.sass']
})
export class BbqsCurrentRankComponent implements OnInit {
  @Input() currentPeopleRank: BBQSPeople[] = [];
  BBQSPeopleState = BBQSPeopleState
  constructor() { }

  ngOnInit(): void {
  }

}
