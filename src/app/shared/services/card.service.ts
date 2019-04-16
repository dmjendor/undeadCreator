import { Injectable, OnInit } from '@angular/core';
import { AppUser } from 'shared/models/app-user';

import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class CardService implements OnInit {
  appUser: AppUser;

  constructor(private auth: AuthService) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  public calculated_hit_points = function(creature) {
    const diceSize = parseInt(creature.hit_dice_size, 10) > 0 ? parseInt(creature.hit_dice_size, 10) : 8;
    const avghp = Math.floor(((diceSize / 2) + 0.5) * creature.hit_dice_qty);
    const maxhp = diceSize * creature.hit_dice_qty;
    const bonushp = this.bonusHitPoints(creature);
    let retVal = 0;
    if (this.appUser && this.appUser.summoner) {
      retVal = maxhp + bonushp;
    } else {
      retVal =  avghp + bonushp;
    }
    return retVal;
  };

  public calculated_attack = function(stat, creature) {
    const retVal = parseInt(this.modifier(stat), 10) + parseInt(creature.proficiency, 10);
    return retVal >= 0 ? '+' + retVal : retVal;
  };

  public modifier = function(stat: number) {
    const modifier = Math.floor((stat - 10) / 2);
    const retVal = modifier >= 0 ? '+' + modifier : modifier;
    return retVal;
  };

  public invalidModifier = function(stat: number) {
    const invalid = stat <= 0;
    return stat <= 0;
  };

  public bonusHitPoints = function(creature) {
    let mod = 0;
    if (this.appUser && this.appUser.necromancer) {
      mod = this.appUser.level;
    }
    return (this.modifier(creature.constitution) * creature.hit_dice_qty) + mod;
  };
}
