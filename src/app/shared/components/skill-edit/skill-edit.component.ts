import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'skill-edit',
  templateUrl: './skill-edit.component.html',
  styleUrls: ['./skill-edit.component.css']
})
export class SkillEditComponent {

  @Output('skillChange') emitter1: EventEmitter<number> = new EventEmitter<number>();
  @Output('totalCostChange') emitter2: EventEmitter<number> = new EventEmitter<number>();
  @Input('name') set setName(value) {
    this.name = value;
  }
  @Input('skill') set setSkill(value) {
    this.skill = value;
  }

  @Input('base') set setBase(value) {
    this.base = value;
  }

  @Input('totalCost') set setTotalCost(value) {
    this.totalCost = value;
  }

  name = '';
  base = 0;
  skill = 0;
  totalCost = 0;

  constructor() {}

  resetCost() {
    this.totalCost -=  (0.25 * this.skill);
    this.emitter2.emit(this.totalCost);
  }

  onChange() {
    document.getElementById(this.name).blur();
    this.totalCost += (0.25 * this.skill);
    this.emitter1.emit(this.skill);
    this.emitter2.emit(this.totalCost);
  }

}
