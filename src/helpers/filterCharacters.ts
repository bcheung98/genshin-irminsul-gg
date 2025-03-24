import { Character } from "types/character";
import { CharacterFilterState } from "reducers/characterFilters";
import { BrowserSettings } from "reducers/browser";
import { createDateObject } from "./dates";
import { sortBy } from "./utils";

export function filterCharacters(
    characters: Character[],
    filters: CharacterFilterState,
    searchValue: string,
    sortSettings: BrowserSettings
) {
    let chars = [...characters];
    if (filters.element.length > 0) {
        chars = chars.filter((char) => filters.element.includes(char.element));
    }
    if (filters.weapon.length > 0) {
        chars = chars.filter((char) => filters.weapon.includes(char.weapon));
    }
    if (filters.rarity.length > 0) {
        chars = chars.filter((char) => filters.rarity.includes(char.rarity));
    }
    if (filters.ascStat.length > 0) {
        chars = chars.filter((char) =>
            filters.ascStat.includes(char.stats.ascensionStat)
        );
    }
    if (filters.talentBook.length > 0) {
        chars = chars.filter((char) =>
            filters.talentBook.includes(char.materials.talentBook)
        );
    }
    if (filters.commonMat.length > 0) {
        chars = chars.filter((char) =>
            filters.commonMat.includes(char.materials.commonMat)
        );
    }
    if (filters.bossMat.length > 0) {
        chars = chars.filter((char) =>
            filters.bossMat.includes(char.materials.bossMat)
        );
    }
    if (filters.weeklyBossMat.length > 0) {
        chars = chars.filter((char) =>
            filters.weeklyBossMat.includes(char.materials.weeklyBossMat)
        );
    }
    if (filters.localMat.length > 0) {
        chars = chars.filter((char) =>
            filters.localMat.includes(char.materials.localMat)
        );
    }
    if (filters.nation.length > 0) {
        chars = chars.filter((char) => filters.nation.includes(char.nation));
    }
    if (filters.gender.length > 0) {
        chars = chars.filter((char) => filters.gender.includes(char.gender));
    }
    if (searchValue !== "") {
        chars = chars.filter(
            (char) =>
                char.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                char.displayName
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) ||
                char.fullName.toLowerCase().includes(searchValue.toLowerCase())
        );
    }

    const reverse = sortSettings.sortDirection === "desc";

    switch (sortSettings.sortBy) {
        case "name":
            chars = chars.sort((a, b) => a.fullName.localeCompare(b.fullName));
            if (reverse) {
                chars = chars.reverse();
            }
            break;
        case "rarity":
            chars = chars.sort(
                (a, b) =>
                    sortBy(a.rarity, b.rarity, reverse) ||
                    a.fullName.localeCompare(b.fullName)
            );
            break;
        case "element":
            chars = chars.sort(
                (a, b) =>
                    sortBy(b.element, a.element, reverse) ||
                    a.fullName.localeCompare(b.fullName)
            );
            break;
        case "weapon":
            chars = chars.sort(
                (a, b) =>
                    sortBy(b.weapon, a.weapon, reverse) ||
                    a.fullName.localeCompare(b.fullName)
            );
            break;
        case "release":
            chars = chars.sort(
                (a, b) =>
                    sortBy(
                        createDateObject({
                            date: a.release.date,
                        }).obj.getTime(),
                        createDateObject({
                            date: b.release.date,
                        }).obj.getTime(),
                        reverse
                    ) || sortBy(b.fullName, a.fullName, !reverse)
            );
            break;
    }

    return chars;
}
