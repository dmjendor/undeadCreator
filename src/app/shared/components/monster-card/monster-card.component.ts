import { Component, OnInit, Input } from '@angular/core';
import { Monster } from 'shared/models/monster';

@Component({
  selector: 'monster-card',
  templateUrl: './monster-card.component.html',
  styleUrls: ['./monster-card.component.css']
})
export class MonsterCardComponent {
  @Input() monster: Monster;
  constructor() {}

  modifier = function(stat) {
    const modifier = Math.floor((stat - 10) / 2);
    const retVal = modifier > 0 ? '+' + modifier : modifier;
    return retVal;
  };
}


