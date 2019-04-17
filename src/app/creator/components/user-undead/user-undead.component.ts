import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppUser } from 'shared/models/app-user';
import { SelectedSpell } from 'shared/models/selected-spell';
import { Spell } from 'shared/models/spell';
import { Undead } from 'shared/models/undead';
import { AuthService } from 'shared/services/auth.service';
import { SpellService } from 'shared/services/spell.service';
import { ThemeService } from 'shared/services/theme.service';
import { UndeadService } from 'shared/services/undead.service';

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
  necroSpells: Spell[] =  [];
  selectedSpells: SelectedSpell[] = [];
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
      private themeService: ThemeService,
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

    spellPoints(spell) {
      let points = spell.points;
      if (this.appUser.necromancer) {
        points += spell.npoints;
      }
      return points;
    }

    levelCheck(spell) {
      const spellReqLevel = ((spell.level * 2) - 1);
      const casterLevel = this.appUser.level * 1;
      console.log(casterLevel, spellReqLevel, spellReqLevel >= casterLevel);
      return spellReqLevel >= casterLevel;
    }

    async ngOnInit() {
      this.spellSub = this.spellService.getUndeadSpells()
      .subscribe(spells => {
        this.spells = spells;
        for (let i = 0; i < this.spells.length; i++) {
          if (this.spells[i].points > 0) {
            if (!this.levelCheck(this.spells[i])) {
              this.necroSpells.push(this.spells[i]);
            }
            this.selectedSpells.push({key: this.spells[i].key, points: this.spells[i].points, count: 0});
          }
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

      this.authService.appUser$.subscribe(appUser => {
        this.appUser = appUser;
        this.themeService.setCurrentTheme(this.appUser.theme);
      });
    }

    ngOnDestroy() {
      this.userSubscription.unsubscribe();
      this.spellSub.unsubscribe();
    }


  }

