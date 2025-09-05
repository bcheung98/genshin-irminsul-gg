// Component imports
import InfoCard from "custom/InfoCard";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, getContrastRatio, Box, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectServer } from "reducers/settings";
import { getRarity } from "helpers/createBannerData";
import { createDateObject, isCurrentBanner } from "helpers/dates";
import { isTBA } from "helpers/utils";

// Type imports
import { ChronicledWishBannerData } from "types/banner";

function ChronicledWishRow({
    loading,
    row,
}: {
    loading: boolean;
    row: ChronicledWishBannerData;
}) {
    const theme = useTheme();

    const region = useAppSelector(selectServer);

    const { version, subVersion } = row;

    const characters = [
        ...row.characters.fiveStars,
        ...row.characters.fourStars,
    ];
    const weapons = [...row.weapons.fiveStars, ...row.weapons.fourStars];

    const start = createDateObject({ date: row.start, region: region });
    const end = createDateObject({ date: row.end, region: region });

    const backgroundColor = isCurrentBanner(start.obj, end.obj)
        ? theme.palette.info.dark
        : theme.palette.background.paper;

    return (
        <Box sx={{ backgroundColor: backgroundColor, p: "8px 16px" }}>
            <TextStyled
                sx={{
                    mb: "8px",
                    color:
                        getContrastRatio(backgroundColor, theme.text.primary) >
                        4.5
                            ? theme.text.primary
                            : theme.text.contrast,
                }}
            >
                {`${version} Phase ${subVersion.split(".")[2]}: ${
                    start.date
                } — ${end.date}`}
            </TextStyled>
            <Stack spacing={1}>
                <Grid container spacing={1}>
                    {characters.map((item, index) => (
                        <InfoCard
                            key={index}
                            id={`${item.displayName}-${subVersion}-${index}`}
                            variant="icon"
                            type="character"
                            name={item.name}
                            displayName={item.displayName}
                            rarity={getRarity(item.name, item.rarity)}
                            disableLink={isTBA(item.name)}
                            disableZoomOnHover={isTBA(item.name)}
                            loading={loading}
                            imgLoad="lazy"
                        />
                    ))}
                </Grid>
                <Grid container spacing={1}>
                    {weapons.map((item, index) => (
                        <InfoCard
                            key={index}
                            id={`${item.displayName}-${subVersion}-${index}`}
                            variant="icon"
                            type="weapon"
                            name={item.name}
                            displayName={item.displayName}
                            rarity={getRarity(item.name, item.rarity)}
                            disableLink={isTBA(item.name)}
                            disableZoomOnHover={isTBA(item.name)}
                            loading={loading}
                            imgLoad="lazy"
                        />
                    ))}
                </Grid>
            </Stack>
        </Box>
    );
}

export default ChronicledWishRow;
