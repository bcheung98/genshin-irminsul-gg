import { BaseSyntheticEvent, useEffect, useState } from "react";

// Component imports
import ChronicledWishRow from "./ChronicledWishRow";
import MainContentBox from "custom/MainContentBox";
import ToggleButtons from "custom/ToggleButtons";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { useTheme, Stack, Divider } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectCharacters } from "reducers/character";
import { selectWeapons } from "reducers/weapon";
import { selectChronicledWish } from "reducers/banner";
import { createChronicledWishData } from "helpers/createBannerData";

// Type imports
import { ChronicledWishBanner, ChronicledWishBannerData } from "types/banner";

function ChronicledWish() {
    const theme = useTheme();

    const banners = useAppSelector(selectChronicledWish);
    const characters = useAppSelector(selectCharacters);
    const weapons = useAppSelector(selectWeapons);
    const loading = [...characters, ...weapons].length === 0;

    const [rows, setRows] = useState<ChronicledWishBannerData[]>([]);

    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const handleDirectionChange = (
        _: BaseSyntheticEvent,
        newDirection: "asc" | "desc"
    ) => {
        if (newDirection !== null) {
            setSortDirection(newDirection);
        }
    };

    useEffect(() => {}, [characters, weapons]);

    useEffect(() => {
        setRows(createChronicledBannerRows(banners));
    }, [banners, sortDirection]);

    function createChronicledBannerRows(banners: ChronicledWishBanner[]) {
        let bannerData: ChronicledWishBannerData[] = [];
        banners.forEach((banner) => {
            bannerData.push({
                ...banner,
                characters: createChronicledWishData(
                    banner.characters,
                    "character",
                    characters,
                    weapons
                ),
                weapons: createChronicledWishData(
                    banner.weapons,
                    "weapon",
                    characters,
                    weapons
                ),
            });
        });
        if (sortDirection === "asc") {
            bannerData = bannerData.reverse();
        }
        return bannerData;
    }

    return (
        <MainContentBox
            title={
                <FlexBox
                    sx={{
                        width: "100%",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <TextStyled sx={{ color: theme.appbar.color }}>
                        Chronicled Wish
                    </TextStyled>
                    <ToggleButtons
                        color="primary"
                        buttons={[
                            {
                                value: "asc",
                                icon: <ArrowUpwardIcon fontSize="small" />,
                            },
                            {
                                value: "desc",
                                icon: <ArrowDownwardIcon fontSize="small" />,
                            },
                        ]}
                        value={sortDirection}
                        exclusive
                        onChange={handleDirectionChange}
                        highlightOnHover={false}
                    />
                </FlexBox>
            }
            contentProps={{ padding: 0 }}
        >
            <Stack divider={<Divider />}>
                {rows.map((row, idx) => (
                    <ChronicledWishRow key={idx} loading={loading} row={row} />
                ))}
            </Stack>
        </MainContentBox>
    );
}

export default ChronicledWish;
