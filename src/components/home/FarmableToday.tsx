import { BaseSyntheticEvent, useState } from "react";

// Component imports
import Image from "custom/Image";
import InfoCard from "custom/InfoCard";
import MainContentBox from "custom/MainContentBox";
import { FlexBox } from "styled/StyledBox";
import { TextStyled } from "styled/StyledTypography";
import { StyledInput } from "styled/StyledInput";
import { StyledMenuItem } from "styled/StyledMenu";
import { TabPanel, StyledTab, StyledTabs } from "styled/StyledTabs";

// MUI imports
import {
    useTheme,
    SxProps,
    Box,
    Select,
    SelectChangeEvent,
    IconButton,
    Stack,
    Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// Helper imports
import { materialDates, weekdays } from "helpers/materialDates";
import { useAppSelector } from "helpers/hooks";
import { selectCharacters } from "reducers/character";
import { selectWeapons } from "reducers/weapon";
import { selectUnreleasedContent } from "reducers/settings";

function FarmableToday() {
    const theme = useTheme();

    const showUnreleased = useAppSelector(selectUnreleasedContent);

    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (_: BaseSyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const d = new Date().getDay();
    const today = weekday[d];

    const [index, setIndex] = useState(d);
    const handleIndexChange = (event: SelectChangeEvent) => {
        setIndex(Number(event.target.value));
    };
    const handleIndexChangeLeft = () => {
        if (index - 1 >= 0) {
            setIndex(index - 1);
        } else {
            setIndex(6);
        }
    };
    const handleIndexChangeRight = () => {
        if (index + 1 < weekdays.length) {
            setIndex(index + 1);
        } else {
            setIndex(0);
        }
    };

    const formatDayString = (day: string) => {
        if (day === today) {
            day += " (Today)";
        }
        return day;
    };

    const buttonStyle: SxProps = {
        color: theme.appbar.color,
        px: 0,
        "&.Mui-disabled": {
            opacity: 0.35,
            color: theme.appbar.color,
        },
    };

    const labelStyle = (index: number): SxProps => {
        const selected = index === tabValue;
        return {
            color: selected ? theme.text.selected : theme.text.primary,
        };
    };

    const farmableMats = materialDates(weekdays[index], showUnreleased);
    const characters = useAppSelector(selectCharacters)
        .filter((char) =>
            farmableMats.characters.includes(char.materials.talentBook)
        )
        .sort((a, b) => a.fullName.localeCompare(b.fullName));
    const weapons = useAppSelector(selectWeapons)
        .filter((wep) =>
            farmableMats.weapons.includes(wep.materials.weaponAscensionMat)
        )
        .sort(
            (a, b) =>
                b.rarity - a.rarity ||
                a.displayName.localeCompare(b.displayName)
        );

    return (
        <MainContentBox
            title="Farming Schedule"
            actions={
                <FlexBox>
                    <Box sx={{ width: "24px" }}>
                        <IconButton
                            onClick={handleIndexChangeLeft}
                            sx={buttonStyle}
                            disableRipple
                        >
                            <KeyboardArrowLeftIcon />
                        </IconButton>
                    </Box>
                    <Select
                        value={index.toString()}
                        label="Version"
                        onChange={handleIndexChange}
                        input={<StyledInput />}
                        sx={{ mx: "4px", width: "192px" }}
                    >
                        {weekdays.map((day, index) => (
                            <StyledMenuItem key={index} value={index}>
                                <TextStyled>{formatDayString(day)}</TextStyled>
                            </StyledMenuItem>
                        ))}
                    </Select>
                    <Box sx={{ width: "24px" }}>
                        <IconButton
                            onClick={handleIndexChangeRight}
                            sx={buttonStyle}
                            disableRipple
                        >
                            <KeyboardArrowRightIcon />
                        </IconButton>
                    </Box>
                </FlexBox>
            }
            contentProps={{ padding: "0px 0px 16px" }}
        >
            <StyledTabs
                value={tabValue}
                onChange={handleTabChange}
                sx={{
                    "& .MuiTabs-indicatorSpan": {
                        width: "100%",
                        backgroundColor: theme.text.selected,
                    },
                }}
            >
                <StyledTab
                    label={
                        <TextStyled sx={labelStyle(0)}>Characters</TextStyled>
                    }
                />
                <StyledTab
                    label={<TextStyled sx={labelStyle(1)}>Weapons</TextStyled>}
                />
            </StyledTabs>
            <TabPanel value={tabValue} index={0}>
                <Stack spacing={2} divider={<Divider />}>
                    {farmableMats["characters"].map((material, index) => (
                        <Box key={material}>
                            <Stack
                                spacing={1}
                                direction="row"
                                alignItems="center"
                                sx={{ mb: "8px" }}
                            >
                                <Image
                                    src={`materials/talent/${material}3`}
                                    alt={material}
                                    style={{ width: "40px", height: "40px" }}
                                />
                                <TextStyled variant="h6-styled">
                                    {material}
                                </TextStyled>
                            </Stack>
                            <Grid container spacing={1}>
                                {characters
                                    .filter((char) =>
                                        farmableMats["characters"][
                                            index
                                        ].includes(char.materials.talentBook)
                                    )
                                    .map((char) => (
                                        <InfoCard
                                            key={char.id}
                                            id={`${char.displayName}-farmableToday`}
                                            variant="icon"
                                            type="character"
                                            name={char.name}
                                            displayName={char.fullName}
                                            rarity={char.rarity}
                                        />
                                    ))}
                            </Grid>
                        </Box>
                    ))}
                </Stack>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <Stack spacing={2} divider={<Divider />}>
                    {farmableMats["weapons"].map((material, index) => (
                        <Box key={material}>
                            <Stack
                                spacing={1}
                                direction="row"
                                alignItems="center"
                                sx={{ mb: "8px" }}
                            >
                                <Image
                                    src={`materials/weapon/${material}4`}
                                    alt={material}
                                    style={{ width: "40px", height: "40px" }}
                                />
                                <TextStyled variant="h6-styled">
                                    {material}
                                </TextStyled>
                            </Stack>
                            <Grid container spacing={1}>
                                {weapons
                                    .filter((wep) =>
                                        farmableMats["weapons"][index].includes(
                                            wep.materials.weaponAscensionMat
                                        )
                                    )
                                    .map((wep) => (
                                        <InfoCard
                                            key={wep.id}
                                            id={`${wep.displayName}-farmableToday`}
                                            variant="icon"
                                            type="weapon"
                                            name={wep.name}
                                            displayName={wep.displayName}
                                            rarity={wep.rarity}
                                        />
                                    ))}
                            </Grid>
                        </Box>
                    ))}
                </Stack>
            </TabPanel>
        </MainContentBox>
    );
}

export default FarmableToday;
