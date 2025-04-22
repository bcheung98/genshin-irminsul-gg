import { createSlice } from "@reduxjs/toolkit";
import { isUnreleasedContent } from "helpers/utils";
import { startAppListening } from "helpers/hooks";
import { fetchCards, LoadingStatus } from "../fetchData";
import { TCGCharacterCard, TCGActionCard, TCGKeyword } from "types/tcg";

export interface TCGState {
    status: LoadingStatus;
    characterCards: TCGCharacterCard[];
    actionCards: TCGActionCard[];
    keywords: TCGKeyword[];
}

const storedTCGCharacterCards =
    localStorage.getItem("data/tcg/character") || "null";
const storedTCGActionCards = localStorage.getItem("data/tcg/action") || "null";

const storedSettings = localStorage.getItem("settings") || "{}";
const { unreleasedContent = false } = JSON.parse(storedSettings);

const initialState: TCGState = {
    status: "idle",
    characterCards:
        storedTCGCharacterCards !== "null"
            ? JSON.parse(storedTCGCharacterCards)
            : [],
    actionCards:
        storedTCGActionCards !== "null" ? JSON.parse(storedTCGActionCards) : [],
    keywords: [],
};

export const tcgSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCards.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchCards.fulfilled, (state, action) => {
            let payload;
            switch (action.meta.arg) {
                case "CharacterCards":
                    payload = action.payload as TCGCharacterCard[];
                    if (!unreleasedContent) {
                        payload = payload.filter((item) =>
                            isUnreleasedContent(item.release.version)
                        );
                    }
                    if (JSON.stringify(payload) !== storedTCGCharacterCards) {
                        state.characterCards = payload;
                    }
                    break;
                case "ActionCards":
                    payload = action.payload as TCGActionCard[];
                    if (!unreleasedContent) {
                        payload = payload.filter((item) =>
                            isUnreleasedContent(item.release.version)
                        );
                    }
                    if (JSON.stringify(payload) !== storedTCGActionCards) {
                        state.actionCards = payload;
                    }
                    break;
                case "Keywords":
                    state.keywords = action.payload as TCGKeyword[];
                    break;
            }
            state.status = "success";
        });
        builder.addCase(fetchCards.rejected, (state) => {
            state.status = "error";
        });
    },
    selectors: {
        selectCharacterCards: (state): TCGCharacterCard[] =>
            state.characterCards,
        selectActionCards: (state): TCGActionCard[] => state.actionCards,
        selectKeywords: (state): TCGKeyword[] => state.keywords,
    },
});

export const { selectCharacterCards, selectActionCards, selectKeywords } =
    tcgSlice.selectors;

export default tcgSlice.reducer;

startAppListening({
    actionCreator: fetchCards.fulfilled,
    effect: (action) => {
        let payload, data;
        switch (action.meta.arg) {
            case "CharacterCards":
                payload = action.payload as TCGCharacterCard[];
                if (!unreleasedContent) {
                    payload = payload.filter((item) =>
                        isUnreleasedContent(item.release.version)
                    );
                }
                data = JSON.stringify(payload);
                if (data !== storedTCGCharacterCards) {
                    localStorage.setItem("data/tcg/character", data);
                }
                break;
            case "ActionCards":
                payload = action.payload as TCGActionCard[];
                if (!unreleasedContent) {
                    payload = payload.filter((item) =>
                        isUnreleasedContent(item.release.version)
                    );
                }
                data = JSON.stringify(payload);
                if (data !== storedTCGActionCards) {
                    localStorage.setItem("data/tcg/action", data);
                }
                break;
            case "Keywords":
                break;
        }
    },
});
