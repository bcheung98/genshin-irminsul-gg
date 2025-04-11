import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { objectKeys } from "helpers/utils";
import { TCGCardType } from "types/tcg";

export interface TCGFilterState {
    cardType: TCGCardType[];
}

const initialState: TCGFilterState = {
    cardType: [],
};

export const tcgFilterSlice = createSlice({
    name: "tcgFilters",
    initialState,
    reducers: {
        setCardType: (state, action: PayloadAction<TCGCardType[]>) => {
            state.cardType = action.payload;
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

export const { setCardType, clearFilters } = tcgFilterSlice.actions;

export const { selectTCGFilters, activeTCGFilters } = tcgFilterSlice.selectors;

export default tcgFilterSlice.reducer;
