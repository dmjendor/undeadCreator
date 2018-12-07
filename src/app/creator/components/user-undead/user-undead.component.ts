import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Undead } from 'shared/models/undead';
import { UndeadService } from 'shared/services/undead.service';
import { SpellService } from 'shared/services/spell.service';
import { SelectedSpell } from 'shared/models/selected-spell';
import { Spell } from 'shared/models/spell';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'user-undead',
  templateUrl: './user-undead.component.html',
  styleUrls: ['./user-undead.component.css']
})
export class UserUndeadComponent implements OnInit, OnDestroy {

  itemCount: number;
  selected: any[];

  undead$;
  undead: Undead[];
  undeadSub: Subscription;
  selectedUndead: Undead;

  spells: Spell[];
  selectedSpells: SelectedSpell[];
  spellSub: Subscription;

  userId: string;
  userSubscription: Subscription;

    columns = [
      { prop: 'name' },
      { name: 'Cost' },
      { name: 'Active' }
    ];

    constructor(
      private undeadService: UndeadService,
      private spellService: SpellService,
      private authService: AuthService
    ) {
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

    transform(source: Undead[]) {
      const dest: Undead[] = [];

      for (const sourceItem of source) {
        const destItem = {...sourceItem};
        dest.push(destItem);
      }
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
      this.userSubscription = this.authService.user$.subscribe(user => {
        this.userId = user.uid;
        this.undeadService.getUndeadByUser(this.userId)
        .subscribe(undead => {
          this.undead = undead as Undead[];
          this.selected = [undead[0]];
          this.selectedUndead = undead[0] as Undead;
          console.log(this.selectedUndead);
        });
      });




        // this.undeadSub = this.undeadService.getUndeadByUser(this.appUser.key)
        // .subscribe(undead => {
        //   this.undead = undead;
        //   this.selected = [undead[0]];
        //   this.selectedUndead = undead[0];
        //   console.log(this.selectedUndead);
        //   // this.initializeTable(monsters);
        // });
    }

    ngOnDestroy() {
      this.userSubscription.unsubscribe();
      this.spellSub.unsubscribe();
    }


  }

