import { Component, OnInit } from '@angular/core';
import { CharacterClass } from 'shared/models/class';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from 'shared/services/utility.service';
import { CharacterClassService } from 'shared/services/class.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.css']
})
export class ClassFormComponent implements OnInit {
  classList: CharacterClass[];
  charClass = new CharacterClass();
  classSub: Subscription;

  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private utilityService: UtilityService,
    private classService: CharacterClassService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.classService.get(this.id)
      .valueChanges().pipe(take(1)).subscribe(p => this.charClass = p as CharacterClass);
    }
  }

  toTitleCase(string) {
    return this.utilityService.toTitleCase(string);
  }

  save() {
    if (this.id) {
      this.classService.update(this.id, this.charClass);
    } else {
      this.classService.create(this.charClass);
    }
    this.router.navigate(['/admin/classes']);
  }

  cancel() {
    this.router.navigate(['/admin/classes']);
  }

  delete() {
    if (confirm('Are you sure you wish to delete this class?')) {
      this.classService.remove(this.id);
      this.router.navigate(['/admin/classes']);
    }
  }

  async ngOnInit() {

  }



}
