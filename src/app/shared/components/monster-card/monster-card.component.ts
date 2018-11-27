import { Component, OnInit, Input } from '@angular/core';
import { Monster } from 'shared/models/monster';
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';
import { CardService } from 'shared/services/card.service';
import { UtilityService } from 'shared/services/utility.service';
import { utils } from 'protractor';


@Component({
  selector: 'monster-card',
  templateUrl: './monster-card.component.html',
  styleUrls: ['./monster-card.component.css']
})
export class MonsterCardComponent implements OnInit {
  @Input() monster: Monster;
  @Input() edit: boolean;
  appUser: AppUser;
  monsterKeys = Object.keys;


  constructor(
    private auth: AuthService,
    private card: CardService,
    private utilityService: UtilityService
    ) {}

    async ngOnInit() {
      this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    }

    toTitleCase = function(text) {
      return this.utilityService.toTitleCase(text);
    };

  calculated_hit_points = function() {
    return this.card.calculated_hit_points(this.monster);
  };

  calculated_attack = function(stat: number) {
    return this.card.calculated_attack(stat, this.monster);
  };

  modifier = function(stat: number) {
    return this.card.modifier(stat);
  };

  invalidModifier = function(stat: number) {
    return this.card.invalidModifier(stat);
  };

  bonusHitPoints = function() {
    return this.card.bonusHitPoints(this.monster);
  };

}


