import { Component, OnInit, Input } from '@angular/core';
import { Monster } from 'shared/models/monster';
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';
import { CardService } from 'shared/services/card.service';
import { UtilityService } from 'shared/services/utility.service';
import { utils } from 'protractor';
import { Weapon } from 'shared/models/weapon';
import { WeaponService } from 'shared/services/weapons.service';
import { take } from 'rxjs/operators';


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
  primaryAttack: Weapon;
  offHandAttack: Weapon;


  constructor(
    private auth: AuthService,
    private card: CardService,
    private weaponService: WeaponService,
    private utilityService: UtilityService
    ) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.weaponService.get(this.monster.actions.primary).valueChanges().pipe(take(1)).subscribe(p => this.primaryAttack = p as Weapon);
    this.weaponService.get(this.monster.actions.secondary).valueChanges().pipe(take(1)).subscribe(p => this.offHandAttack = p as Weapon);
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

  checkSpecials = function() {
    const elements = Object.values(this.monster.elemental);
    for (let i = 0; i < elements.length; i++) {
      if (elements[i] > 0) {
        return true;
      }
    }
    return false;
  };

  damageMod(weapon) {
    let mod;
    switch (weapon.type) {
      case 'melee':
        mod = this.modifier(this.monster.strength);
        break;
      case 'ranged':
      case 'finesse':
        mod = this.modifier(this.monster.dexterity);
        break;
    }
    return mod;
  }

  attackMod(weapon) {
    let mod;
    switch (weapon.type) {
      case 'melee':
        mod = this.calculated_attack(this.monster.strength);
        break;
      case 'ranged':
      case 'finesse':
        mod = this.calculated_attack(this.monster.dexterity);
        break;
    }
    return mod;
  }

  weaponDamage(weapon) {
    let dmg;
    switch (this.monster.size) {
      case 'Tiny':
        dmg = weapon.tiny;
        break;
      case 'Small':
        dmg = weapon.small;
        break;
      case 'Medium':
        dmg = weapon.medium;
        break;
       case 'Large':
        dmg = weapon.large;
        break;
      case 'Huge':
        dmg = weapon.huge;
        break;
    }
    return dmg;
  }
}


