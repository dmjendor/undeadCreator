import { Component, OnInit, Input } from '@angular/core';
import { Undead } from 'shared/models/undead';
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';
import { CardService } from 'shared/services/card.service';


@Component({
  selector: 'undead-card',
  templateUrl: './undead-card.component.html',
  styleUrls: ['./undead-card.component.css']
})
export class UndeadCardComponent implements OnInit {
  @Input() undead: Undead;
  appUser: AppUser;

  constructor(
    private auth: AuthService,
    private card: CardService
    ) {}

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

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

}


