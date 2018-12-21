import { CharacterClass } from './class';

export interface SpellData {
    key: number;
    active: boolean;
    name: string;
    points: number;
    npoints: number;
    level: number;
    class: CharacterClass[];
    location: string;
    description: string;
}

export class Spell implements SpellData {
    key = null;
    active = true;
    name = '';
    points = 0;
    npoints = 0;
    level = 0;
    class = [];
    location = '';
    description = '';
}
