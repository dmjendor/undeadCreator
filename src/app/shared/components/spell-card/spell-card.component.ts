import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Spell } from 'shared/models/spell';
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';
import { CardService } from 'shared/services/card.service';
import { UtilityService } from 'shared/services/utility.service';
import { SpellService } from 'shared/services/spell.service';
import { CharacterClassService } from 'shared/services/class.service';
import { Subscription } from 'rxjs';
import { CharacterClass } from 'shared/models/class';


@Component({
  selector: 'spell-card',
  templateUrl: './spell-card.component.html',
  styleUrls: ['./spell-card.component.css']
})
export class SpellCardComponent implements OnInit, OnDestroy {
  @Input() spell: Spell;
  @Input() edit: boolean;
  appUser: AppUser;
  spellKeys = Object.keys;
  classSub: Subscription;
  classes: CharacterClass[];

  constructor(
    private auth: AuthService,
    private cardService: CardService,
    private utilityService: UtilityService,
    private spellService: SpellService,
    private classService: CharacterClassService
  ) {}

  toTitleCase = function(text) {
    return this.utilityService.toTitleCase(text);
  };


  deleteUndead() {
    this.spellService.remove(this.spell.key);
  }

  classMatch(cls: string) {
    if (this.classes && this.classes.length > 0) {
      const thisCls = this.classes.find(x => x.key === cls);
       return thisCls.name;
    }
  }

  editUndead() {

  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.classSub = this.classService.getAll()
    .subscribe(classes => {
      this.classes = classes;
    });
  }

  ngOnDestroy() {
    this.classSub.unsubscribe();
  }
}

