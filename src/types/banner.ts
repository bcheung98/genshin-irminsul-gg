import { Rarity } from "./_common";

export interface Banner {
    version: string;
    subVersion: string;
    start: string;
    end: string;
    fiveStars: string[];
    fourStars: string[];
}

export type BannerType = "character" | "weapon";

export interface BannerOption {
    id: number;
    name: string;
    displayName: string;
    rarity: Rarity;
    element?: string;
    weapon: string;
}

export interface BannerData extends Omit<Banner, "fiveStars" | "fourStars"> {
    fiveStars: BannerOption[];
    fourStars: BannerOption[];
}

export interface ChronicledWishBanner {
    version: string;
    subVersion: string;
    start: string;
    end: string;
    characters: ChronicledWishData;
    weapons: ChronicledWishData;
}

export interface ChronicledWishBannerData
    extends Omit<ChronicledWishBanner, "characters" | "weapons"> {
    characters: ChronicledWishBannerOption;
    weapons: ChronicledWishBannerOption;
}

export interface ChronicledWishData {
    fiveStars: string[];
    fourStars: string[];
}

export interface ChronicledWishBannerOption {
    fiveStars: BannerOption[];
    fourStars: BannerOption[];
}
