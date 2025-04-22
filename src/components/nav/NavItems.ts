export interface NavItem {
    icon: string;
    text: string;
    link: string;
    tag?: string;
}

export const navItems: NavItem[] = [
    {
        icon: "icons/Home",
        text: "Home",
        link: "/",
    },
    {
        icon: "icons/Aether",
        text: "Characters",
        link: "/characters/",
    },
    {
        icon: "icons/Weapons",
        text: "Weapons",
        link: "/weapons/",
    },
    {
        icon: "icons/Artifact",
        text: "Artifacts",
        link: "/artifacts/",
    },
    {
        icon: "icons/TCG",
        text: "TCG",
        link: "/tcg/",
    },
    {
        icon: "icons/Ascension",
        text: "Ascension Planner",
        link: "/planner/",
    },
    {
        icon: "icons/Wish",
        text: "Banner Archive",
        link: "/banners/",
    },
];

export const otherItems: NavItem[] = [
    {
        text: "Calendar",
        link: "https://irminsul.gg/calendar",
        icon: "",
    },
    {
        text: "Blog",
        link: "https://irminsul.gg/blog",
        icon: "",
    },
];
