import { BaseSyntheticEvent, useState } from "react";

// Component imports
import TCGInfoCard from "./TCGInfoCard";
import SearchBar from "custom/SearchBar";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectActionCards, selectCharacterCards } from "reducers/tcg";

function TCGBrowser() {
    const documentTitle = `TCG ${import.meta.env.VITE_DOCUMENT_TITLE}`;
    const documentDesc = `A list of all Genshin Impact Genius Invocation TCG cards`;
    document.title = documentTitle;
    document
        .querySelector('meta[property="og:title"]')
        ?.setAttribute("content", documentTitle);
    document
        .querySelector('meta[property="description"]')
        ?.setAttribute("content", documentDesc);
    document
        .querySelector('meta[property="og:description"]')
        ?.setAttribute("content", documentDesc);

    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const characterCards = [...useAppSelector(selectCharacterCards)].sort(
        (a, b) => a.sortOrder - b.sortOrder
    );
    const actionCards = [...useAppSelector(selectActionCards)].sort(
        (a, b) => a.sortOrder - b.sortOrder
    );
    const cards = [...characterCards, ...actionCards];

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = (event: BaseSyntheticEvent) => {
        setSearchValue(event.target.value);
    };

    const currentCards = cards;

    return (
        <>
            <Grid
                container
                rowSpacing={2}
                columnSpacing={3}
                sx={{ mb: "20px" }}
            >
                <Grid size="auto">
                    <TextStyled variant="h5-styled" sx={{ lineHeight: "36px" }}>
                        TCG
                    </TextStyled>
                </Grid>
                <Grid size={{ xs: 12, sm: "auto" }}>
                    <SearchBar
                        placeholder="Search"
                        value={searchValue}
                        onChange={handleInputChange}
                        size={{ height: "36px" }}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                {currentCards.map((card) => (
                    <TCGInfoCard
                        key={card.name}
                        id={`tcg-${card.sortOrder}-tcgBrowser`}
                        name={card.name}
                        displayName={card.displayName}
                        type={"talents" in card ? "character" : "action"}
                        infoMain={{
                            hp: "talents" in card ? card.hp : undefined,
                            cost: "cost" in card ? card.cost : undefined,
                            energy:
                                "talents" in card
                                    ? card.talents.burst.cost?.split(" ")[1]
                                    : undefined,
                        }}
                        infoSecondary={{
                            energy:
                                "talents" in card
                                    ? card.talents.burst.cost
                                    : undefined,
                        }}
                    />
                ))}
            </Grid>
        </>
    );
}

export default TCGBrowser;
