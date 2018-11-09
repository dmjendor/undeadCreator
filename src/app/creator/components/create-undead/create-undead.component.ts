import { Component, OnInit, OnDestroy } from '@angular/core';
import { MonsterService } from 'shared/services/monster.service';
import { Monster } from 'shared/models/monster';
import { Subscription } from 'rxjs';

import { Modifier } from 'shared/models/modifier';
import { ModifierService } from 'shared/services/modifier.service';
import { FiltersService } from 'shared/services/filters.service';

@Component({
  selector: 'create-undead',
  templateUrl: './create-undead.component.html',
  styleUrls: ['./create-undead.component.css']
})

export class CreateUndeadComponent  implements OnInit, OnDestroy {
  monsters: Monster[];
  selectedMonster: Monster;
  baseMonster: Monster;
  modifiers: Modifier[];
  filteredMonsters: Monster[];
  monsterSub: Subscription;
  modifierSub: Subscription;
  active: boolean;


  constructor(
    private monsterService: MonsterService,
    private modifierService: ModifierService,
    private filtersService: FiltersService) {

  }

  ngOnInit() {
    this.monsterSub = this.monsterService.getAll()
    .subscribe(monsters => {
      this.monsters = monsters;
      this.filteredMonsters = this.filtersService.filterBoolean(this.monsters, 'active', true);
    });

    this.modifierSub = this.modifierService.getAll()
    .subscribe(modifiers => {
      this.modifiers = modifiers;
    });
  }

  ngOnDestroy() {
    this.monsterSub.unsubscribe();
    this.modifierSub.unsubscribe();
  }


  updateMonster(mod) {
    console.log(mod);
  }

  setBase() {
    this.baseMonster = Object.assign({}, this.selectedMonster);
  }

}

