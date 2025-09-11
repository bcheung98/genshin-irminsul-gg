import { objectKeys } from "./utils";
import { formatMaterialName } from "./materials";
import {
    getCharacterXPMaterial,
    getWeaponXPMaterial,
} from "data/materials/xpMaterials";
import { getBossMaterial } from "data/materials/bossMaterials";
import { getWeeklyBossMaterial } from "data/materials/weeklyBossMaterials";
import { getGemstone } from "data/materials/gemstones";
import { getLocalMaterial } from "data/materials/localMaterials";
import { getTalentMaterial } from "data/materials/talentMaterials";
import { getCommonMaterial } from "data/materials/commonMaterials";
import { getEliteMaterial } from "data/materials/eliteMaterials";
import { getWeaponAscensionMaterial } from "data/materials/weaponAscensionMaterials";
import { Rarity } from "types/_common";
import {
    CharacterCost,
    TotalCostObject,
    TotalCostObjectKeys,
} from "types/costs";
import { Material } from "types/materials";

export interface MaterialCostData {
    name: string;
    rarity: Rarity;
    cost: number;
    img: string;
}

export function createMaterialCostData(costs: TotalCostObject) {
    const materials: MaterialCostData[] = [];
    const costArray: number[] = [];
    objectKeys(costs).forEach((material) => {
        objectKeys(costs[material]).forEach((mat) => {
            costArray.push(costs[material][mat]);
            const { name, rarity, img } = getMaterialData(material, mat);
            costs[material][mat] &&
                materials.push({
                    name: name,
                    rarity: rarity as Rarity,
                    cost: costs[material][mat],
                    img: img,
                });
        });
    });
    return materials;
}

function getMaterialData(
    key: TotalCostObjectKeys,
    material = ""
): { name: string; rarity?: Rarity; img: string } {
    let mat: Material | undefined;
    switch (key) {
        case "credits":
            return { name: "Mora", rarity: 3, img: "Mora" };
        case "characterXP":
            mat = getCharacterXPMaterial({ tag: material, id: material })!;
            return {
                name: mat.displayName,
                rarity: mat.rarity,
                img: `xp/${mat.tag}`,
            };
        case "weaponXP":
            mat = getWeaponXPMaterial({ tag: material, id: material })!;
            return {
                name: mat.displayName,
                rarity: mat.rarity,
                img: `xp/${mat.tag}`,
            };
        case "bossMat":
            mat = getBossMaterial({ tag: material, id: material })!;
            return {
                name: formatMaterialName(mat),
                rarity: mat.rarity,
                img: `boss/${mat.tag}`,
            };
        case "weeklyBossMat":
            mat = getWeeklyBossMaterial({ tag: material, id: material })!;
            return {
                name: formatMaterialName(mat),
                rarity: mat.rarity,
                img: `weekly/${mat.tag}`,
            };
        case "crown":
            return {
                name: "Crown of Insight",
                rarity: 5,
                img: "Crown of Insight",
            };
        case "gemstone":
            mat = getGemstone({ tag: material, id: material })!;
            return {
                name: formatMaterialName(mat),
                rarity: mat.rarity,
                img: `gemstone/${mat.tag}`,
            };
        case "localMat":
            mat = getLocalMaterial({ tag: material, id: material })!;
            return {
                name: mat?.displayName || "",
                rarity: mat.rarity,
                img: `local/${mat.tag}`,
            };
        case "talentBook":
            mat = getTalentMaterial({ tag: material, id: material })!;
            return {
                name: formatMaterialName(mat),
                rarity: mat.rarity,
                img: `talent/${mat.tag}`,
            };
        case "commonMat":
            mat = getCommonMaterial({ tag: material, id: material })!;
            return {
                name: formatMaterialName(mat),
                rarity: mat.rarity,
                img: `common/${mat.tag}`,
            };
        case "weaponAscensionMat":
            mat = getWeaponAscensionMaterial({ tag: material, id: material })!;
            return {
                name: formatMaterialName(mat),
                rarity: mat.rarity,
                img: `weapon/${mat.tag}`,
            };
        case "eliteMat":
            mat = getEliteMaterial({ tag: material, id: material })!;
            return {
                name: formatMaterialName(mat),
                rarity: mat.rarity,
                img: `elite/${mat.tag}`,
            };
    }
}

export function reduceMaterialCosts(costs: CharacterCost) {
    const result = {
        credits: {
            Credit: 0,
        },
        characterXP: {
            CharacterXP1: 0,
            CharacterXP2: 0,
            CharacterXP3: 0,
        },
        weaponXP: {
            WeaponXP1: 0,
            WeaponXP2: 0,
            WeaponXP3: 0,
        },
        bossMat: {},
        weeklyBossMat: {},
        crown: {
            Crown: 0,
        },
        gemstone: {},
        localMat: {},
        talentBook: {},
        commonMat: {},
    } as TotalCostObject;
    objectKeys(costs).forEach((material) => {
        objectKeys(costs[material]).forEach((mat) => {
            (result[material][mat] as number) = (
                costs[material][mat] as number[]
            ).reduce((a, c) => a + c);
        });
    });
    return result;
}
