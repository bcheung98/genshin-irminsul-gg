import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { objectKeys } from "helpers/utils";
import { Element } from "types/_common";
import {
    TCGActionCardSubType,
    TCGCardType,
    TCGFaction,
    TCGWeaponType,
} from "types/tcg";

export interface TCGFilterState {
    cardType: TCGCardType[];
    element: Element[];
    weapon: TCGWeaponType[];
    faction: TCGFaction[];
    cardGroup: TCGActionCardSubType[];
}

const initialState: TCGFilterState = {
    cardType: [],
    element: [],
    weapon: [],
    faction: [],
    cardGroup: [],
};

export const tcgFilterSlice = createSlice({
    name: "tcgFilters",
    initialState,
    reducers: {
        setCardType: (state, action: PayloadAction<TCGCardType[]>) => {
            state.cardType = action.payload;
        },
        setElement: (state, action: PayloadAction<Element[]>) => {
            state.element = action.payload;
        },
        setWeapon: (state, action: PayloadAction<TCGWeaponType[]>) => {
            state.weapon = action.payload;
        },
        setFaction: (state, action: PayloadAction<TCGFaction[]>) => {
            state.faction = action.payload;
        },
        setCardGroup: (
            state,
            action: PayloadAction<TCGActionCardSubType[]>
        ) => {
            state.cardGroup = action.payload;
        },
        clearFilters: (
            state,
            action: PayloadAction<keyof TCGFilterState | undefined>
        ) => {
            if (!action.payload) {
                return initialState;
            } else {
                state[action.payload] = [];
            }
        },
    },
    selectors: {
        selectTCGFilters: (state): TCGFilterState => state,
        activeTCGFilters: (state): boolean =>
            objectKeys(state).filter((filter) => state[filter].length).length >
            0,
    },
});

export const {
    setCardType,
    setElement,
    setWeapon,
    setFaction,
    setCardGroup,
    clearFilters,
} = tcgFilterSlice.actions;

export const { selectTCGFilters, activeTCGFilters } = tcgFilterSlice.selectors;

export default tcgFilterSlice.reducer;
