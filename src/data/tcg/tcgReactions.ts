import { Element } from "types/_common";

interface ReactionProps {
    element: Element;
    application?: boolean;
}

export function Bloom({ element, application = false }: ReactionProps) {
    const elements = ["Hydro", "Dendro"];
    if (element === "Dendro") {
        elements.reverse();
    }
    const description = !application
        ? `DMG +1 for this instance, creates a [<span class="text-primary">Dendro Core</span>] that grants +2 DMG to the next instance of Pyro or Electro DMG`
        : `Creates a [<span class="text-primary">Dendro Core</span>] that grants +2 DMG to the next instance of Pyro or Electro DMG`;
    return `Icon_${elements[0]} +Icon_${elements[1]} <span class="text-primary">Bloom</span>: ${description}`;
}

export function Burning({ element, application = false }: ReactionProps) {
    const elements = ["Pyro", "Dendro"];
    if (element === "Dendro") {
        elements.reverse();
    }
    const description = !application
        ? `DMG +1 for this instance, creates a [<span class="text-primary">Burning Flame</span>] that will deal 1 Pyro DMG at the end of the Round (Takes effect once, max 2 stacks)`
        : `Creates a [<span class="text-primary">Burning Flame</span>] that will deal 1 Pyro DMG at the end of the Round (Takes effect once, max 2 stacks)`;
    return `Icon_${elements[0]} +Icon_${elements[1]} <span class="text-primary">Burning</span>: ${description}`;
}

export function Crystallize({ element, application = false }: ReactionProps) {
    return !application
        ? `Icon_Geo +Icon_${element} <span class="text-primary">${element} Crystallize</span>: DMG +1 for this instance, your active character gains 1 Shield point (Can stack, max 2 points)`
        : `Icon_Geo +Icon_${element} <span class="text-primary">${element} Crystallize</span>: The opponent's active character gains 1 Shield point (Can stack, max 2 points).`;
}

export function Frozen({ element, application = false }: ReactionProps) {
    const elements = ["Hydro", "Cryo"];
    if (element === "Cryo") {
        elements.reverse();
    }
    const description = !application
        ? "DMG +1 for this instance, the target is unable to perform any Actions this Round (Can be removed in advance after the target receives Physical or Pyro DMG, in which case they will take +2 DMG)"
        : "The target is unable to perform any Actions this Round (Can be removed in advance after the target receives Physical or Pyro DMG, in which case they will take +2 DMG)";
    return `Icon_${elements[0]} +Icon_${elements[1]} <span class="text-primary">Frozen</span>: ${description}`;
}

export function ElectroCharged({
    element,
    application = false,
}: ReactionProps) {
    const elements = ["Electro", "Hydro"];
    if (element === "Hydro") {
        elements.reverse();
    }
    const description = !application
        ? "DMG +1 for this instance, deal 1 Piercing DMG to all opposing characters except the target"
        : "No effect";
    return `Icon_${elements[0]} +Icon_${elements[1]} <span class="text-primary">Electro-Charged</span>: ${description}`;
}

export function Melt({ element, application = false }: ReactionProps) {
    const elements = ["Pyro", "Cryo"];
    if (element === "Cryo") {
        elements.reverse();
    }
    const description = !application ? "DMG +2 for this instance" : "No effect";
    return `Icon_${elements[0]} +Icon_${elements[1]} <span class="text-primary">Melt</span>: ${description}`;
}

export function Overloaded({ element, application = false }: ReactionProps) {
    const elements = ["Pyro", "Electro"];
    if (element === "Electro") {
        elements.reverse();
    }
    const description = !application
        ? "DMG +2 for this instance, the target is forcibly switched to the next character"
        : "The target is forcibly switched to the next character";
    return `Icon_${elements[0]} +Icon_${elements[1]} <span class="text-primary">Overloaded</span>: ${description}`;
}

export function Quicken({ element, application = false }: ReactionProps) {
    const elements = ["Electro", "Dendro"];
    if (element === "Dendro") {
        elements.reverse();
    }
    const description = !application
        ? `DMG +1 for this instance, creates a [<span class="text-primary">Catalyzing Field</span>] that grants +1 DMG to the next 2 instances of Dendro or Electro DMG`
        : `Creates a [<span class="text-primary">Catalyzing Field</span>] that grants +1 DMG to the next 2 instances of Dendro or Electro DMG`;
    return `Icon_${elements[0]} +Icon_${elements[1]} <span class="text-primary">Quicken</span>: ${description}`;
}

export function Superconduct({ element, application = false }: ReactionProps) {
    const elements = ["Electro", "Cryo"];
    if (element === "Cryo") {
        elements.reverse();
    }
    const description = !application
        ? "DMG +1 for this instance, deal 1 Piercing DMG to all opposing characters except the target"
        : "No effect";
    return `Icon_${elements[0]} +Icon_${elements[1]} <span class="text-primary">Superconduct</span>: ${description}`;
}

export function Swirl({ element }: ReactionProps) {
    return `Icon_Anemo +Icon_${element} <span class="text-primary">${element} Swirl</span>: Deals 1 ${element} DMG to all opposing characters except the target`;
}

export function Vaporize({ element, application = false }: ReactionProps) {
    const elements = ["Pyro", "Hydro"];
    if (element === "Hydro") {
        elements.reverse();
    }
    const description = !application ? "DMG +2 for this instance" : "No effect";
    return `Icon_${elements[0]} +Icon_${elements[1]} <span class="text-primary">Vaporize</span>: ${description}`;
}
