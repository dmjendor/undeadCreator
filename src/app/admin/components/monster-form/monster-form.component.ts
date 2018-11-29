import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MonsterService } from 'shared/services/monster.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-monster-form',
  templateUrl: './monster-form.component.html',
  styleUrls: ['./monster-form.component.css']
})
export class MonsterFormComponent implements OnInit {
  categories$: Observable<any>;
  weapon: {};
  id;

  constructor(
    private route: ActivatedRoute,
    private monsterService: MonsterService,
    private router: Router
  ) {


    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.monsterService.get(this.id).valueChanges().pipe(take(1)).subscribe(p => this.weapon = p);
    }
  }

  save(weapon) {
    if (this.id) {
      this.monsterService.update(this.id, weapon);
    } else {
      this.monsterService.create(weapon);
    }
    this.router.navigate(['/admin/products']);
  }

  cancel() {
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (confirm('Are you sure you wish to delete this product?')) {
      this.monsterService.remove(this.id);
      this.router.navigate(['/admin/products']);
    }
  }

  ngOnInit() {

  }

}
