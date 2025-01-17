import { useEffect } from "react";
import { BrowserRouter } from "react-router";
import "App.css";

// Component imports
import RouteConfig from "components/nav/RouteConfig";

// MUI imports
import { CssBaseline, ThemeProvider } from "@mui/material";

// Helper imports
import {
    fetchCharacters,
    fetchWeapons,
    fetchArtifacts,
    fetchCharacterBanners,
    fetchWeaponBanners,
    fetchChronicledWish,
} from "rtk/fetchData";
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { selectTheme, setTheme } from "reducers/settings";
import { getTheme } from "themes/theme";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCharacters());
        dispatch(fetchWeapons());
        dispatch(fetchArtifacts());
        dispatch(fetchCharacterBanners());
        dispatch(fetchWeaponBanners());
        dispatch(fetchChronicledWish());
    }, []);

    const theme = useAppSelector(selectTheme);

    useEffect(() => {
        dispatch(setTheme(theme));
    }, [theme]);

    return (
        <BrowserRouter>
            <ThemeProvider theme={getTheme(theme)}>
                <CssBaseline />
                <RouteConfig />
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
