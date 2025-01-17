import { Rarity } from "types/_common";

export const characterLevel = {
    credits: [
        0, 24200, 20000, 115800, 40000, 116000, 60000, 171000, 80000, 239200,
        100000, 322400, 120000, 684800,
    ],
    characterXP1: [0, 1, 0, 4, 0, 0, 0, 0, 0, 1, 0, 2, 0, 4],
    characterXP2: [0, 0, 0, 3, 0, 0, 0, 3, 0, 3, 0, 2, 0, 0],
    characterXP3: [0, 6, 0, 28, 0, 29, 0, 42, 0, 59, 0, 80, 0, 171],
    bossMat: [0, 0, 0, 0, 2, 0, 4, 0, 8, 0, 12, 0, 20, 0],
    localMat: [0, 0, 3, 0, 10, 0, 20, 0, 30, 0, 45, 0, 60, 0],
    gemstone1: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    gemstone2: [0, 0, 0, 0, 3, 0, 6, 0, 0, 0, 0, 0, 0, 0],
    gemstone3: [0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 6, 0, 0, 0],
    gemstone4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0],
    commonMat1: [0, 0, 3, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    commonMat2: [0, 0, 0, 0, 0, 0, 12, 0, 18, 0, 0, 0, 0, 0],
    commonMat3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 24, 0],
};

export const characterSkill = {
    credits: [
        0, 12500, 17500, 25000, 30000, 37500, 120000, 260000, 450000, 700000,
    ],
    weeklyBossMat: [0, 0, 0, 0, 0, 0, 1, 1, 2, 2],
    crown: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    talentBook1: [0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
    talentBook2: [0, 0, 2, 4, 6, 9, 0, 0, 0, 0],
    talentBook3: [0, 0, 0, 0, 0, 0, 4, 6, 12, 16],
    commonMat1: [0, 6, 0, 0, 0, 0, 0, 0, 0, 0],
    commonMat2: [0, 0, 3, 4, 6, 9, 0, 0, 0, 0],
    commonMat3: [0, 0, 0, 0, 0, 0, 4, 6, 9, 12],
};

export const weaponLevel = (rarity: Rarity) => {
    const index = rarity - 1
    return {
        credits: weaponCosts.credits[index],
        weaponXP1: weaponCosts.weaponXP1[index],
        weaponXP2: weaponCosts.weaponXP2[index],
        weaponXP3: weaponCosts.weaponXP3[index],
        weaponAscensionMat1: weaponCosts.weaponAscensionMat1[index],
        weaponAscensionMat2: weaponCosts.weaponAscensionMat2[index],
        weaponAscensionMat3: weaponCosts.weaponAscensionMat3[index],
        weaponAscensionMat4: weaponCosts.weaponAscensionMat4[index],
        eliteMat1: weaponCosts.eliteMat1[index],
        eliteMat2: weaponCosts.eliteMat2[index],
        eliteMat3: weaponCosts.eliteMat3[index],
        commonMat1: weaponCosts.commonMat1[index],
        commonMat2: weaponCosts.commonMat2[index],
        commonMat3: weaponCosts.commonMat3[index],
    };
};

const weaponCosts = {
    credits: [
        [0, 2440, 0, 12460, 5000, 12580, 5000, 18560, 10000, 26000],
        [0, 3640, 5000, 18700, 5000, 18860, 10000, 27840, 15000, 38980],
        [
            0, 5360, 5000, 27400, 10000, 27640, 15000, 40820, 20000, 57180,
            25000, 77020, 30000, 163460,
        ],
        [
            0, 8100, 5000, 41520, 15000, 41880, 20000, 61840, 30000, 86620,
            35000, 116700, 45000, 247660,
        ],
        [
            0, 12160, 10000, 62280, 20000, 62820, 30000, 92780, 45000, 129920,
            55000, 175040, 65000, 371480,
        ],
    ],
    weaponXP1: [
        [0, 0, 0, 3, 0, 4, 0, 0, 0, 4],
        [0, 1, 0, 0, 0, 3, 0, 3, 0, 2],
        [0, 3, 0, 2, 0, 0, 0, 1, 0, 3, 0, 0, 0, 2],
        [0, 2, 0, 1, 0, 3, 0, 3, 0, 2, 0, 2, 0, 4],
        [0, 3, 0, 2, 0, 0, 0, 2, 0, 3, 0, 0, 0, 4],
    ],
    weaponXP2: [
        [0, 2, 0, 0, 0, 2, 0, 0, 0, 3],
        [0, 3, 0, 1, 0, 1, 0, 2, 0, 3],
        [0, 1, 0, 3, 0, 2, 0, 2, 0, 1, 0, 2, 0, 3],
        [0, 0, 0, 2, 0, 2, 0, 3, 0, 1, 0, 3, 0, 1],
        [0, 0, 0, 3, 0, 4, 0, 0, 0, 4, 0, 0, 0, 2],
    ],
    weaponXP3: [
        [0, 2, 0, 12, 0, 11, 0, 17, 0, 23],
        [0, 3, 0, 18, 0, 17, 0, 25, 0, 35],
        [0, 5, 0, 26, 0, 25, 0, 37, 0, 52, 0, 70, 0, 154],
        [0, 8, 0, 40, 0, 38, 0, 56, 0, 79, 0, 106, 0, 234],
        [0, 12, 0, 60, 0, 57, 0, 85, 0, 118, 0, 160, 0, 351],
    ],
    weaponAscensionMat1: [
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    weaponAscensionMat2: [
        [0, 0, 0, 0, 1, 0, 2, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 3, 0, 0, 0],
        [0, 0, 0, 0, 2, 0, 4, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 3, 0, 6, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 5, 0, 9, 0, 0, 0, 0, 0, 0, 0],
    ],
    weaponAscensionMat3: [
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 4, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 6, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 9, 0, 0, 0],
    ],
    weaponAscensionMat4: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0],
    ],
    eliteMat1: [
        [0, 0, 1, 0, 4, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 5, 0, 0, 0, 0, 0],
        [0, 0, 2, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 3, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 5, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    eliteMat2: [
        [0, 0, 0, 0, 0, 0, 2, 0, 4, 0],
        [0, 0, 0, 0, 0, 0, 3, 0, 5, 0],
        [0, 0, 0, 0, 0, 0, 4, 0, 8, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 6, 0, 12, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 9, 0, 18, 0, 0, 0, 0, 0],
    ],
    eliteMat3: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 12, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 18, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 27, 0],
    ],
    commonMat1: [
        [0, 0, 1, 0, 2, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 4, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 3, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    commonMat2: [
        [0, 0, 0, 0, 0, 0, 2, 0, 3, 0],
        [0, 0, 0, 0, 0, 0, 3, 0, 4, 0],
        [0, 0, 0, 0, 0, 0, 4, 0, 6, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 6, 0, 9, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 9, 0, 14, 0, 0, 0, 0, 0],
    ],
    commonMat3: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 8, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 12, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 18, 0],
    ],
};
