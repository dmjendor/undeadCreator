import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { Monster } from 'shared/models/monster';
import { MonsterService } from 'shared/services/monster.service';
import { Router } from '@angular/router';


@Component({
  selector: 'manage-monsters',
  templateUrl: './manage-monsters.component.html',
  styleUrls: ['./manage-monsters.component.css']
})
export class ManageMonstersComponent implements OnInit, OnDestroy {
    monsters: Monster[];
    subscription: Subscription;
    // items: Monster[] = [];
    itemCount: number;
    selected: any[];
    selectedMonster: Monster;
    columns = [
      { prop: 'name' },
      { name: 'Cost' },
      { name: 'Active' }
    ];

    constructor(
      private monsterService: MonsterService,
      private router: Router
      ) {
      this.subscription = this.monsterService.getAll()
      .subscribe(monsters => {
        this.monsters = monsters;
        this.selected = [monsters[0]];
        this.selectedMonster = monsters[0];

        // this.initializeTable(monsters);
      });

    }

    createMonster() {
      this.router.navigate(['/admin/monsters/new']);
    }

    editMonster() {
      this.router.navigate(['/admin/monster/' + this.selectedMonster.key]);
    }

    deleteMonster() {
      this.monsterService.remove(this.selectedMonster.key);
    }

    onSelect({ selected }) {
      this.selectedMonster = this.selected[0];
    }

    onActivate(event) {
      // console.log('Activate Event', event);
    }

    // private initializeTable(products: Monster[]) {
    //   this.tableResource = new DataTableResource(products);
    //   this.tableResource.query({ offset: 0 })
    //     .then(items => this.items = items);
    //   this.tableResource.count()
    //     .then(count => this.itemCount = count);
    // }

    filter(query: string) {
       const filteredProducts = (query) ?
        this.monsters.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
        this.monsters;
      // this.initializeTable(filteredProducts);

    }

    reloadItems(params) {
      // if (this.tableResource) {
      //   this.tableResource.query({ offset: 0 })
      //     .then(items => this.items = items);
      // } else {
      //   return;
      // }
    }

    ngOnInit() {
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

  }

