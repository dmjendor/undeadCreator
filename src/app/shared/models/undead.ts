
export interface Undead {
    user: string;
    name: string;
    cost: number;
    actions: any[];
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
    condition_immunities: any[];
    damage_immunities: any[];
    damage_resistances: any[];
    damage_vulnerabilities: any[];
    languages: any[];
    legendary_actions: any[];
    perception: number;
    proficiency: number;
    senses: any[];
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
        strength: {
            athletics: number
        },
        dexterity: {
            acrobatics: number,
            sleight_of_hand: number,
            stealth: number
        },
        intelligence: {
            arcana: number,
            history: number,
            investigation: number,
            nature: number,
            religion: number
        },
        wisdom: {
            animal_handling: number,
            insight: number,
            medicine: number,
            perception: number,
            survival: number
        },
        charisma: {
            deception: number,
            intimidation: number,
            performance: number,
            persuasion: number,
        }
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
