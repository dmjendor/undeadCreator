import { Component, OnInit, Input } from '@angular/core';
import { Undead } from 'shared/models/undead';
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';
import { CardService } from 'shared/services/card.service';
import { UtilityService } from 'shared/services/utility.service';
import { UndeadService } from 'shared/services/undead.service';


@Component({
  selector: 'undead-card',
  templateUrl: './undead-card.component.html',
  styleUrls: ['./undead-card.component.css']
})
export class UndeadCardComponent implements OnInit {
  @Input() undead: Undead;
  @Input() edit: boolean;
  appUser: AppUser;
  undeadKeys = Object.keys;

  constructor(
    private auth: AuthService,
    private cardService: CardService,
    private utilityService: UtilityService,
    private undeadService: UndeadService
  ) {}

  toTitleCase = function(text) {
    return this.utilityService.toTitleCase(text);
  };


  calculated_hit_points = function() {
    return this.cardService.calculated_hit_points(this.undead);
  };

  calculated_attack = function(stat: number) {
    return this.cardService.calculated_attack(stat, this.undead);
  };

  modifier = function(stat: number) {
    return this.cardService.modifier(stat);
  };

  invalidModifier = function(stat: number) {
    return this.cardService.invalidModifier(stat);
  };

  bonusHitPoints = function() {
    return this.cardService.bonusHitPoints(this.undead);
  };

  deleteUndead() {
    this.undeadService.remove(this.undead.key);
  }

  editUndead() {

  }

  checkSpecials = function() {
    const elements = Object.values(this.undead.elemental);
    for (let i = 0; i < elements.length; i++) {
      if (elements[i] > 0) {
        return true;
      }
    }
    return false;
  };

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

}


