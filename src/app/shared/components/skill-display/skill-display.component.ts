import { Component, Input, OnInit } from '@angular/core';
import { CardService } from 'shared/services/card.service';
import { Monster } from 'shared/models/monster';


@Component({
  selector: 'skill-display',
  templateUrl: './skill-display.component.html',
  styleUrls: ['./skill-display.component.css']
})
export class SkillDisplayComponent implements OnInit {
  @Input('name') name: string;
  @Input('skill') skill: number;
  @Input('monster') monster: Monster;
  constructor( private cardService: CardService) {}
  statMod = 0;
  profMod = 0;

  ngOnInit() {
    let stat;
    this.profMod = this.skill === 2 ? this.monster.proficiency * 2 : this.monster.proficiency;
    console.log(this.name);
    switch (this.name) {
      case 'athletics':
        stat = this.cardService.modifier(this.monster.strength);
      break;
      case 'acrobatics':
      case 'sleight_of_hand':
      case 'stealth':
        stat = this.cardService.modifier(this.monster.dexterity);
      break;
      case 'arcana':
      case 'history':
      case 'investigation':
      case 'nature':
      case 'religion':
        stat = this.cardService.modifier(this.monster.intelligence);
      break;
      case 'animal_handling':
      case 'insight':
      case 'medicine':
      case 'perception':
      case 'survival':
        stat = this.cardService.modifier(this.monster.wisdom);
      break;
      case 'deception':
      case 'intimidation':
      case 'performance':
      case 'persuasion':
        stat = this.cardService.modifier(this.monster.charisma);
      break;
    }
    this.statMod = parseInt(stat, 10);
  }
}
