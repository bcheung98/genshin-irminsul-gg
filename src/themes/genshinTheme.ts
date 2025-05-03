import { createTheme } from "@mui/material";
import { getThemeBackgroundColors } from "helpers/utils";
import { Shade } from "types/theme";

const appbarColors = ["rgb(26, 29, 32)", "rgb(38, 50, 64)", "rgb(63, 81, 104)"];

const border = {
    color: "rgb(211, 188, 142)",
    highlight: `rgb(217, 204, 179)`,
};

const backgroundColors = [
    {
        main: "rgb(63, 81, 104)",
        light: "rgb(73, 91, 114)",
        dark: "rgb(53, 71, 94)",
    },
    {
        main: "rgb(38, 50, 64)",
        light: "rgb(48, 60, 74)",
        dark: "rgb(28, 40, 54)",
    },
    {
        main: "rgb(26, 29, 32)",
        light: "rgb(36, 39, 42)",
        dark: "rgb(16, 19, 22)",
    },
];

export const genshinThemeData = {
    name: "Genshin",
    background: (index: number, shade?: Shade) =>
        getThemeBackgroundColors({ colors: backgroundColors, index, shade }),
    backgroundImageColors: ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.2)"],
    backgroundImageURL:
        "https://assets.irminsul.gg/genshin/images/Irminsul.png",
    backgroundImageAlpha: 0.75,
    palette: {
        primary: {
            main: "rgb(26, 29, 32)",
        },
        secondary: {
            main: "rgb(38, 50, 64)",
        },
        tertiary: {
            main: "rgb(59, 92, 136)",
            light: "rgb(69, 102, 146)",
            dark: "rgb(49, 82, 126)",
        },
        info: {
            main: "rgb(98, 98, 98)",
            light: "rgb(193, 166, 146)",
            dark: "rgb(236, 229, 216)",
        },
        error: {
            main: "rgb(184, 90, 73)",
        },
        divider: border.color,
    },
    font: {
        main: {
            family: "Genshin, Roboto, sans-serif",
            weight: 300,
        },
        styled: {
            family: "Genshin, Roboto, sans-serif",
            weight: 300,
        },
        element: {
            weight: 300,
        },
        highlight: {
            weight: 300,
        },
        sizes: {
            "h4-styled": {
                xs: 24,
                sm: 26,
            },
            "h5-styled": {
                xs: 20,
                sm: 22,
            },
            "h6-styled": {
                xs: 16,
                sm: 18,
            },
            "body1-styled": {
                xs: 12,
                sm: 14,
            },
            "subtitle1-styled": {
                xs: 11,
                sm: 13,
            },
            "body2-styled": {
                xs: 10,
                sm: 12,
            },
            "subtitle2-styled": {
                xs: 9,
                sm: 11,
            },
            h4: {
                xs: 24,
                sm: 26,
            },
            h5: {
                xs: 20,
                sm: 22,
            },
            h6: {
                xs: 16,
                sm: 18,
            },
            body1: {
                xs: 12,
                sm: 14,
            },
            subtitle1: {
                xs: 11,
                sm: 13,
            },
            body2: {
                xs: 10,
                sm: 12,
            },
            subtitle2: {
                xs: 9,
                sm: 11,
            },
        },
    },
    text: {
        primary: "rgb(255, 255, 255)",
        contrast: "rgb(59, 66, 85)",
        selected: "rgb(211, 188, 142)",
        description: "rgb(236, 229, 216)",
        highlight: "#FFE7B9",
        highlight2: "#FFFFFF",
        star: "rgb(255, 238, 157)",
        header: "#FFE7B9",
        refinement: "#3BB1FF",
        value: "#3BB1FF",
        pyro: "#E46052",
        hydro: "#4FAAFF",
        electro: "#D85DD8",
        cryo: "#90E1FA",
        anemo: "#4BCFA3",
        geo: "#ECD133",
        dendro: "#9CDF3F",
    },
    appbar: {
        backgroundColor: appbarColors[0],
        hover: appbarColors[1],
        selectedHover: appbarColors[2],
        color: "rgb(255, 255, 255)",
    },
    border: {
        color: {
            primary: border.color,
            highlight: border.highlight,
        },
    },
    displayCard: {
        borderWidth: 0,
        border: `0px solid ${border.color}`,
        borderRadius: "4px",
        backgroundColor: backgroundColors[2].main,
    },
    icon: {
        backgroundColor: appbarColors[1],
    },
    mainContentBox: {
        borderWidth: 0,
        border: `0px solid ${border.color}`,
        borderRadius: "4px",
        backgroundColor: backgroundColors[1].main,
    },
    menu: {
        primary: backgroundColors[0].dark,
        hover: backgroundColors[0].light,
        selected: backgroundColors[1].dark,
        selectedHover: backgroundColors[1].light,
    },
    table: {
        body: {
            primary: backgroundColors[0].dark,
            hover: backgroundColors[0].light,
        },
    },
};

export const genshinTheme = createTheme(genshinThemeData);
