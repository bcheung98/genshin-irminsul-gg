import {
    tcgWeaponTypes,
    tcgFactions,
    tcgActionCardTypes,
    tcgActionCardSubTypes,
} from "data/tcg/tcg";
import { Arkhe, Element, WeaponType } from "./_common";
import { Skill } from "./skill";
import { Version } from "./version";

export type TCGWeaponType = (typeof tcgWeaponTypes)[number];
export type TCGFaction = (typeof tcgFactions)[number];
export type TCGActionCardType = (typeof tcgActionCardTypes)[number];
export type TCGActionCardSubType = (typeof tcgActionCardSubTypes)[number];

export type TCGCardType = "character" | "action";

export interface TCGCardProps {
    card: TCGCharacterCard | TCGActionCard;
}

export interface TCGCard {
    id: number;
    name: string;
    displayName: string;
    splash: {
        title: string;
        description: string;
    };
    release: Version;
    sortOrder: number;
}

export interface TCGCharacterCard extends TCGCard {
    fullName: string;
    element: Element;
    weaponType: TCGWeaponType;
    factions: TCGFaction[];
    arkhe?: Arkhe;
    hp: number;
    talents: TCGTalents;
    keywords: TCGKeyword[];
}

export interface TCGActionCard extends TCGCard {
    type: TCGActionCardType;
    subType: TCGActionCardSubType;
    weaponType?: WeaponType;
    combatAction?: boolean;
    character?: string;
    cost: string;
    description: string;
}

export interface TCGSkill extends Skill {
    cost?: string;
    energy?: number;
}

export interface TCGTalents {
    attack: TCGSkill;
    attack2?: TCGSkill;
    skill: TCGSkill;
    skill2: TCGSkill;
    burst: TCGSkill;
    burst2: TCGSkill;
    passive?: TCGSkill;
    passive2?: TCGSkill;
}

export interface TCGKeyword extends TCGSkill {
    tag: string;
    type?: string;
    subType?: TCGActionCardSubType;
    combatAction?: boolean;
    icon?: string;
    img?: string;
}

export interface TCGDeck {
    name: string;
    characterCards: TCGCharacterCard[];
    actionCards: TCGActionCard[];
}
