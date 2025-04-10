import { configureStore } from "@reduxjs/toolkit";
import { listenerMiddleware } from "./middleware";

import layoutReducer from "reducers/layout";
import settingsReducer from "reducers/settings";
import browserReducer from "reducers/browser";
import characterReducer from "reducers/character";
import characterFilterReducer from "reducers/characterFilters";
import weaponReducer from "reducers/weapon";
import weaponFilterReducer from "reducers/weaponFilters";
import artifactReducer from "reducers/artifact";
import plannerReducer from "reducers/planner";
import bannerReducer from "reducers/banner";
import tcgReducer from "./reducers/tcg";
import tcgCharacterFilterReducer from "./reducers/tcgCharacterFilterReducer";
import tcgActionFilterReducer from "./reducers/tcgActionFilterReducer";
import deckReducer from "./reducers/tcgDeckReducer";

const store = configureStore({
    reducer: {
        layout: layoutReducer,
        settings: settingsReducer,
        browser: browserReducer,
        characters: characterReducer,
        characterFilters: characterFilterReducer,
        weapons: weaponReducer,
        weaponFilters: weaponFilterReducer,
        artifacts: artifactReducer,
        planner: plannerReducer,
        banners: bannerReducer,
        cards: tcgReducer,
        cardCharFilters: tcgCharacterFilterReducer,
        cardActionFilters: tcgActionFilterReducer,
        deck: deckReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
