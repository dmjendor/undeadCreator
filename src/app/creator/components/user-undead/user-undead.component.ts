import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Undead } from 'shared/models/undead';
import { UndeadService } from 'shared/services/undead.service';
import { SpellService } from 'shared/services/spell.service';
import { SelectedSpell } from 'shared/models/selected-spell';
import { Spell } from 'shared/models/spell';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';

@Component({
  selector: 'user-undead',
  templateUrl: './user-undead.component.html',
  styleUrls: ['./user-undead.component.css']
})
export class UserUndeadComponent implements OnInit, OnDestroy {
    undead: Undead[];
    undeadSub: Subscription;
    // items: Monster[] = [];
    itemCount: number;
    selected: any[];
    selectedUndead: Undead;
    appUser: AppUser;

  spells: Spell[];
  selectedSpells: SelectedSpell[];
  spellSub: Subscription;

    columns = [
      { prop: 'name' },
      { name: 'Cost' },
      { name: 'Active' }
    ];

    constructor(
      private undeadService: UndeadService,
      private spellService: SpellService,
      private auth: AuthService
      ) {
      this.undeadSub = this.undeadService.getAll()
      .subscribe(undead => {
        this.undead = undead;
        this.selected = [undead[0]];
        this.selectedUndead = undead[0];
        console.log(this.selectedUndead);
        // this.initializeTable(monsters);
      });

    }

    onSelect({ selected }) {
      console.log('Select Event', selected, this.selected);
      this.selectedUndead = this.selected[0];
      console.log(this.selectedUndead);
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
        this.undead.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
        this.undead;
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

    async ngOnInit() {

      this.spellSub = this.spellService.getAll()
      .subscribe(spells => {
        this.spells = spells;
        this.selectedSpells = [];
        for (let i = 0; i < this.spells.length; i++) {
          this.selectedSpells.push({key: this.spells[i].key, points: this.spells[i].points, count: 0});
        }
      });

      this.auth.appUser$.subscribe(appUser => this.appUser = appUser);


    }

    ngOnDestroy() {
      this.undeadSub.unsubscribe();
      this.spellSub.unsubscribe();
    }


  }

