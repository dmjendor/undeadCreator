import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { SpellService } from 'shared/services/spell.service';
import { UtilityService } from 'shared/services/utility.service';
import { CharacterClass } from 'shared/models/class';
import { Spell } from 'shared/models/spell';
import { CharacterClassService } from 'shared/services/class.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-spell-form',
  templateUrl: './spell-form.component.html',
  styleUrls: ['./spell-form.component.css']
})
export class SpellFormComponent implements OnInit, OnDestroy {
  spellList: Spell[];
  spell = new Spell();
  classSub: Subscription;
  classes: CharacterClass[];

  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private utilityService: UtilityService,
    private classService: CharacterClassService,
    private spellService: SpellService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.spellService.get(this.id)
      .valueChanges().pipe(take(1)).subscribe(p => this.spell = p as Spell);
    }
  }

  toTitleCase(string: String) {
    return this.utilityService.toTitleCase(string);
  }

  save(spell: Spell) {
    if (this.id) {
      this.spellService.update(this.id, spell);
    } else {
      this.spellService.create(spell);
    }
    this.router.navigate(['/admin/spells']);
  }

  cancel() {
    this.router.navigate(['/admin/spells']);
  }

  delete() {
    if (confirm('Are you sure you wish to delete this spell?')) {
      this.spellService.remove(this.id);
      this.router.navigate(['/admin/spells']);
    }
  }

  async ngOnInit() {


    this.classSub = this.classService.getAll()
    .subscribe(classes => {
      this.classes = classes;
    });

  }

  ngOnDestroy() {
    this.classSub.unsubscribe();
  }

}
