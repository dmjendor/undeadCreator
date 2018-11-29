export interface Weapon {
    name: string;
    damage: damageType;
    type: weaponType;
    light: boolean;
    tiny: string;
    small: string;
    medium: string;
    large: string;
    huge: string;
}

enum damageType {
    bludgeoning = 'Bludgeoning',
    piercing = 'Piercing',
    slashing = 'Slashing'
}

enum weaponType {
    melee = 'Melee',
    finesse = 'Finesse',
    ranged = 'Ranged'
}
