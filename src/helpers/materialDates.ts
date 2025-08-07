import { talentMaterials } from "data/materials/talentMaterials";
import { weaponAscensionMaterials } from "data/materials/weaponAscensionMaterials";
import { Material } from "types/materials";
import { getMaterialKeyNames } from "./materials";

export const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
] as const;

export type Weekday = (typeof weekdays)[number];

export const dropDates = ["Mon/Thu", "Tue/Fri", "Wed/Sat"];

export function materialDates(day: Weekday, showUnreleased = false) {
    switch (day) {
        case "Monday":
        case "Thursday":
            return {
                characters: getMaterials(talentMaterials, 0, showUnreleased),
                weapons: getMaterials(
                    weaponAscensionMaterials,
                    0,
                    showUnreleased
                ),
            };
        case "Tuesday":
        case "Friday":
            return {
                characters: getMaterials(talentMaterials, 1, showUnreleased),
                weapons: getMaterials(
                    weaponAscensionMaterials,
                    1,
                    showUnreleased
                ),
            };
        case "Wednesday":
        case "Saturday":
            return {
                characters: getMaterials(talentMaterials, 2, showUnreleased),
                weapons: getMaterials(
                    weaponAscensionMaterials,
                    2,
                    showUnreleased
                ),
            };
        default:
            return {
                characters: getMaterialKeyNames(
                    [...talentMaterials],
                    showUnreleased
                ),
                weapons: getMaterialKeyNames(
                    [...weaponAscensionMaterials],
                    showUnreleased
                ),
            };
    }
}

export function getMaterials(
    arr: readonly Material[],
    index: number,
    showUnreleased: boolean
) {
    const materials = arr.filter((mat) => mat.source === dropDates[index]);
    return getMaterialKeyNames(materials, showUnreleased);
}
