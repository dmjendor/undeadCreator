export interface CharacterClassData {
    key: string;
    active: boolean;
    name: string;
}

export class CharacterClass implements CharacterClassData {
    key = null;
    active = true;
    name = '';
}
