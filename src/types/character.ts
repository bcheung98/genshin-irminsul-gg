import { CharacterAscensionStat } from "data/characterAscensionStats";
import { Rarity, Element, WeaponType, Nation, Arkhe } from "./_common";
import { CharacterMaterials } from "./materials";
import { SkillWithScaling, Skill, SkillKeyword } from "./skill";
import { VersionWithDate } from "./version";

export interface CharacterProps {
    character: Character;
}

export interface Character {
    id: number;
    name: string;
    displayName: string;
    fullName: string;
    title: string;
    rarity: Rarity;
    element: Element;
    arkhe?: Arkhe;
    weapon: WeaponType;
    skills: CharacterSkills;
    passives: CharacterPassive[];
    constellation: CharacterConstellations;
    keywords?: SkillKeyword[];
    stats: CharacterStats;
    materials: CharacterMaterials;
    description: string;
    birthday: string;
    gender: "Male" | "Female";
    nation: Nation;
    outfits: CharacterOutfit[];
    voiceActors: {
        en: string;
        jp: string;
    };
    release: VersionWithDate;
}

export type CharacterSkillKey = keyof CharacterSkills;
export interface CharacterSkills {
    attack: SkillWithScaling;
    skill: SkillWithScaling;
    burst: SkillWithScaling;
    altsprint?: SkillWithScaling;
}

export type CharacterPassiveType = "a1" | "a4" | "util" | "nightsoul" | "";
export interface CharacterPassive extends Skill {
    type: CharacterPassiveType;
}

export type CharacterConstellationKey = Exclude<
    keyof CharacterConstellations,
    "name"
>;
export interface CharacterConstellations {
    name: string;
    c1: Skill;
    c2: Skill;
    c3: Skill;
    c4: Skill;
    c5: Skill;
    c6: Skill;
}

export interface CharacterStats {
    ascensionStat: CharacterAscensionStat;
    hp: number[];
    atk: number[];
    def: number[];
}

export interface CharacterOutfit {
    name: string;
    displayName?: string;
    rarity: Rarity;
    description: string;
}
