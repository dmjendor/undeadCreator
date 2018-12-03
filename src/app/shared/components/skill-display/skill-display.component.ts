import { Component, Input } from '@angular/core';


@Component({
  selector: 'skill-display',
  templateUrl: './skill-display.component.html',
  styleUrls: ['./skill-display.component.css']
})
export class SkillDisplayComponent {

  @Input('name') name;

  @Input('skill') skill;

  @Input('statMod') set setStatMod(value) {
    this.statMod = parseInt(value, 10);
  }

  @Input('prof') set setProf(value) {
    this.profMod = this.skill === 2 ? value * 2 : value;
  }

  statMod = 0;
  profMod = 0;

  constructor() {

   }
}
