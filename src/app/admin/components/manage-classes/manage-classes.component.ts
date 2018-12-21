import { Component, OnInit, OnDestroy } from '@angular/core';
import { CharacterClassService } from 'shared/services/class.service';
import { Router } from '@angular/router';
import { CharacterClass } from 'shared/models/class';
import { Subscription } from 'rxjs';

@Component({
  selector: 'manage-classes',
  templateUrl: './manage-classes.component.html',
  styleUrls: ['./manage-classes.component.css']
})
export class ManageClassesComponent implements OnInit, OnDestroy {
  classes: CharacterClass[];
  classSub: Subscription;
  selected: any[];
  selectedCharacterClass: CharacterClass;
  columns = [
    { prop: 'name', name: 'Name' },
    { name: 'Active' }
  ];

  constructor(
    private classService: CharacterClassService,
    private router: Router
    ) {

    }

  createCharacterClass() {
    this.router.navigate(['/admin/classes/new']);
  }

  editCharacterClass() {
    localStorage.setItem('returnUrl', '/admin/classes');
    this.router.navigate(['/admin/classes/' + this.selectedCharacterClass.key]);
  }

  deleteCharacterClass() {
    this.classService.remove(this.selectedCharacterClass.key);
  }

  onSelect({ selected }) {
    this.selectedCharacterClass = this.selected[0];
  }

  onActivate(event) {
    // console.log('Activate Event', event);
  }

  filter(query: string) {
     const filteredProducts = (query) ?
      this.classes.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      this.classes;
    // this.initializeTable(filteredProducts);

  }

  reloadItems(params) {

  }

  async ngOnInit() {

    this.classSub = this.classService.getAll()
    .subscribe(cls => {
      this.classes = cls as CharacterClass[];
      this.selected = [this.classes[0]];
      this.selectedCharacterClass = this.classes[0];
    });
  }

  ngOnDestroy() {
    this.classSub.unsubscribe();
  }

}
