import { BaseSyntheticEvent } from "react";
import parse, {
    HTMLReactParserOptions,
    Element as DOMElement,
    domToReact,
    DOMNode,
} from "html-react-parser";
import Image from "custom/Image";
import { Theme } from "@mui/material";
import { elements } from "data/common";

export function parseTCGSkillDescription({
    description,
    onClick,
    theme,
    matches,
    disableLink = false,
}: {
    description: string;
    onClick?: (event: BaseSyntheticEvent) => void;
    theme: Theme;
    matches: boolean;
    disableLink?: boolean;
}) {
    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            if (domNode instanceof DOMElement && domNode.attribs.class) {
                const className = domNode.attribs.class;
                if (className.split(" ")[0].startsWith("_icon")) {
                    const icon = className.split(" ")[1];
                    return (
                        <Image
                            src={`tcg/icons/${getIcon(icon)}`}
                            alt={`Icon_${toTitleCase(icon)}`}
                            style={{
                                verticalAlign: "middle",
                                width: "auto",
                                height: matches
                                    ? `calc(${theme.typography.body1.fontSize} + 0.5rem)`
                                    : `calc(${theme.typography.body1.fontSize} + 0.375rem)`,
                                marginBottom: "1.5px",
                                pointerEvents: "none",
                            }}
                        />
                    );
                } else if (className.split("-")[0].startsWith("text")) {
                    const tag = className.split("-")[1];
                    return (
                        <span
                            className={className}
                            data-index={domNode.attribs["data-index"]}
                            style={{
                                color: theme.text[
                                    tag as keyof typeof theme.text
                                ],
                                fontWeight:
                                    tag === "highlight"
                                        ? theme.font.highlight.weight
                                        : theme.font.element.weight,
                            }}
                        >
                            {domToReact(domNode.children as DOMNode[], options)}
                        </span>
                    );
                } else if (className.split("-")[0].startsWith("tooltip")) {
                    return (
                        <span
                            className={className}
                            style={{
                                color: theme.text[
                                    getTextColor(
                                        className
                                    ) as keyof typeof theme.text
                                ],
                                textDecoration: !disableLink
                                    ? "underline"
                                    : "none",
                                cursor: !disableLink ? "pointer" : "text",
                            }}
                            onClick={!disableLink ? onClick : undefined}
                        >
                            {domToReact(domNode.children as DOMNode[], options)}
                        </span>
                    );
                }
            }
        },
    };

    const text = description
        .replaceAll(`Icon_PyroDice `, `<span class="_icon pyroDice"></span>`)
        .replaceAll(`Icon_HydroDice `, `<span class="_icon hydroDice"></span>`)
        .replaceAll(
            `Icon_ElectroDice `,
            `<span class="_icon electroDice"></span>`
        )
        .replaceAll(`Icon_CryoDice `, `<span class="_icon cryoDice"></span>`)
        .replaceAll(`Icon_AnemoDice `, `<span class="_icon anemoDice"></span>`)
        .replaceAll(`Icon_GeoDice `, `<span class="_icon geoDice"></span>`)
        .replaceAll(
            `Icon_DendroDice `,
            `<span class="_icon dendroDice"></span>`
        )
        .replaceAll(`Icon_OmniDice `, `<span class="_icon omniDice"></span>`)
        .replaceAll(
            `Icon_UnalignedDice `,
            `<span class="_icon unalignedDice"></span>`
        )
        .replaceAll(`Icon_Energy `, `<span class="_icon energy"></span>`)

        .replaceAll(`Icon_Physical `, `<span class="_icon physical"></span>`)
        .replaceAll(`Icon_Pyro `, `<span class="_icon pyro"></span>`)
        .replaceAll(`Icon_Hydro `, `<span class="_icon hydro"></span>`)
        .replaceAll(`Icon_Electro `, `<span class="_icon electro"></span>`)
        .replaceAll(`Icon_Cryo `, `<span class="_icon cryo"></span>`)
        .replaceAll(`Icon_Anemo `, `<span class="_icon anemo"></span>`)
        .replaceAll(`Icon_Geo `, `<span class="_icon geo"></span>`)
        .replaceAll(`Icon_Dendro `, `<span class="_icon dendro"></span>`)

        .replaceAll(`Icon_Sword `, `<span class="_icon sword"></span>`)
        .replaceAll(`Icon_Claymore `, `<span class="_icon claymore"></span>`)
        .replaceAll(`Icon_Polearm `, `<span class="_icon polearm"></span>`)
        .replaceAll(`Icon_Bow `, `<span class="_icon bow"></span>`)
        .replaceAll(`Icon_Catalyst `, `<span class="_icon catalyst"></span>`)

        .replaceAll(
            `Icon_ConsecratedBeast `,
            `<span class="_icon consecrated_beast"></span>`
        )
        .replaceAll(`Icon_Eremite `, `<span class="_icon eremite"></span>`)
        .replaceAll(`Icon_Fatui `, `<span class="_icon fatui"></span>`)
        .replaceAll(`Icon_Fontaine `, `<span class="_icon fontaine"></span>`)
        .replaceAll(`Icon_Hilichurl `, `<span class="_icon hilichurl"></span>`)
        .replaceAll(`Icon_Inazuma `, `<span class="_icon inazuma"></span>`)
        .replaceAll(`Icon_Liyue `, `<span class="_icon liyue"></span>`)
        .replaceAll(`Icon_Mondstadt `, `<span class="_icon mondstadt"></span>`)
        .replaceAll(`Icon_Monster `, `<span class="_icon monster"></span>`)
        .replaceAll(`Icon_Natlan `, `<span class="_icon natlan"></span>`)
        .replaceAll(`Icon_Sumeru `, `<span class="_icon sumeru"></span>`)

        .replaceAll(`Icon_Ousia `, `<span class="_icon ousia"></span>`)
        .replaceAll(`Icon_Pneuma `, `<span class="_icon pneuma"></span>`)

        .replaceAll(`Icon_Heal `, `<span class="_icon heal"></span>`)
        .replaceAll(`Icon_Shield `, `<span class="_icon shield"></span>`)

        .replaceAll(
            `Icon_ArcaneLegend `,
            `<span class="_icon arcane_legend"></span>`
        )
        .replaceAll(`Icon_Artifact `, `<span class="_icon artifact"></span>`)
        .replaceAll(`Icon_Companion `, `<span class="_icon companion"></span>`)
        .replaceAll(`Icon_Food `, `<span class="_icon food"></span>`)
        .replaceAll(
            `Icon_ElementalResonance `,
            `<span class="_icon elemental_resonance"></span>`
        )
        .replaceAll(`Icon_Item `, `<span class="_icon item"></span>`)
        .replaceAll(`Icon_Location `, `<span class="_icon location"></span>`)
        .replaceAll(`Icon_Talent `, `<span class="_icon talent"></span>`)
        .replaceAll(`Icon_Technique `, `<span class="_icon technique"></span>`)
        .replaceAll(`Icon_Weapon `, `<span class="_icon weapon"></span>`);

    return parse(text, options);
}

