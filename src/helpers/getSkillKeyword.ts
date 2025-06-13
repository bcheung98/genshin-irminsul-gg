import { WeaponType } from "types/_common";
import {
    Character,
    CharacterPassive,
    CharacterSkillKey,
} from "types/character";
import { SkillKeyword, SkillWithScaling } from "types/skill";

interface GetSkillKeywordProps {
    tag: any;
    character: Character;
}

export function getSkillKeyword({ tag, character }: GetSkillKeywordProps) {
    const { name, weapon, skills, passives } = character;
    const keywords = character.keywords || [];
    let keyword: SkillKeyword | undefined;
    if (tag.startsWith("_")) {
        const [_, talentKey] = tag.split("_");
        let skill: SkillWithScaling | CharacterPassive | undefined;
        let type: "combat" | "passive";
        if (["a1", "a4", "util", "nightsoul"].includes(talentKey)) {
            type = "passive";
            skill = passives.find((passive) => passive.type === talentKey);
        } else {
            type = "combat";
            skill = skills[talentKey as CharacterSkillKey];
        }
        if (skill) {
            keyword = {
                tag: tag,
                type: type,
                name: skill.name,
                talentKey: talentKey,
                icon: `${getSkillIcon(talentKey, name, weapon)}`,
                description: skill.description,
            };
        }
    } else {
        keyword = keywords.find((key) => key.tag === tag);
    }
    return keyword;
}

function getSkillIcon(
    key: CharacterSkillKey,
    name: string,
    weapon: WeaponType
) {
    let src: string;
    if (key === "attack") {
        src = `weapons/icons/${weapon.toLowerCase()}}`;
    } else if (["a1", "a4", "util", "nightsoul"].includes(key)) {
        src = `characters/talents/${name.toLowerCase()}_${key}passive`;
    } else {
        src = `characters/talents/${name.toLowerCase()}_${key}`;
    }
    return src;
}
