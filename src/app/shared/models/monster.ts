export interface MonsterData {
    key: string;
    name: string;
    active: boolean;
    cost: number;
    actions: {
        attack_number: number,
        multiattack: boolean,
        primary: string,
        secondary: string,
        offhand: string
    };
    alignment: string;
    armor_class: number;
    challenge_rating: number;
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
    level: number;
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

export class Monster implements MonsterData {
    user = null; // placeholder for undead
    base = null; // placeholder for undead
    key = null;
    name = '';
    active = true;
    cost = 0;
    actions = {
        attack_number: 0,
        multiattack: false,
        primary: '',
        secondary: '',
        offhand: ''
    };
    alignment = 'chaotic_evil';
    armor_class = 10;
    challenge_rating = 0;
    strength = 8;
    dexterity = 8;
    constitution = 8;
    intelligence = 8;
    wisdom = 8;
    charisma = 8;
    hit_dice_size = 8;
    hit_dice_qty = 1;
    condition_modifiers = {
        blinded: 0,
        charmed: 0,
        deafened: 0,
        exhaustion: 0,
        fatigued: 0,
        frightened: 0,
        grappled: 0,
        incapacitated: 0,
        paralyzed: 0,
        petrified: 0,
        poisoned: 0,
        prone: 0,
        restrained: 0,
        stunned: 0,
        unconcious: 0
    };
    damage_modifiers = {
        acid: 0,
        bludgeoning: 0,
        cold: 0,
        fire: 0,
        force: 0,
        lightning: 0,
        necrotic: 0,
        psychic: 0,
        piercing: 0,
        poison: 0,
        radiant: 0,
        slashing: 0,
        thunder: 0
    };
    elemental = {
        acidic: 0,
        electric: 0,
        flaming: 0,
        freezing: 0,
        necrotic: 0,
        venomous: 0
    };
    languages = [];
    level: 5;
    legendary_actions = [];
    perception = 0;
    proficiency = 2;
    senses = {
        darkvision: 0,
        blindsight: 0,
        tremorsense: 0,
        truesight: 0
    };
    saves = {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0
    };
    size = 'medium';
    skills = {
        athletics: 0,
        acrobatics: 0,
        sleight_of_hand: 0,
        stealth: 0,
        arcana: 0,
        history: 0,
        investigation: 0,
        nature: 0,
        religion: 0,
        animal_handling: 0,
        insight: 0,
        medicine: 0,
        perception: 0,
        survival: 0,
        deception: 0,
        intimidation: 0,
        performance: 0,
        persuasion: 0
    };
    special_abilities = [];
    speed = {
        base: 0,
        fly: 0,
        hover: false,
        swim: 0,
        climb: 0,
        burrow: 0
    };
    subtype = [];
    type = 'undead';
}