function getIcon(icon: string) {
    switch (icon) {
        case "physical":
        case "pyro":
        case "hydro":
        case "electro":
        case "cryo":
        case "anemo":
        case "geo":
        case "dendro":
            return `elements/${toTitleCase(icon)}`;
        case "pyroDice":
        case "hydroDice":
        case "electroDice":
        case "cryoDice":
        case "anemoDice":
        case "geoDice":
        case "dendroDice":
        case "omniDice":
        case "unalignedDice":
            return `dice_alt/${icon[0].toUpperCase()}`;
        case "energy":
            return `dice_alt/N`;
        case "sword":
        case "claymore":
        case "polearm":
        case "bow":
        case "catalyst":
            return `weapons/${toTitleCase(icon)}`;
        case "consecrated_beast":
        case "eremite":
        case "fatui":
        case "fontaine":
        case "hilichurl":
        case "inazuma":
        case "liyue":
        case "mondstadt":
        case "monster":
        case "natlan":
        case "sumeru":
            return `factions/${toTitleCase(icon)}`;
        case "ousia":
        case "pneuma":
            return `elements/arkhe/${toTitleCase(icon)}`;
        case "heal":
            return `Heal`;
        case "shield":
            return `Shield`;
        case "arcane_legend":
        case "artifact":
        case "companion":
        case "food":
        case "item":
        case "location":
        case "talent":
        case "technique":
        case "weapon":
            return `subtypes/${toTitleCase(icon)}`;
        default:
            return "";
    }
}

function toTitleCase(str: string) {
    return str
        .split("_")
        .map((i) =>
            i.replace(
                /\w\S*/g,
                (text) =>
                    text.charAt(0).toUpperCase() +
                    text.substring(1).toLowerCase()
            )
        )
        .join("_");
}

function getTextColor(className: string) {
    const tag = className.split("-")[1];
    const elems = [...elements.map((e) => e.toLowerCase())];
    if (className.startsWith("tooltipHighlight-")) {
        return "highlight";
    } else if (elems.includes(tag.split(" ")[0].toLowerCase())) {
        return tag.split(" ")[0];
    } else {
        return "primary";
    }
}
