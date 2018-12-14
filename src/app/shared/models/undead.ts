import { Monster, MonsterData } from './monster';

interface UndeadInterface extends MonsterData {
    base: string;
    user: string;
    owner: string; // for display only
}

export class Undead  extends Monster implements UndeadInterface {
    base: string;
    user: string;
    owner: string;
}
