import { CharacterPassiveType, CharacterSkillKey } from "./character";

export interface Skill {
    name: string;
    description: string;
    splash?: string;
    version?: {
        value: string;
        label: string;
    };
}

export interface SkillWithScaling extends Skill {
    scaling: string[][];
}

export interface SkillKeyword {
    tag: string;
    name?: string;
    type?: "combat" | "passive" | "other";
    talentKey?: CharacterSkillKey | CharacterPassiveType;
    icon?: string;
    description: string;
}
