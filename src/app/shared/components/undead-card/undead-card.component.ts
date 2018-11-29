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
    private card: CardService,
    private utilityService: UtilityService,
    private undeadService: UndeadService
  ) {}

  toTitleCase = function(text) {
    return this.utilityService.toTitleCase(text);
  };


  calculated_hit_points = function() {
    return this.card.calculated_hit_points(this.undead);
  };

  calculated_attack = function(stat: number) {
    return this.card.calculated_attack(stat);
  };

  modifier = function(stat: number) {
    return this.card.modifier(stat);
  };

  invalidModifier = function(stat: number) {
    return this.card.invalidModifier(stat);
  };

  bonusHitPoints = function() {
    return this.card.bonusHitPoints(this.undead);
  };

  deleteUndead() {
    this.undeadService.remove(this.undead.key);
  }

  editUndead() {

  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

}


