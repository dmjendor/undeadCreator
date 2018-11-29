import { Component, OnInit, Input } from '@angular/core';
import { Weapon } from 'shared/models/weapon';
import { WeaponService } from 'shared/services/weapons.service';

@Component({
  selector: 'weapon-card',
  templateUrl: './weapon-card.component.html',
  styleUrls: ['./weapon-card.component.css']
})
export class WeaponCardComponent {
  @Input() weapon: Weapon;
  @Input() showActions = true;

  constructor(private weaponService: WeaponService) { }

  addToCart() {
    this.weaponService.create(this.weapon);
  }


}
