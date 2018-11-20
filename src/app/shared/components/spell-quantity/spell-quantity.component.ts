import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'spell-quantity',
  templateUrl: './spell-quantity.component.html',
  styleUrls: ['./spell-quantity.component.css']
})
export class SpellQuantityComponent {
  @Output('optvalChange') emitter1: EventEmitter<number> = new EventEmitter<number>();
  @Output('totalcostChange') emitter2: EventEmitter<number> = new EventEmitter<number>();
  @Input('baseval') set setBaseVal(value) {
    this.base = value;
  }
  @Input('optval') set setOptValue(value) {
    this.count = value;
  }
  @Input('pointval') set setPointValue(value) {
      this.points = value;
  }
  @Input('npointval') set setNpointValue(value) {
      this.npoints = value;
  }
  @Input('totalcost') set setTotalCostValue(value) {
    this.totalcost = value;
  }
  @Input('necromancer') set setNecromancerValue(value) {
    this.necromancer = value;
  }

  base = 0;
  count = 0;
  points = 0;
  npoints = 0;
  totalcost = 0;
  necromancer = false;

  increment() {
    this.count++;
    this.totalcost -= this.necromancer ? this.npoints : this.points;
    this.emitter1.emit(this.count);
    this.emitter2.emit(this.totalcost);
  }

  decrement() {
    if (this.count > this.base) {
      this.count--;
      this.totalcost += this.necromancer ? this.npoints : this.points;
      this.emitter1.emit(this.count);
      this.emitter2.emit(this.totalcost);
    }
  }

  onChange() {
    this.emitter2.emit(this.totalcost);
    this.emitter1.emit(this.count);
  }

}
