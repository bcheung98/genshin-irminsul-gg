import { WeaponData } from "../types/weapon/WeaponData"

export const baseATKScaling = {
    "49": [49, 145, 176, 286, 317, 374, 406, 464, 495, 555, 586, 648, 679, 741],
    "48": [48, 133, 164, 261, 292, 341, 373, 423, 455, 506, 537, 590, 621, 674],
    "46": [46, 122, 153, 235, 266, 308, 340, 382, 414, 457, 488, 532, 563, 608],
    "44b": [44, 110, 141, 210, 241, 275, 307, 341, 373, 408, 439, 475, 506, 542],
    "45": [45, 128, 154, 247, 273, 321, 347, 395, 421, 470, 496, 545, 571, 620],
    "44": [44, 119, 144, 226, 252, 293, 319, 361, 387, 429, 455, 497, 523, 565],
    "42": [42, 109, 135, 205, 231, 266, 292, 327, 353, 388, 414, 449, 475, 510],
    "41": [41, 99, 125, 184, 210, 238, 264, 293, 319, 347, 373, 401, 427, 454],
    "39b": [39, 94, 120, 176, 202, 229, 255, 282, 308, 335, 361, 388, 414, 440],
    "40": [40, 102, 121, 187, 207, 239, 259, 292, 311, 344, 363, 396, 415, 448],
    "39": [39, 94, 113, 169, 189, 216, 236, 263, 282, 309, 329, 355, 375, 401],
    "38": [38, 86, 105, 151, 171, 193, 212, 234, 253, 274, 294, 314, 334, 354],
    "33": [33, 80, 91, 139, 151, 174, 186, 209, 220, 243],
    "23": [23, 56, 68, 102, 113, 130, 141, 158, 169, 185]
}

type SubStatScaling = {
    [level: string]: {
        [key in WeaponData["stats"]["subStat"]]?: string[] // Make the keys optional
    }
}

