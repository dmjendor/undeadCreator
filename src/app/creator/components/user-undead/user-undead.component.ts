import { Component, OnInit, OnDestroy } from '@angular/core';
import { Monster } from 'shared/models/monster';
import { Subscription } from 'rxjs';
import { MonsterService } from 'shared/services/monster.service';

@Component({
  selector: 'app-user-undead',
  templateUrl: './user-undead.component.html',
  styleUrls: ['./user-undead.component.css']
})
export class UserUndeadComponent implements OnInit, OnDestroy {
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

    constructor(private monsterService: MonsterService) {
      this.subscription = this.monsterService.getAll()
      .subscribe(monsters => {
        this.monsters = monsters;
        this.selected = [monsters[0]];
        this.selectedMonster = monsters[0];
        console.log(this.selectedMonster);
        // this.initializeTable(monsters);
      });

    }

    onSelect({ selected }) {
      console.log('Select Event', selected, this.selected);
      this.selectedMonster = this.selected[0];
      console.log(this.selectedMonster);
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

