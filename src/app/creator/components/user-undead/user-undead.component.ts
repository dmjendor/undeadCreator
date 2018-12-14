import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Undead } from 'shared/models/undead';
import { UndeadService } from 'shared/services/undead.service';
import { SpellService } from 'shared/services/spell.service';
import { SelectedSpell } from 'shared/models/selected-spell';
import { Spell } from 'shared/models/spell';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'user-undead',
  templateUrl: './user-undead.component.html',
  styleUrls: ['./user-undead.component.css']
})
export class UserUndeadComponent implements OnInit, OnDestroy {

  itemCount: number;
  selected: any[];
  appUser: AppUser;

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
      private authService: AuthService,
      private router: Router
    ) {
    }

    editUndead(row) {
      localStorage.setItem('returnUrl', '/undead');
      this.router.navigate(['/undead/' + row.key]);
    }

    deleteUndead(row) {
      this.undeadService.remove(row.key);
    }

    onSelect({ selected }) {
      this.selectedUndead = this.selected[0];
    }

    onActivate(event) {
      // console.log('Activate Event', event);
    }

    filter(query: string) {
       const filteredProducts = (query) ?
        this.undead.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
        this.undead;
    }

    reloadItems(params) {
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
        });
      });

      this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
    }

    ngOnDestroy() {
      this.userSubscription.unsubscribe();
      this.spellSub.unsubscribe();
    }


  }

