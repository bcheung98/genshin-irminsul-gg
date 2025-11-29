import { WeaponType } from "types/_common";
import {
    Character,
    CharacterConstellations,
    CharacterPassive,
    CharacterSkillKey,
} from "types/character";
import { SkillKeyword, SkillWithScaling } from "types/skill";

interface GetSkillKeywordProps {
    tag: any;
    character: Character;
    buffValue?: string;
}

export function getSkillKeyword({
    tag,
    character,
    buffValue,
}: GetSkillKeywordProps) {
    const { name, weapon, skills, passives, constellation } = character;
    const keywords = character.keywords || [];
    let keyword: SkillKeyword | undefined;
    if (tag.startsWith("_")) {
        const [_, talentKey] = tag.split("_");
        let skill:
            | SkillWithScaling
            | CharacterPassive
            | CharacterConstellations
            | undefined;
        let type: "combat" | "passive";
        if (["a1", "a4", "util", "nightsoul", "special"].includes(talentKey)) {
            type = "passive";
            if (buffValue !== "v1") {
                skill =
                    passives.find(
                        (passive) =>
                            passive.version?.value === buffValue &&
                            passive.type === talentKey
                    ) || passives.find((passive) => passive.type === talentKey);
            } else {
                skill = passives.find((passive) => passive.type === talentKey);
            }
        } else if (["c1", "c2", "c3", "c4", "c5", "c6"].includes(talentKey)) {
            type = "passive";
            const index = Number(talentKey.slice(1));
            if (buffValue !== "v1") {
                skill =
                    constellation.find(
                        (con) =>
                            con.version?.value === buffValue &&
                            con.index === index
                    ) || constellation.find((con) => con.index === index);
            } else {
                skill = constellation.find((con) => con.index === index)!;
            }
        } else {
            type = "combat";
            if (buffValue !== "v1") {
                skill = skills[talentKey as CharacterSkillKey]!.filter(
                    (skill) => skill.version?.value === buffValue
                )[0];
            } else {
                skill = skills[talentKey as CharacterSkillKey]![0];
            }
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
    } else if (["a1", "a4", "util", "nightsoul", "special"].includes(key)) {
        src = `characters/talents/${name.toLowerCase()}_${key}passive`;
    } else if (["c1", "c2", "c3", "c4", "c5", "c6"].includes(key)) {
        src = `characters/constellations/${name.toLowerCase()}_${key}`;
    } else {
        src = `characters/talents/${name.toLowerCase()}_${key}`;
    }
    return src;
}
