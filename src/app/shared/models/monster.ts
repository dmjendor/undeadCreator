export interface Monster {
    user: string; // placeholder for undead
    key: string;
    name: string;
    active: boolean;
    cost: number;
    actions: any[];
    alignment: string;
    armor_class: string;
    challenge_rating: string;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    hit_dice: string;
    hit_dice_size: number;
    hit_dice_qty: number;
    hit_points: number;
    condition_immunities: any[];
    damage_immunities: any[];
    damage_resistances: any[];
    damage_vulnerabilities: any[];
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
