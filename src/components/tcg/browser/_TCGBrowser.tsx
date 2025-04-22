import { BaseSyntheticEvent, useEffect, useMemo, useState } from "react";

// Component imports
import TCGFilters from "./TCGFilters";
import TCGInfoCard from "./TCGInfoCard";
import SearchBar from "custom/SearchBar";
import ActionFab from "custom/ActionFab";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, Button, Drawer } from "@mui/material";
import Grid from "@mui/material/Grid2";
import TuneIcon from "@mui/icons-material/Tune";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { filterTCGCards } from "helpers/filterTCGCards";
import { selectActionCards, selectCharacterCards } from "reducers/tcg";
import { clearFilters, selectTCGFilters } from "reducers/tcgFilters";
import { isRightDrawerOpen, toggleRightDrawer } from "reducers/layout";

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

    const dispatch = useAppDispatch();

    const characterCards = [...useAppSelector(selectCharacterCards)];
    const actionCards = [...useAppSelector(selectActionCards)];
    const cards = [...characterCards, ...actionCards];
    const filters = useAppSelector(selectTCGFilters);

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = (event: BaseSyntheticEvent) => {
        setSearchValue(event.target.value);
    };

    const currentCards = useMemo(
        () => filterTCGCards(cards, filters, searchValue),
        [cards, filters, searchValue]
    );

    const drawerOpen = useAppSelector(isRightDrawerOpen);
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const toggleDrawerState = () => {
        dispatch(toggleRightDrawer());
    };
    const handleMobileDrawerOpen = () => {
        setMobileDrawerOpen(true);
    };
    const handleMobileDrawerClose = () => {
        setMobileDrawerOpen(false);
    };

    useEffect(() => {
        dispatch(clearFilters());
    }, []);

    useEffect(() => {
        dispatch(toggleRightDrawer(matches_md_up));
    }, [matches_md_up]);

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
                <Grid size={{ xs: 12, sm: "auto" }}>
                    <Button
                        onClick={
                            matches_md_up
                                ? toggleDrawerState
                                : handleMobileDrawerOpen
                        }
                        variant="contained"
                        color="primary"
                        disableElevation
                        disableRipple
                        startIcon={
                            matches_md_up && drawerOpen ? (
                                <KeyboardArrowRightIcon />
                            ) : (
                                <TuneIcon />
                            )
                        }
                        sx={{ height: "36px" }}
                    >
                        Filters
                    </Button>
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
                        size={matches_sm_up ? "128px" : "96px"}
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
            <ActionFab
                action={
                    matches_md_up ? toggleDrawerState : handleMobileDrawerOpen
                }
                icon={<TuneIcon />}
                tooltip="Open filters"
                tooltipArrow="left"
            />
            {!matches_md_up && (
                <Drawer
                    sx={theme.styles.drawer(matches_sm_up)}
                    variant="temporary"
                    anchor={matches_sm_up ? "right" : "bottom"}
                    open={mobileDrawerOpen}
                    onClose={handleMobileDrawerClose}
                >
                    <TCGFilters handleClose={handleMobileDrawerClose} />
                </Drawer>
            )}
        </>
    );
}

export default TCGBrowser;
