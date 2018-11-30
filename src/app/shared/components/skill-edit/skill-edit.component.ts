import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'skill-edit',
  templateUrl: './skill-edit.component.html',
  styleUrls: ['./skill-edit.component.css']
})
export class SkillEditComponent {
  @Input() name: string;
  @Input() skill: number;
  @Output('skillChange') emitter1: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  onChange() {
    this.emitter1.emit(this.skill);
  }

}
