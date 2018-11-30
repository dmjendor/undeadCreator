import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { WeaponService } from 'shared/services/weapons.service';
import { Weapon } from 'shared/models/weapon';

@Component({
  selector: 'weapon-form',
  templateUrl: './weapon-form.component.html',
  styleUrls: ['./weapon-form.component.css']
})
export class WeaponFormComponent implements OnInit {
  categories$: Observable<any>;
  weapon = {};
  id;

  constructor(
    private route: ActivatedRoute,
    private weaponService: WeaponService,
    private router: Router
  ) {


    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.weaponService.get(this.id)
        .valueChanges()
        .pipe(take(1))
        .subscribe(p => this.weapon = p);
    } else {
      this.weapon.light = false;
    }
  }

  save(weapon) {
    if (this.id) {
      this.weaponService.update(this.id, weapon);
    } else {
      this.weaponService.create(weapon);
    }
    this.router.navigate(['/admin/weapons']);
  }

  cancel() {
    this.router.navigate(['/admin/weapons']);
  }

  delete() {
    if (confirm('Are you sure you wish to delete this weapon?')) {
      this.weaponService.remove(this.id);
      this.router.navigate(['/admin/weapons']);
    }
  }

  ngOnInit() {

  }

}
