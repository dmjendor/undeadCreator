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
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { ThemeService } from 'shared/services/theme.service';

@Component({
  selector: 'edit-undead',
  templateUrl: './edit-undead.component.html',
  styleUrls: ['./edit-undead.component.css']
})
export class EditUndeadComponent implements OnInit, OnDestroy {
  id: string;
  baseMonster: Monster;
  undead: Undead;

  modifierSub: Subscription;
  modifiers: Modifier[];

  weaponSub: Subscription;
  weapons: Weapon[];

  sizeSub: Subscription;
  sizes: Size[];

  currentSize: string;
  previousSize: string;
  appUser: AppUser;
  path = localStorage.getItem('returnUrl');

  constructor(
    private undeadService: UndeadService,
    private weaponService: WeaponService,
    private themeService: ThemeService,
    private monsterService: MonsterService,
    private modifierService: ModifierService,
    private filtersService: FiltersService,
    private sizeService: SizeService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {

        this.undeadService.get(this.id)
          .valueChanges()
          .pipe(take(1))
          .subscribe(p => {
            this.undead = p as Undead;
            this.monsterService.get(this.undead.base)
              .valueChanges()
              .pipe(take(1))
              .subscribe(q => {
                this.baseMonster = q as Monster;
                this.currentSize = this.undead.size;
                this.previousSize = this.baseMonster.size;
            });
        });
    }
  }

  saveUndead() {
    this.undeadService.update(this.undead.key, this.undead);
    this.router.navigate([this.path]);
  }

  cancelUndead() {
    this.router.navigate([this.path]);
  }

  updateMonster(mod: Modifier) {
    if (mod.added) {
      this.undead.cost += mod.cost;
      switch (mod.type) {
        case 'special':
          if (!this.undead[mod.location]) {
            this.undead[mod.location] = [];
          }
          this.undead[mod.location].push({name: mod.name, desc: mod.description});
        break;
      }
    } else {
      this.undead.cost -= mod.cost;
      const index = this.undead[mod.location].map(function(x) {return x.name; }).indexOf(mod.name);
      switch (mod.type) {
        case 'special':
        case 'ability':
          this.undead[mod.location].splice(index, 1);
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
    const prevMod = this.modifiers.filter(i => i.name.toLowerCase() === this.previousSize.toLowerCase())[0];
    const prevSize = this.sizes.filter(i => i.key === prevMod.name.toLowerCase())[0];
    const size = this.sizes.filter(i => i.key === mod.name.toLowerCase())[0];
    this.undead.cost -= prevMod.cost;
    this.undead.cost += mod.cost;
    this.undead[mod.location] = mod.name;
    // update str removing previous modifier and adding new one
    this.undead.strength -= prevSize.strength;
    this.undead.strength += size.strength;
    // update dex removing previous modifier and adding new one
    this.undead.dexterity -= prevSize.dexterity;
    this.undead.dexterity += size.dexterity;
    // update con removing previous modifier and adding new one
    this.undead.constitution -= prevSize.constitution;
    this.undead.constitution += size.constitution;
    // update hit dice size
    this.undead.hit_dice_size = size.hit_dice_size;
    this.previousSize = mod.name;
  }

  setBase() {
    this.baseMonster = JSON.parse(JSON.stringify(this.undead));
    this.currentSize = this.baseMonster.size;
    this.previousSize = this.baseMonster.size;
  }

  filterModsOfType(type) {
    return this.modifiers.filter(x => x.type === type);
  }

  offHandWeapons() {
    return this.weapons.filter(x => x.light === true);
  }

  updateWeapon() {
    if (!this.undead.actions.multiattack) {
      this.undead.actions.secondary = null;
    }
  }

  applyHover() {
    if (this.undead.speed.hover) {
      this.undead.cost++;
    } else {
      this.undead.cost--;
    }
  }

  async ngOnInit() {
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

    this.authService.appUser$.subscribe(appUser => {
      this.appUser = appUser;
      this.themeService.setCurrentTheme(this.appUser.theme);
    });
  }

  ngOnDestroy() {
    this.weaponSub.unsubscribe();
    this.modifierSub.unsubscribe();
    this.sizeSub.unsubscribe();
  }

}
