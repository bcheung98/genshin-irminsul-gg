import { Weapon } from "types/weapon";
import { WeaponFilterState } from "reducers/weaponFilters";
import { BrowserSettings } from "reducers/browser";
import { sortBy } from "./utils";

export function filterWeapons(
    weapons: Weapon[],
    filters: WeaponFilterState,
    searchValue: string,
    sortSettings: BrowserSettings
) {
    let weps = [...weapons];
    if (filters.weaponType.length > 0) {
        weps = weps.filter((weapon) =>
            filters.weaponType.includes(weapon.type)
        );
    }
    if (filters.rarity.length > 0) {
        weps = weps.filter((weapon) => filters.rarity.includes(weapon.rarity));
    }
    if (filters.substats.length > 0) {
        weps = weps.filter((weapon) =>
            filters.substats.includes(weapon.stats.subStat)
        );
    }
    if (filters.ascensionMat.length > 0) {
        weps = weps.filter((weapon) =>
            filters.ascensionMat.includes(weapon.materials.weaponAscensionMat)
        );
    }
    if (filters.eliteMat.length > 0) {
        weps = weps.filter((weapon) =>
            filters.eliteMat.includes(weapon.materials.eliteMat)
        );
    }
    if (filters.commonMat.length > 0) {
        weps = weps.filter((weapon) =>
            filters.commonMat.includes(weapon.materials.commonMat)
        );
    }
    if (searchValue !== "") {
        weps = weps.filter(
            (wep) =>
                wep.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                wep.displayName
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
        );
    }

    const reverse = sortSettings.sortDirection === "desc";

    switch (sortSettings.sortBy) {
        case "name":
            weps = weps.sort((a, b) =>
                a.displayName.localeCompare(b.displayName)
            );
            if (reverse) {
                weps = weps.reverse();
            }
            break;
        case "rarity":
            weps = weps.sort(
                (a, b) =>
                    sortBy(a.rarity, b.rarity, reverse) ||
                    a.displayName.localeCompare(b.displayName)
            );
            break;
        case "weapon":
            weps = weps.sort(
                (a, b) =>
                    sortBy(b.type, a.type, reverse) ||
                    a.displayName.localeCompare(b.displayName)
            );
            break;
        case "release":
            weps = weps.sort(
                (a, b) =>
                    sortBy(a.id, b.id, reverse) ||
                    b.displayName.localeCompare(a.displayName)
            );
            break;
        case "element":
            break;
    }

    return weps;
}
