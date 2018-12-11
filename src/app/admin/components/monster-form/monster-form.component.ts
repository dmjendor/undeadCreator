import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MonsterService } from 'shared/services/monster.service';
import { take } from 'rxjs/operators';
import { Monster } from 'shared/models/monster';
import { SizeService } from 'shared/services/size.service';
import { Size } from 'shared/models/size';
import { UtilityService } from 'shared/services/utility.service';
import { WeaponService } from 'shared/services/weapons.service';
import { Weapon } from 'shared/models/weapon';
import { Modifier } from 'shared/models/modifier';
import { ModifierService } from 'shared/services/modifier.service';

@Component({
  selector: 'app-monster-form',
  templateUrl: './monster-form.component.html',
  styleUrls: ['./monster-form.component.css']
})
export class MonsterFormComponent implements OnInit, OnDestroy {
  categories$: Observable<any>;
  monster = new Monster();
  sizeSub: Subscription;
  sizes: Size[];
  weaponSub: Subscription;
  weapons: Weapon[];
  modifierSub: Subscription;
  modifiers: Modifier[];

  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sizeService: SizeService,
    private weaponService: WeaponService,
    private utilityService: UtilityService,
    private monsterService: MonsterService,
    private modifierService: ModifierService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.monsterService.get(this.id)
      .valueChanges().pipe(take(1)).subscribe(p => this.monster = p as Monster);
    }
  }

  toTitleCase(string) {
    return this.utilityService.toTitleCase(string);
  }

  updateHitDice() {
    const selectedSize = this.sizes.find(x => x.key === this.monster.size);
    this.monster.hit_dice_size = selectedSize.hit_dice_size;
  }

  filterModsOfType(type) {
    return this.modifiers.filter(x => x.type === type)
    .sort((a, b) => a.name.localeCompare(b.name));

  }

  offHandWeapons() {
    return this.weapons.filter(x => x.light === true);
  }

  updateWeapon() {
    if (!this.monster.actions.multiattack) {
      this.monster.actions.secondary = null;
    }
  }

  save(monster) {
    if (this.id) {
      this.monsterService.update(this.id, monster);
    } else {
      this.monsterService.create(monster);
    }
    this.router.navigate(['/admin/monsters']);
  }

  cancel() {
    this.router.navigate(['/admin/monsters']);
  }

  delete() {
    if (confirm('Are you sure you wish to delete this monster?')) {
      this.monsterService.remove(this.id);
      this.router.navigate(['/admin/monsters']);
    }
  }

  async ngOnInit() {
    this.sizeSub = this.sizeService.getAll()
    .subscribe(sz => {
      this.sizes = sz;
    });

    this.modifierSub = this.modifierService.getAll()
    .subscribe(mod => {
      this.modifiers = mod;
    });

    this.weaponSub = this.weaponService.getAll()
    .subscribe(weapons => {
      this.weapons = weapons;
    });

  }

  ngOnDestroy() {
    this.modifierSub.unsubscribe();
    this.sizeSub.unsubscribe();
    this.weaponSub.unsubscribe();
  }

}
