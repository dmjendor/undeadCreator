import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Monster } from 'shared/models/monster';
import { Subscription } from 'rxjs';
import { Modifier } from 'shared/models/modifier';
import { ModifierService } from 'shared/services/modifier.service';

@Component({
  selector: 'app-skill-panel',
  templateUrl: './skill-panel.component.html',
  styleUrls: ['./skill-panel.component.css']
})
export class SkillPanelComponent implements OnInit, OnDestroy {
  @Input('monster') set setMonster(value) {
    this.monster = value;
  }
  constructor(
    private modifierService: ModifierService
  ) { }
  monster: Monster;
  modifierSub: Subscription;
  modifiers: Modifier[];

  async ngOnInit() {
    this.modifierSub = this.modifierService.getModiferOfType('skill')
    .subscribe(mod => {
      this.modifiers = mod as Modifier[];
    });
  }

  ngOnDestroy() {

  }

}
