
export interface Undead {
    key: string;
    user: string;
    name: string;
    cost: number;
    actions: {
        attack_number: number,
        multiattack: boolean,
        primary: string,
        secondary: string
    };
    alignment: string;
    armor_class: string;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    hit_dice_size: number;
    hit_dice_qty: number;
    condition_modifiers: {
        blinded: number;
        charmed: number;
        deafened: number;
        exhaustion: number;
        fatigued: number;
        frightened: number;
        grappled: number;
        incapacitated: number;
        paralyzed: number;
        petrified: number;
        poisoned: number;
        prone: number;
        restrained: number;
        stunned: number;
        unconcious: number;
    };
    damage_modifiers: {
        acid: number;
        bludgeoning: number;
        cold: number;
        fire: number;
        force: number;
        lightning: number;
        necrotic: number;
        piercing: number;
        poison: number;
        radiant: number;
        slashing: number;
        thunder: number;
    };
    elemental: {
        acidic: number,
        electric: number,
        flaming: number,
        freezing: number,
        necrotic: number,
        venomous: number
    };
    languages: any[];
    legendary_actions: any[];
    perception: number;
    proficiency: number;
    senses: {
        darkvision: number,
        blindsight: number,
        tremorsense: number,
        truesight: number
    };
    saves: {
        strength: number,
        dexterity: number,
        constitution: number,
        intelligence: number,
        wisdom: number,
        charisma: number
    };
    size: string;
    skills: {
        athletics: number,
        acrobatics: number,
        sleight_of_hand: number,
        stealth: number,
        arcana: number,
        history: number,
        investigation: number,
        nature: number,
        religion: number,
        animal_handling: number,
        insight: number,
        medicine: number,
        perception: number,
        survival: number,
        deception: number,
        intimidation: number,
        performance: number,
        persuasion: number
    };
    special_abilities: any[];
    speed: {
        base: number,
        fly: number,
        hover: boolean,
        swim: number,
        climb: number,
        burrow: number
    };
    subtype: any[];
    type: string;
}
