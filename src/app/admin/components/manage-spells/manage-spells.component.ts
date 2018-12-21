import { Component, OnInit, OnDestroy } from '@angular/core';
import { Spell } from 'shared/models/spell';
import { Subscription } from 'rxjs';
import { SpellService } from 'shared/services/spell.service';
import { Router } from '@angular/router';

@Component({
  selector: 'manage-spells',
  templateUrl: './manage-spells.component.html',
  styleUrls: ['./manage-spells.component.css']
})
export class ManageSpellsComponent implements OnInit, OnDestroy {
  spells: Spell[];
  spellSub: Subscription;
  selected: any[];
  selectedSpell: Spell;
  columns = [
    { prop: 'name', name: 'Name' },
    { name: 'Cost' },
    { name: 'Owner' }
  ];

  constructor(
    private spellService: SpellService,
    private router: Router
    ) {

    }

  createSpell() {
    this.router.navigate(['/admin/spells/new']);
  }

  editSpell() {
    localStorage.setItem('returnUrl', '/admin/spells');
    this.router.navigate(['/admin/spells/' + this.selectedSpell.key]);
  }

  deleteSpell() {
    this.spellService.remove(this.selectedSpell.key);
  }

  onSelect({ selected }) {
    this.selectedSpell = this.selected[0];
  }

  onActivate(event) {
    // console.log('Activate Event', event);
  }

  filter(query: string) {
     const filteredProducts = (query) ?
      this.spells.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      this.spells;
  }

  reloadItems(params) {

  }

  async ngOnInit() {

    this.spellSub = this.spellService.getAll()
    .subscribe(spell => {
      this.spells = spell as Spell[];
      this.selected = [this.spells[0]];
      this.selectedSpell = this.spells[0];
    });
  }

  ngOnDestroy() {
    this.spellSub.unsubscribe();
  }

}
