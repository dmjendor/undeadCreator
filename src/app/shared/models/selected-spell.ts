export interface SelectedSpellData {
    key: number;
    points: number;
    count: number;
}

export class SelectedSpell implements SelectedSpellData {
    key =  null;
    points = 0;
    count = 0;
}
