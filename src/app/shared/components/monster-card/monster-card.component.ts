import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
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
export class MonsterCardComponent implements OnInit, OnChanges {
  @Input() monster: Monster;
  @Input() edit: boolean;
  appUser: AppUser;
  monsterKeys = Object.keys;
  primaryAttack: Weapon;
  secondaryAttack: Weapon;
  offHandAttack: Weapon;


  constructor(
    private auth: AuthService,
    private card: CardService,
    private weaponService: WeaponService,
    private utilityService: UtilityService
    ) {}


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
    if (this.monster.elemental) {
      const elements = Object.values(this.monster.elemental);
      for (let i = 0; i < elements.length; i++) {
        if (elements[i] > 0) {
          return true;
        }
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
    let dmg = '';
    console.log(this.monster.size);
    switch (this.monster.size) {
      case 'tiny':
        dmg = weapon.tiny;
        break;
      case 'small':
        dmg = weapon.small;
        break;
      case 'medium':
        dmg = weapon.medium;
        break;
       case 'large':
        dmg = weapon.large;
        break;
      case 'huge':
        dmg = weapon.huge;
        break;
    }
    return dmg;
  }

  loadSubs() {
    if (this.monster && this.monster.actions) {
      if (this.monster.actions.primary !== '') {
        this.weaponService.get(this.monster.actions.primary)
        .valueChanges()
        .pipe(take(1))
        .subscribe(p => this.primaryAttack = p as Weapon );
      }
      if (this.monster.actions.secondary !== '') {
        this.weaponService.get(this.monster.actions.secondary)
        .valueChanges()
        .pipe(take(1))
        .subscribe(p => this.secondaryAttack = p as Weapon );
      }
      if (this.monster.actions.offhand !== '') {
        this.weaponService.get(this.monster.actions.offhand)
        .valueChanges()
        .pipe(take(1))
        .subscribe(p => this.offHandAttack = p as Weapon);
      }
    }

  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.loadSubs();
  }

  ngOnChanges() {
    this.loadSubs();
  }
}


