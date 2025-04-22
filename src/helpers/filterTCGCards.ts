import { TCGFilterState } from "reducers/tcgFilters";
import { TCGActionCard, TCGCharacterCard } from "types/tcg";

export function filterTCGCards(
    tcgCards: (TCGCharacterCard | TCGActionCard)[],
    filters: TCGFilterState,
    searchValue: string
) {
    let cards = [...tcgCards];
    if (filters.cardType.length === 1) {
        if (filters.cardType.includes("character")) {
            cards = cards.filter((card) => "talents" in card);
        }
        if (filters.cardType.includes("action")) {
            cards = cards.filter((card) => "subType" in card);
        }
    }
    if (filters.element.length > 0) {
        cards = cards.filter(
            (card) =>
                "talents" in card && filters.element.includes(card.element)
        );
    }
    if (filters.weapon.length > 0) {
        cards = cards.filter((card) =>
            filters.weapon.includes(card.weaponType!)
        );
    }
    if (filters.faction.length > 0) {
        cards = cards.filter(
            (card) =>
                "talents" in card &&
                filters.faction.some((faction) =>
                    card.factions.includes(faction)
                )
        );
    }
    if (filters.cardGroup.length > 0) {
        cards = cards.filter(
            (card) =>
                "subType" in card && filters.cardGroup.includes(card.subType)
        );
    }
    if (searchValue !== "") {
        cards = cards.filter(
            (card) =>
                card.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                card.displayName
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
        );
    }

    return cards.sort((a, b) => a.sortOrder - b.sortOrder);
}
