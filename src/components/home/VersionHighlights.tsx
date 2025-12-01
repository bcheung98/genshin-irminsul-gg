import { CSSProperties, useState } from "react";

// Component imports
import Image from "custom/Image";
import InfoCard from "custom/InfoCard";
import TCGInfoCard from "components/tcg/browser/TCGInfoCard";
import MainContentBox from "custom/MainContentBox";
import { FlexBox } from "styled/StyledBox";
import { TextStyled } from "styled/StyledTypography";
import { StyledInput } from "styled/StyledInput";
import { StyledMenuItem } from "styled/StyledMenu";

// MUI imports
import {
    useTheme,
    SxProps,
    Box,
    Select,
    SelectChangeEvent,
    IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// Helper imports
import { updates } from "data/versions";
import { useAppSelector } from "helpers/hooks";
import { selectCharacters } from "reducers/character";
import { selectWeapons } from "reducers/weapon";
import { selectArtifacts } from "reducers/artifact";
import { selectActionCards, selectCharacterCards } from "reducers/tcg";

function VersionHighlights() {
    const theme = useTheme();

    const [index, setIndex] = useState(0);
    const handleIndexChange = (event: SelectChangeEvent) => {
        setIndex(Number(event.target.value));
    };
    const handleIndexChangeLeft = () => {
        if (index + 1 < updates.length) {
            setIndex(index + 1);
        }
    };
    const handleIndexChangeRight = () => {
        if (index - 1 >= 0) {
            setIndex(index - 1);
        }
    };

    const buttonStyle: SxProps = {
        color: theme.appbar.color,
        px: 0,
        "&.Mui-disabled": {
            opacity: 0.35,
            color: theme.appbar.color,
        },
    };

    const gridContainerStyle: SxProps = {
        minWidth: "40%",
        maxWidth: "100%",
    };

    const gridStyle: SxProps = {
        p: 2,
        maxHeight: "720px",
        overflowY: "auto",
    };

    const iconStyle: CSSProperties = {
        width: "32px",
        marginRight: "8px",
        backgroundColor: theme.icon.backgroundColor,
        borderRadius: "64px",
    };

    const version = updates[index].version;

    const characters = useAppSelector(selectCharacters)
        .filter((char) => char.release.version === version)
        .sort(
            (a, b) =>
                b.rarity - a.rarity || a.fullName.localeCompare(b.fullName)
        );
    const weapons = useAppSelector(selectWeapons)
        .filter((wep) => wep.release.version === version)
        .sort(
            (a, b) =>
                b.rarity - a.rarity ||
                a.displayName.localeCompare(b.displayName)
        );
    const artifacts = useAppSelector(selectArtifacts)
        .filter((artifact) => artifact.release.version === version)
        .sort(
            (a, b) =>
                b.rarity - a.rarity ||
                a.displayName.localeCompare(b.displayName)
        );
    const cards = [
        ...useAppSelector(selectCharacterCards),
        ...useAppSelector(selectActionCards),
    ]
        .filter((card) => card.release.version === version)
        .sort((a, b) => a.sortOrder - b.sortOrder);

    return (
        <MainContentBox
            title="Version Highlights"
            actions={
                <FlexBox>
                    <Box sx={{ width: "24px" }}>
                        <IconButton
                            onClick={handleIndexChangeLeft}
                            disabled={index >= updates.length - 1}
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
                        sx={{ mx: "4px", width: "104px" }}
                    >
                        {updates.map((version, index) => (
                            <StyledMenuItem key={index} value={index}>
                                <TextStyled>{version.version}</TextStyled>
                            </StyledMenuItem>
                        ))}
                    </Select>
                    <Box sx={{ width: "24px" }}>
                        <IconButton
                            onClick={handleIndexChangeRight}
                            disabled={index === 0}
                            sx={buttonStyle}
                            disableRipple
                        >
                            <KeyboardArrowRightIcon />
                        </IconButton>
                    </Box>
                </FlexBox>
            }
            contentProps={{ overflowX: "clip" }}
        >
            <TextStyled variant="h5-styled" sx={{ mb: "20px" }}>
                {updates[index].version} - <i>{updates[index].name}</i>
            </TextStyled>
            <Grid container columnSpacing={{ xs: 6, md: 10 }} rowSpacing={3}>
                {characters.length > 0 && (
                    <Grid sx={gridContainerStyle} size="auto">
                        <FlexBox>
                            <Image
                                src="icons/Aether"
                                alt="New Characters"
                                style={iconStyle}
                            />
                            <TextStyled variant="h6-styled">
                                New Characters
                            </TextStyled>
                        </FlexBox>
                        <Grid container spacing={3} sx={gridStyle}>
                            {characters.map((char, index) => (
                                <InfoCard
                                    key={index}
                                    id={`${char.name}-versionHighlights`}
                                    name={char.name}
                                    displayName={char.fullName}
                                    type="character"
                                    rarity={char.rarity}
                                    info={{
                                        element: char.element,
                                        weapon: char.weapon,
                                    }}
                                    backgroundColor={theme.background(
                                        0,
                                        "light"
                                    )}
                                />
                            ))}
                        </Grid>
                    </Grid>
                )}
                {weapons.length > 0 && (
                    <Grid sx={gridContainerStyle} size="auto">
                        <FlexBox>
                            <Image
                                src="icons/Weapons"
                                alt="New Weapons"
                                style={iconStyle}
                            />
                            <TextStyled variant="h6-styled">
                                New Weapons
                            </TextStyled>
                        </FlexBox>
                        <Grid container spacing={3} sx={gridStyle}>
                            {weapons.map((weapon, index) => (
                                <InfoCard
                                    key={index}
                                    id={`${weapon.name}-versionHighlights`}
                                    name={weapon.name}
                                    displayName={weapon.displayName}
                                    type="weapon"
                                    rarity={weapon.rarity}
                                    info={{
                                        weapon: weapon.type,
                                        subStat: weapon.stats.subStat,
                                    }}
                                />
                            ))}
                        </Grid>
                    </Grid>
                )}
                {artifacts.length > 0 && (
                    <Grid sx={gridContainerStyle} size="auto">
                        <FlexBox>
                            <Image
                                src="icons/Artifact"
                                alt="New Artifacts"
                                style={iconStyle}
                            />
                            <TextStyled variant="h6-styled">
                                New Artifacts
                            </TextStyled>
                        </FlexBox>
                        <Grid container spacing={3} sx={gridStyle}>
                            {artifacts.map((artifact, index) => (
                                <InfoCard
                                    key={index}
                                    id={`${artifact.name}-versionHighlights`}
                                    name={artifact.name}
                                    displayName={artifact.name}
                                    type="artifact"
                                    rarity={artifact.rarity}
                                />
                            ))}
                        </Grid>
                    </Grid>
                )}
                {cards.length > 0 && (
                    <Grid sx={gridContainerStyle} size="auto">
                        <FlexBox sx={{ mb: "8px" }}>
                            <Image
                                src="icons/TCG"
                                alt="New TCG Cards"
                                style={iconStyle}
                            />
                            <TextStyled variant="h6-styled">
                                New TCG Cards
                            </TextStyled>
                        </FlexBox>
                        <Grid container spacing={3} sx={gridStyle}>
                            {cards.map((card, index) => (
                                <TCGInfoCard
                                    key={index}
                                    id={`tcg-${card.name}-versionHighlights`}
                                    name={card.name}
                                    displayName={card.displayName}
                                    type={
                                        "talents" in card
                                            ? "character"
                                            : "action"
                                    }
                                />
                            ))}
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </MainContentBox>
    );
}

export default VersionHighlights;
