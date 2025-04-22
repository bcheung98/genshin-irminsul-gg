import { useParams } from "react-router";

// Component imports
import TCGInfoCard from "../browser/TCGInfoCard";
import TCGCardSkill from "./TCGCardSkill";
import BetaTag from "custom/BetaTag";
import PageNotFound from "components/PageNotFound";

// MUI imports
import { useTheme, useMediaQuery, Stack, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectCharacterCards, selectActionCards } from "reducers/tcg";

function TCGPage() {
    const theme = useTheme();
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const params = useParams<{ name: string }>();
    const card = [
        ...useAppSelector(selectCharacterCards),
        ...useAppSelector(selectActionCards),
    ].find(
        (card) => card.name.split(" ").join("_").toLowerCase() === params.name
    );

    if (card !== undefined) {
        const documentTitle = `${card.displayName} (TCG) ${
            import.meta.env.VITE_DOCUMENT_TITLE
        }`;
        const documentDesc = `${card.displayName} (TCG)`;
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

        const betaTag = <BetaTag version={card.release.version} />;

        const cardSplash = (
            <TCGInfoCard
                size={matches_md_up ? "256px" : "192px"}
                name={card.name}
                type={"talents" in card ? "character" : "action"}
                showName={false}
                infoMain={{
                    hp: "talents" in card ? card.hp : undefined,
                    cost: "cost" in card ? card.cost : undefined,
                }}
                // infoSecondary={{
                //     energy:
                //         "talents" in card ? card.talents.burst.cost : undefined,
                // }}
                disableLink
                disableZoomOnHover
            />
        );
        const cardSkill = <TCGCardSkill card={card} />;

        return (
            <Stack spacing={2}>
                {matches_md_up ? (
                    <Grid container spacing={4}>
                        <Grid size="auto">
                            <Stack spacing={2} sx={{ ml: "24px" }}>
                                {cardSplash}
                            </Stack>
                        </Grid>
                        <Grid size="grow">
                            <Stack spacing={2}>
                                {betaTag}
                                {cardSkill}
                            </Stack>
                        </Grid>
                    </Grid>
                ) : (
                    <Stack direction="column">
                        {betaTag}
                        <Box sx={{ mx: "auto", my: "24px" }}>{cardSplash}</Box>
                        {cardSkill}
                    </Stack>
                )}
            </Stack>
        );
    } else {
        return <PageNotFound />;
    }
}

export default TCGPage;
