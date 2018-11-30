import { Component, OnInit, OnDestroy } from '@angular/core';
import { MonsterService } from 'shared/services/monster.service';
import { Undead } from 'shared/models/undead';
import { Subscription } from 'rxjs';

import { Modifier } from 'shared/models/modifier';
import { ModifierService } from 'shared/services/modifier.service';
import { FiltersService } from 'shared/services/filters.service';
import { SizeService } from 'shared/services/size.service';
import { Size } from 'shared/models/size';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { UndeadService } from 'shared/services/undead.service';
import { Monster } from 'shared/models/monster';
import { Weapon } from 'shared/models/weapon';
import { WeaponService } from 'shared/services/weapons.service';

@Component({
  selector: 'create-undead',
  templateUrl: './create-undead.component.html',
  styleUrls: ['./create-undead.component.css']
})

export class CreateUndeadComponent  implements OnInit, OnDestroy {
  monsters: Monster[];
  selectedMonster: Monster;
  baseMonster: Monster;
  filteredMonsters: Monster[];
  modifiers: Modifier[];
  monsterSub: Subscription;
  weaponSub: Subscription;
  modifierSub: Subscription;
  sizeSub: Subscription;
  weapons: Weapon[];
  sizes: Size[];
  active: boolean;
  currentSize: string;
  previousSize: string;
  appUser: AppUser;

  constructor(
    private undeadService: UndeadService,
    private weaponService: WeaponService,
    private monsterService: MonsterService,
    private modifierService: ModifierService,
    private filtersService: FiltersService,
    private sizeService: SizeService,
    private auth: AuthService,
    ) {

  }

  async ngOnInit() {
    this.monsterSub = this.monsterService.getAll()
    .subscribe(monsters => {
      this.monsters = monsters;
      this.filteredMonsters = this.filtersService.filterBoolean(this.monsters, 'active', true);
    });

    this.modifierSub = this.modifierService.getAll()
    .subscribe(modifiers => {
      this.modifiers = modifiers;
    });

    this.weaponSub = this.weaponService.getAll()
    .subscribe(weapons => {
      this.weapons = weapons;
    });

    this.sizeSub = this.sizeService.getAll()
    .subscribe(sizes => {
      this.sizes = sizes;
    });

    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

  }

  ngOnDestroy() {
    this.monsterSub.unsubscribe();
    this.modifierSub.unsubscribe();
    this.sizeSub.unsubscribe();

  }


  updateMonster(mod: Modifier) {
    if (mod.added) {
      this.selectedMonster.cost += mod.cost;
      switch (mod.type) {
        case 'special':
          if (!this.selectedMonster[mod.location]) {
            this.selectedMonster[mod.location] = [];
          }
          this.selectedMonster[mod.location].push({name: mod.name, desc: mod.description});
        break;
      }
    } else {
      this.selectedMonster.cost -= mod.cost;
      const index = this.selectedMonster[mod.location].map(function(x) {return x.name; }).indexOf(mod.name);
      switch (mod.type) {
        case 'special':
        case 'ability':
          this.selectedMonster[mod.location].splice(index, 1);
        break;
        case 'combat':
        break;
        case 'size':
          // sizes will always have one selected.
        break;

        default:
        break;
      }

    }
  }

  updateSize(mod) {
    const prevMod = this.modifiers.filter(i => i.name === this.previousSize)[0];
    const prevSize = this.sizes.filter(i => i.key === prevMod.name.toLowerCase())[0];
    const size = this.sizes.filter(i => i.key === mod.name.toLowerCase())[0];
    this.selectedMonster.cost -= prevMod.cost;
    this.selectedMonster.cost += mod.cost;
    this.selectedMonster[mod.location] = mod.name;
    // update str removing previous modifier and adding new one
    this.selectedMonster.strength -= prevSize.strength;
    this.selectedMonster.strength += size.strength;
    // update dex removing previous modifier and adding new one
    this.selectedMonster.dexterity -= prevSize.dexterity;
    this.selectedMonster.dexterity += size.dexterity;
    // update con removing previous modifier and adding new one
    this.selectedMonster.constitution -= prevSize.constitution;
    this.selectedMonster.constitution += size.constitution;
    // update hit dice size
    this.selectedMonster.hit_dice_size = size.hit_dice_size;
    this.previousSize = mod.name;
  }

  setBase() {
    this.baseMonster = JSON.parse(JSON.stringify(this.selectedMonster));
    this.currentSize = this.baseMonster.size;
    this.previousSize = this.baseMonster.size;
  }

  createUndead() {
    const newDead = this.selectedMonster as Undead;

    newDead.user = localStorage.getItem('userId');
    this.undeadService.create(newDead);
  }

  filterModsOfType(type) {
    return this.modifiers.filter(x => x.type === type);
  }

  offHandWeapons() {
    return this.weapons.filter(x => x.light === true);
  }


  applyHover() {
    if (this.selectedMonster.speed.hover) {
      this.selectedMonster.cost++;
    } else {
      this.selectedMonster.cost--;
    }
  }

}

