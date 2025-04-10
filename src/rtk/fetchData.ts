import { createAsyncThunk } from "@reduxjs/toolkit";
import { Character } from "types/character";
import { Weapon } from "types/weapon";
import { TCGActionCard, TCGCharacterCard, TCGKeyword } from "types/tcg";
import { Artifact } from "types/artifact";
import { Banner, ChronicledWishBanner } from "types/banner";

export type LoadingStatus = "idle" | "pending" | "success" | "error";

// https://api.irminsul.gg/genshin/characters.json
const charactersURL = "https://api.irminsul.gg/genshin/characters.json";

// https://api.irminsul.gg/genshin/weapons.json
const weaponsURL = "https://api.irminsul.gg/genshin/weapons.json";

// https://api.irminsul.gg/genshin/artifacts.json
const artifactsURL = "https://api.irminsul.gg/genshin/artifacts.json";

// https://api.irminsul.gg/genshin/tcg-character-cards.json
const tcgCharacterCardsURL =
    "https://api.irminsul.gg/genshin/tcg-character-cards.json";

// https://api.irminsul.gg/genshin/tcg-action-cards.json
const tcgActionCardsURL =
    "https://api.irminsul.gg/genshin/tcg-action-cards.json";

// https://api.irminsul.gg/genshin/tcg-keywords-cards.json
const tcgKeywordsURL = "https://api.irminsul.gg/genshin/tcg-keywords.json";

const characterBannerURL =
    "https://api.irminsul.gg/genshin/character-banners.json";
const weaponBannerURL = "https://api.irminsul.gg/genshin/weapon-banners.json";
const chronicledWishURL =
    "https://api.irminsul.gg/genshin/chronicled-wish.json";

export const fetchCharacters = createAsyncThunk(
    "GET/characters",
    async (): Promise<Character[]> => {
        const response = await fetch(charactersURL);
        return await response.json();
    }
);

export const fetchWeapons = createAsyncThunk(
    "GET/weapons",
    async (): Promise<Weapon[]> => {
        const response = await fetch(weaponsURL);
        return await response.json();
    }
);

export const fetchCards = createAsyncThunk(
    "GET/cards",
    async (
        type: TCGDataType
    ): Promise<TCGCharacterCard[] | TCGActionCard[] | TCGKeyword[]> => {
        const response = await fetch(getCardsURL(type));
        return await response.json();
    }
);

export const fetchArtifacts = createAsyncThunk(
    "GET/artifacts",
    async (): Promise<Artifact[]> => {
        const response = await fetch(artifactsURL);
        return await response.json();
    }
);

export const fetchCharacterBanners = createAsyncThunk(
    "GET/characterBanners",
    async (): Promise<Banner[]> => {
        const response = await fetch(characterBannerURL);
        return await response.json();
    }
);

export const fetchWeaponBanners = createAsyncThunk(
    "GET/weaponBanners",
    async (): Promise<Banner[]> => {
        const response = await fetch(weaponBannerURL);
        return await response.json();
    }
);

export const fetchChronicledWish = createAsyncThunk(
    "GET/chronicledWish",
    async (): Promise<ChronicledWishBanner[]> => {
        const response = await fetch(chronicledWishURL);
        return await response.json();
    }
);

type TCGDataType = "CharacterCards" | "ActionCards" | "Keywords";
const getCardsURL = (type: TCGDataType) => {
    switch (type) {
        case "CharacterCards":
            return tcgCharacterCardsURL;
        case "ActionCards":
            return tcgActionCardsURL;
        case "Keywords":
            return tcgKeywordsURL;
    }
};
