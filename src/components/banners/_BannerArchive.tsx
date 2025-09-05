import { BaseSyntheticEvent, useMemo, useState } from "react";

// Component imports
import BannerList from "./BannerList";
import ChronicledWish from "./ChronicledWish";
import ToggleButtons, { CustomToggleButtonProps } from "custom/ToggleButtons";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectWidth } from "reducers/settings";

function BannerArchive() {
    const documentTitle = `Banner Archive ${
        import.meta.env.VITE_DOCUMENT_TITLE
    }`;
    const documentDesc = `A list of all Genshin Impact Banners`;
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
    const matches_md_dn = useMediaQuery(theme.breakpoints.down("md"));

    const maxWidth = useAppSelector(selectWidth) === "wide" ? 5 : 6;

    const CharacterBannerList = useMemo(
        () => <BannerList type="character" />,
        []
    );
    const WeaponBannerList = useMemo(() => <BannerList type="weapon" />, []);
    const ChronicledWishList = useMemo(() => <ChronicledWish />, []);

    type BannerTypes = "character" | "weapon" | "chronicled";
    const [value, setValue] = useState<BannerTypes>("character");
    const handleValue = (_: BaseSyntheticEvent, newView: BannerTypes) => {
        if (newView !== null) {
            setValue(newView);
        }
    };

    const buttons: CustomToggleButtonProps[] = [];
    if (matches_md_dn) {
        buttons.push({ value: "character", label: "Character" });
        buttons.push({ value: "weapon", label: "Weapon" });
    } else {
        buttons.push({ value: "character", label: "Character/Weapon" });
    }
    buttons.push({ value: "chronicled", label: "Chronicled Wish" });

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
                        Banner Archive
                    </TextStyled>
                </Grid>
                <Grid size="auto">
                    <ToggleButtons
                        buttons={buttons}
                        value={value}
                        exclusive
                        onChange={handleValue}
                        spacing={0}
                        padding={7}
                        highlightOnHover={false}
                    />
                </Grid>
            </Grid>
            {!matches_md_dn ? (
                value === "character" || value === "weapon" ? (
                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, lg: 6, xl: maxWidth }}>
                            {CharacterBannerList}
                        </Grid>
                        <Grid size={{ xs: 12, lg: 6, xl: maxWidth }}>
                            {WeaponBannerList}
                        </Grid>
                    </Grid>
                ) : (
                    <>{ChronicledWishList}</>
                )
            ) : (
                <>
                    {value === "character" && CharacterBannerList}
                    {value === "weapon" && WeaponBannerList}
                    {value === "chronicled" && ChronicledWishList}
                </>
            )}
        </>
    );
}

export default BannerArchive;
