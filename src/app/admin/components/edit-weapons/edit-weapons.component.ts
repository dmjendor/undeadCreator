import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { Weapon } from 'shared/models/weapon';
import { WeaponService } from 'shared/services/weapons.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'edit-weapons',
  templateUrl: './edit-weapons.component.html',
  styleUrls: ['./edit-weapons.component.css']
})
export class EditWeaponsComponent implements OnInit, OnDestroy {
    weapons: Weapon[];
    subscription: Subscription;
    // items: Monster[] = [];
    itemCount: number;
    selected: any[];
    selectedWeapon: Weapon;
    columns = [
      { prop: 'name' },
      { name: 'Type' },
      { name: 'Damage' }
    ];

    constructor(
      private weaponService: WeaponService,
      private route: ActivatedRoute,
      private router: Router,
      ) {
      this.subscription = this.weaponService.getAll()
      .subscribe(weapons => {
        this.weapons = weapons;
        this.selected = [weapons[0]];
        this.selectedWeapon = weapons[0];
        console.log(this.selectedWeapon);
        // this.initializeTable(monsters);
      });
    }

    createWeapon() {
      this.router.navigate(['/admin/weapons/new']);
    }

    editWeapon() {
      this.router.navigate(['/admin/weapons/' + this.selectedWeapon.key]);
    }

    deleteWeapon() {
      this.weaponService.remove(this.selectedWeapon.key);
    }

    onSelect({ selected }) {
      this.selectedWeapon = this.selected[0];
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
        this.weapons.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
        this.weapons;
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