export const subStatScaling: SubStatScaling = {
    "49": {
        "HP": [],
        "ATK": ["3.6%", "6.4%", "6.4%", "9.3%", "9.3%", "10.7%", "10.7%", "12.2%", "12.2%", "13.6%", "13.6%", "15.1%", "15.1%", "16.5%"],
        "DEF": [],
        "Physical DMG Bonus": ["4.5%", "8.0%", "8.0%", "11.6%", "11.6%", "13.4%", "13.4%", "15.2%", "15.2%", "17.0%", "17.0%", "18.9%", "18.9%", "20.7%"],
        "Energy Recharge": [],
        "CRIT Rate": ["2.4%", "4.2%", "4.2%", "6.2%", "6.2%", "7.1%", "7.1%", "8.1%", "8.1%", "9.1%", "9.1%", "10.1%", "10.1%", "11.0%"],
        "CRIT DMG": [],
        "Elemental Mastery": []
    },
    "48": {
        "HP": ["7.2%", "12.7%", "12.7%", "18.5%", "18.5%", "21.4%", "21.4%", "24.4%", "24.4%", "27.3%", "27.3%", "30.2%", "30.2%", "33.1%"],
        "ATK": ["7.2%", "12.7%", "12.7%", "18.5%", "18.5%", "21.4%", "21.4%", "24.4%", "24.4%", "27.3%", "27.3%", "30.2%", "30.2%", "33.1%"],
        "DEF": [],
        "Physical DMG Bonus": ["9.0%", "15.9%", "15.9%", "23.2%", "23.2%", "26.8%", "26.8%", "30.4%", "30.4%", "34.1%", "34.1%", "37.7%", "37.7%", "41.3%"],
        "Energy Recharge": ["8.0%", "14.1%", "14.1%", "20.6%", "20.6%", "23.8%", "23.8%", "27.1%", "27.1%", "30.3%", "30.3%", "33.5%", "33.5%", "36.8%"],
        "CRIT Rate": ["4.8%", "8.5%", "8.5%", "12.4%", "12.4%", "14.3%", "14.3%", "16.2%", "16.2%", "18.2%", "18.2%", "20.1%", "20.1%", "22.1%"],
        "CRIT DMG": ["9.6%", "17.0%", "17.0%", "24.7%", "24.7%", "28.6%", "28.6%", "32.5%", "32.5%", "36.3%", "36.3%", "40.2%", "40.2%", "44.1%"],
        "Elemental Mastery": []
    },
    "46": {
        "HP": ["10.8%", "19.1%", "19.1%", "27.8%", "27.8%", "32.2%", "32.2%", "36.5%", "36.5%", "40.9%", "40.9%", "45.3%", "45.3%", "49.6%"],
        "ATK": ["10.8%", "19.1%", "19.1%", "27.8%", "27.8%", "32.2%", "32.2%", "36.5%", "36.5%", "40.9%", "40.9%", "45.3%", "45.3%", "49.6%"],
        "DEF": [],
        "Physical DMG Bonus": [],
        "Energy Recharge": ["12.0%", "21.2%", "21.2%", "30.9%", "30.9%", "35.7%", "35.7%", "40.6%", "40.6%", "45.4%", "45.4%", "50.3%", "50.3%", "55.1%"],
        "CRIT Rate": ["7.2%", "12.7%", "12.7%", "18.5%", "18.5%", "21.4%", "21.4%", "24.4%", "24.4%", "27.3%", "27.3%", "30.2%", "30.2%", "33.1%"],
        "CRIT DMG": ["14.4%", "25.4%", "25.4%", "37.1%", "37.1%", "42.9%", "42.9%", "48.7%", "48.7%", "54.5%", "54.5%", "60.3%", "60.3%", "66.2%"],
        "Elemental Mastery": ["43", "76", "76", "111", "111", "129", "129", "146", "146", "164", "164", "181", "181", "198"]
    },
    "44b": {
        "HP": ["14.4%", "25.4%", "25.4%", "37.1%", "37.1%", "42.9%", "42.9%", "48.7%", "48.7%", "54.5%", "54.5%", "60.3%", "60.3%", "66.2%"],
        "ATK": [],
        "DEF": ["18.0%", "31.8%", "31.8%", "46.4%", "46.4%", "53.6%", "53.6%", "60.9%", "60.9%", "68.1%", "68.1%", "75.4%", "75.4%", "82.7%"],
        "Physical DMG Bonus": [],
        "Energy Recharge": [],
        "CRIT Rate": ["9.6%", "17.0%", "17.0%", "24.7%", "24.7%", "28.6%", "28.6%", "32.5%", "32.5%", "36.3%", "36.3%", "40.2%", "40.2%", "44.1%"],
        "CRIT DMG": ["19.2%", "33.9%", "33.9%", "49.4%", "49.4%", "57.2%", "57.2%", "65.0%", "65.0%", "72.7%", "72.7%", "80.4%", "80.4%", "88.2%"],
        "Elemental Mastery": ["58", "102", "102", "148", "148", "172", "172", "195", "195", "218", "218", "241", "241", "265"]
    },
    "45": {
        "HP": [],
        "ATK": ["3.0%", "5.3%", "5.3%", "7.7%", "7.7%", "8.9%", "8.9%", "10.1%", "10.1%", "11.4%", "11.4%", "12.6%", "12.6%", "13.8%"],
        "DEF": [],
        "Physical DMG Bonus": [],
        "Energy Recharge": [],
        "CRIT Rate": [],
        "CRIT DMG": [],
        "Elemental Mastery": ["12", "21", "21", "31", "31", "36", "36", "41", "41", "45", "45", "50", "50", "55"]
    },
    "44": {
        "HP": ["6.0%", "10.6%", "10.6%", "15.4%", "15.4%", "17.9%", "17.9%", "20.3%", "20.3%", "22.7%", "22.7%", "25.1%", "25.1%", "27.6%"],
        "ATK": ["6.0%", "10.6%", "10.6%", "15.4%", "15.4%", "17.9%", "17.9%", "20.3%", "20.3%", "22.7%", "22.7%", "25.1%", "25.1%", "27.6%"],
        "DEF": [],
        "Physical DMG Bonus": ["7.5%", "13.3%", "13.3%", "19.3%", "19.3%", "22.4%", "22.4%", "25.4%", "25.4%", "28.4%", "28.4%", "31.5%", "31.5%", "34.5%"],
        "Energy Recharge": ["6.7%", "11.8%", "11.8%", "17.2%", "17.2%", "19.9%", "19.9%", "22.6%", "22.6%", "25.2%", "25.2%", "27.9%", "27.9%", "30.6%"],
        "CRIT Rate": ["4.0%", "7.1%", "7.1%", "10.3%", "10.3%", "11.9%", "11.9%", "13.5%", "13.5%", "15.1%", "15.1%", "16.8%", "16.8%", "18.4%"],
        "CRIT DMG": ["8.0%", "14.1%", "14.1%", "20.6%", "20.6%", "23.8%", "23.8%", "27.1%", "27.1%", "30.3%", "30.3%", "33.5%", "33.5%", "36.8%"],
        "Elemental Mastery": ["24", "42", "42", "62", "62", "71", "71", "81", "81", "91", "91", "101", "101", "110"]
    },
    "42": {
        "HP": ["9.0%", "15.9%", "15.9%", "23.2%", "23.2%", "26.8%", "26.8%", "30.4%", "30.4%", "34.1%", "34.1%", "37.7%", "37.7%", "41.3%"],
        "ATK": ["9.0%", "15.9%", "15.9%", "23.2%", "23.2%", "26.8%", "26.8%", "30.4%", "30.4%", "34.1%", "34.1%", "37.7%", "37.7%", "41.3%"],
        "DEF": ["11.3%", "19.9%", "19.9%", "29.0%", "29.0%", "33.5%", "33.5%", "38.1%", "38.1%", "42.6%", "42.6%", "47.2%", "47.2%", "51.7%"],
        "Physical DMG Bonus": ["11.3%", "19.9%", "19.9%", "29.0%", "29.0%", "33.5%", "33.5%", "38.1%", "38.1%", "42.6%", "42.6%", "47.2%", "47.2%", "51.7%"],
        "Energy Recharge": ["10.0%", "17.7%", "17.7%", "25.8%", "25.8%", "29.8%", "29.8%", "33.8%", "33.8%", "37.9%", "37.9%", "41.9%", "41.9%", "45.9%"],
        "CRIT Rate": ["6.0%", "10.6%", "10.6%", "15.4%", "15.4%", "17.9%", "17.9%", "20.3%", "20.3%", "22.7%", "22.7%", "25.1%", "25.1%", "27.6%"],
        "CRIT DMG": ["12.0%", "21.2%", "21.2%", "30.9%", "30.9%", "35.7%", "35.7%", "40.6%", "40.6%", "45.4%", "45.4%", "50.3%", "50.3%", "55.1%"],
        "Elemental Mastery": ["36", "64", "64", "93", "93", "107", "107", "122", "122", "136", "136", "151", "151", "165"]
    },
    "41": {
        "HP": ["12.0%", "21.2%", "21.2%", "30.9%", "30.9%", "35.7%", "35.7%", "40.6%", "40.6%", "45.4%", "45.4%", "50.3%", "50.3%", "55.1%"],
        "ATK": ["12.0%", "21.2%", "21.2%", "30.9%", "30.9%", "35.7%", "35.7%", "40.6%", "40.6%", "45.4%", "45.4%", "50.3%", "50.3%", "55.1%"],
        "DEF": ["15.0%", "26.5%", "26.5%", "38.7%", "38.7%", "44.7%", "44.7%", "50.8%", "50.8%", "56.8%", "56.8%", "62.9%", "62.9%", "69.0%"],
        "Physical DMG Bonus": ["15.0%", "26.5%", "26.5%", "38.7%", "38.7%", "44.7%", "44.7%", "50.8%", "50.8%", "56.8%", "56.8%", "62.9%", "62.9%", "69.0%"],
        "Energy Recharge": ["13.3%", "23.6%", "23.6%", "34.3%", "34.3%", "39.7%", "39.7%", "45.1%", "45.1%", "50.5%", "50.5%", "55.9%", "55.9%", "61.3%"],
        "CRIT Rate": ["8.0%", "14.1%", "14.1%", "20.6%", "20.6%", "23.8%", "23.8%", "27.1%", "27.1%", "30.3%", "30.3%", "33.5%", "33.5%", "36.8%"],
        "CRIT DMG": [],
        "Elemental Mastery": ["48", "85", "85", "124", "124", "143", "143", "162", "162", "182", "182", "201", "201", "221"]
    },
    "40": {
        "HP": [],
        "ATK": ["5.1%", "9.0%", "9.0%", "13.2%", "13.2%", "15.2%", "15.2%", "17.3%", "17.3%", "19.3%", "19.3%", "21.4%", "21.4%", "23.5%"],
        "DEF": ["6.4%", "11.3%", "11.3%", "16.4%", "16.4%", "19.0%", "19.0%", "21.6%", "21.6%", "24.1%", "24.1%", "26.7%", "26.7%", "29.3%"],
        "Physical DMG Bonus": ["6.4%", "11.3%", "11.3%", "16.4%", "16.4%", "19.0%", "19.0%", "21.6%", "21.6%", "24.1%", "24.1%", "26.7%", "26.7%", "29.3%"],
        "Energy Recharge": [],
        "CRIT Rate": ["3.4%", "6.0%", "6.0%", "8.8%", "8.8%", "10.1%", "10.1%", "11.5%", "11.5%", "12.9%", "12.9%", "14.2%", "14.2%", "15.6%"],
        "CRIT DMG": ["6.8%", "12.0%", "12.0%", "17.5%", "17.5%", "20.3%", "20.3%", "23.0%", "23.0%", "25.7%", "25.7%", "28.5%", "28.5%", "31.2%"],
        "Elemental Mastery": ["20", "36", "36", "53", "53", "61", "61", "69", "69", "77", "77", "85", "85", "94"]
    },
    "39b": {
        "HP": [],
        "ATK": ["7.7%", "13.5%", "13.5%", "19.7%", "19.7%", "22.8%", "22.8%", "25.9%", "25.9%", "29.0%", "29.0%", "32.1%", "32.1%", "35.2%"],
        "DEF": [],
        "Physical DMG Bonus": [],
        "Energy Recharge": [],
        "CRIT Rate": [],
        "CRIT DMG": [],
        "Elemental Mastery": []
    },
    "39": {
        "HP": ["7.7%", "13.5%", "13.5%", "19.7%", "19.7%", "22.8%", "22.8%", "25.9%", "25.9%", "29.0%", "29.0%", "32.1%", "32.1%", "35.2%"],
        "ATK": ["7.7%", "13.5%", "13.5%", "19.7%", "19.7%", "22.8%", "22.8%", "25.9%", "25.9%", "29.0%", "29.0%", "32.1%", "32.1%", "35.2%"],
        "DEF": ["9.6%", "16.9%", "16.9%", "24.6%", "24.6%", "28.5%", "28.5%", "32.3%", "32.3%", "36.2%", "36.2%", "40.1%", "40.1%", "43.9%"],
        "Physical DMG Bonus": ["9.6%", "16.9%", "16.9%", "24.6%", "24.6%", "28.5%", "28.5%", "32.3%", "32.3%", "36.2%", "36.2%", "40.1%", "40.1%", "43.9%"],
        "Energy Recharge": ["8.5%", "15.0%", "15.0%", "21.9%", "21.9%", "25.3%", "25.3%", "28.8%", "28.8%", "32.2%", "32.2%", "35.6%", "35.6%", "39.0%"],
        "CRIT Rate": ["5.1%", "9.0%", "9.0%", "13.1%", "13.1%", "15.2%", "15.2%", "17.3%", "17.3%", "19.3%", "19.3%", "21.4%", "21.4%", "23.4%"],
        "CRIT DMG": ["10.2%", "18.0%", "18.0%", "26.3%", "26.3%", "30.4%", "30.4%", "34.5%", "34.5%", "38.6%", "38.6%", "42.7%", "42.7%", "46.9%"],
        "Elemental Mastery": ["31", "54", "54", "79", "79", "91", "91", "104", "104", "116", "116", "128", "128", "141"]
    },
    "38": {
        "HP": ["10.2%", "18.0%", "18.0%", "26.3%", "26.3%", "30.4%", "30.4%", "34.6%", "34.6%", "38.7%", "38.7%", "42.8%", "42.8%", "46.9%"],
        "ATK": [],
        "DEF": [],
        "Physical DMG Bonus": [],
        "Energy Recharge": ["11.3%", "20.0%", "20.0%", "29.2%", "29.2%", "33.8%", "33.8%", "38.3%", "38.3%", "42.9%", "42.9%", "47.5%", "47.5%", "52.1%"],
        "CRIT Rate": ["6.8%", "12.0%", "12.0%", "17.5%", "17.5%", "20.3%", "20.3%", "23.0%", "23.0%", "25.7%", "25.7%", "28.5%", "28.5%", "31.2%"],
        "CRIT DMG": [],
        "Elemental Mastery": ["41", "72", "72", "105", "105", "122", "122", "138", "138", "154", "154", "171", "171", "187"]
    }
}