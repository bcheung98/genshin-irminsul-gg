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
