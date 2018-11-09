import { Component, OnInit, Input } from '@angular/core';
import { Monster } from 'shared/models/monster';
import { readElementValue } from '@angular/core/src/render3/util';

@Component({
  selector: 'monster-card',
  templateUrl: './monster-card.component.html',
  styleUrls: ['./monster-card.component.css']
})
export class MonsterCardComponent {
  @Input() monster: Monster;
  constructor() {}

  calculated_hit_points = function() {
    const maxFeat = false;
    const avghp = Math.floor(((this.monster.hit_dice_size / 2) + 0.5) * this.monster.hit_dice_qty);
    const maxhp = this.monster.hit_dice_size * this.monster.hit_dice_qty;
    const bonushp = this.modifier(this.monster.constitution) * this.monster.hit_dice_qty;
    let retVal = 0;
    if (!maxFeat) {
      retVal =  avghp + bonushp;
    } else {
      retVal = maxhp + bonushp;
    }
    return retVal;
  };

  modifier = function(stat: number) {
    const modifier = Math.floor((stat - 10) / 2);
    const retVal = modifier > 0 ? '+' + modifier : modifier;
    return retVal;
  };

  bonusHitPoints = function() {
    return this.modifier(this.monster.constitution) * this.monster.hit_dice_qty;
  };
}


