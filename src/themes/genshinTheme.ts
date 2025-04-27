import { createTheme } from "@mui/material";
import { getThemeBackgroundColors } from "helpers/utils";
import { Shade } from "types/theme";

const appbarColors = ["rgb(0, 16, 32)", "rgb(0, 23, 47)", "rgb(0, 40, 80)"];

const border = {
    color: "rgb(30, 73, 118)",
    highlight: `rgb(30, 144, 255)`,
};

const backgroundColors = [
    {
        main: "rgb(0, 40, 80)",
        light: "rgb(0, 50, 100)",
        dark: "rgb(0, 30, 60)",
    },
    {
        main: "rgb(0, 23, 47)",
        light: "rgb(0, 33, 66)",
        dark: "rgb(0, 13, 26)",
    },
    {
        main: "rgb(0, 16, 32)",
        light: "rgb(0, 21, 42)",
        dark: "rgb(0, 11, 22)",
    },
];

export const genshinThemeData = {
    name: "Genshin",
    background: (index: number, shade?: Shade) =>
        getThemeBackgroundColors({ colors: backgroundColors, index, shade }),
    backgroundImageColors: ["rgb(23, 46, 98)", "rgba(73, 218, 243, 0.2)"],
    backgroundImageURL: "https://assets.irminsul.gg/main/images/Irminsul.png",
    backgroundImageAlpha: 0.75,
    palette: {
        primary: {
            main: "rgb(0, 16, 32)",
        },
        secondary: {
            main: "rgb(0, 23, 47)",
        },
        tertiary: {
            main: "rgb(0, 40, 80)",
            light: "rgb(10, 40, 70)",
            dark: "rgb(0, 20, 40)",
        },
        info: {
            main: "rgb(0, 101, 202)",
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
        contrast: "rgb(0, 0, 0)",
        selected: "rgb(30, 175, 255)",
        description: "rgb(205, 205, 205)",
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
