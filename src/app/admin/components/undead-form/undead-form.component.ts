import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UndeadService } from 'shared/services/undead.service';
import { take } from 'rxjs/operators';
import { Undead } from 'shared/models/undead';
import { SizeService } from 'shared/services/size.service';
import { Size } from 'shared/models/size';
import { UtilityService } from 'shared/services/utility.service';
import { WeaponService } from 'shared/services/weapons.service';
import { Weapon } from 'shared/models/weapon';
import { Modifier } from 'shared/models/modifier';
import { ModifierService } from 'shared/services/modifier.service';

@Component({
  selector: 'app-undead-form',
  templateUrl: './undead-form.component.html',
  styleUrls: ['./undead-form.component.css']
})
export class UndeadFormComponent implements OnInit, OnDestroy {
  categories$: Observable<any>;
  undead = new Undead();
  sizeSub: Subscription;
  sizes: Size[];
  weaponSub: Subscription;
  weapons: Weapon[];
  modifierSub: Subscription;
  modifiers: Modifier[];
  specialName: Text;
  specialDescription: Text;

  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sizeService: SizeService,
    private weaponService: WeaponService,
    private utilityService: UtilityService,
    private undeadService: UndeadService,
    private modifierService: ModifierService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.undeadService.get(this.id)
      .valueChanges().pipe(take(1)).subscribe(p => this.undead = p as Undead);
    }
  }

  toTitleCase(string) {
    return this.utilityService.toTitleCase(string);
  }

  updateHitDice() {
    const selectedSize = this.sizes.find(x => x.key === this.undead.size);
    this.undead.hit_dice_size = selectedSize.hit_dice_size;
  }

  filterModsOfType(type) {
    return this.modifiers.filter(x => x.type === type)
    .sort((a, b) => a.name.localeCompare(b.name));

  }

  offHandWeapons() {
    return this.weapons.filter(x => x.light === true);
  }

  updateWeapon() {
    if (!this.undead.actions.multiattack) {
      this.undead.actions.secondary = null;
    }
  }

  addSpecial() {
    this.undead.special_abilities.push({name: this.specialName, description: this.specialDescription});
    this.specialDescription = null;
    this.specialName = null;
  }

  save(undead) {
    if (this.id) {
      this.undeadService.update(this.id, this.undead);
    } else {
      this.undeadService.create(this.undead);
    }
    this.router.navigate(['/admin/undeads']);
  }

  cancel() {
    this.router.navigate(['/admin/undeads']);
  }

  delete() {
    if (confirm('Are you sure you wish to delete this undead?')) {
      this.undeadService.remove(this.id);
      this.router.navigate(['/admin/undeads']);
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
