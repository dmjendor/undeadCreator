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
  monster: {};
  id;

  constructor(
    private route: ActivatedRoute,
    private monsterService: MonsterService,
    private router: Router
  ) {


    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.monsterService.get(this.id).valueChanges().pipe(take(1)).subscribe(p => this.monster = p);
    }
  }

  save(monster) {
    if (this.id) {
      this.monsterService.update(this.id, monster);
    } else {
      this.monsterService.create(monster);
    }
    this.router.navigate(['/admin/monsters']);
  }

  cancel() {
    this.router.navigate(['/admin/monsters']);
  }

  delete() {
    if (confirm('Are you sure you wish to delete this monster?')) {
      this.monsterService.remove(this.id);
      this.router.navigate(['/admin/monsters']);
    }
  }

  ngOnInit() {

  }

}
