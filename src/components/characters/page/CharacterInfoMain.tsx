// Component imports
import Image from "custom/Image";
import InfoChip from "custom/InfoChip";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { useTheme, Box, Card, Divider, Stack } from "@mui/material";

// Type imports
import { CharacterProps } from "types/character";

function CharacterInfoMain({ character }: CharacterProps) {
    const theme = useTheme();

    const { fullName, title, rarity, element, weapon, description } = character;

    // const visionImg =
    //     nation === "Fontaine"
    //         ? `visions/${nation}_${element}_${character.arkhe}`
    //         : `visions/${nation}_${element}`;

    return (
        <Card
            sx={{
                p: "16px 24px",
                backgroundColor: theme.background(2),
            }}
        >
            <Stack spacing={2} divider={<Divider />}>
                <FlexBox
                    sx={{ flexWrap: "wrap", columnGap: "24px", rowGap: "8px" }}
                >
                    <Image
                        src={`tcg/icons/elements/${element}`}
                        alt={element}
                        style={{ width: "72px" }}
                        tooltip={element}
                    />

                    <Box>
                        <Box sx={{ mb: "8px" }}>
                            <TextStyled variant="h4-styled">
                                {fullName}
                            </TextStyled>
                            {title && (
                                <TextStyled
                                    sx={{ mt: "4px", fontStyle: "italic" }}
                                >
                                    {title}
                                </TextStyled>
                            )}
                        </Box>
                        <FlexBox sx={{ flexWrap: "wrap", gap: "8px" }}>
                            <Image
                                src={`stars/Icon_${rarity}_Stars`}
                                alt={rarity.toString()}
                                style={{
                                    padding: "4px 8px",
                                    height: "32px",
                                    backgroundColor:
                                        theme.palette.tertiary.main,
                                    borderRadius: "64px",
                                }}
                            />
                            <InfoChip
                                color="tertiary"
                                src={`weapons/icons/${weapon}`}
                                label={weapon}
                            />
                            {character.arkhe &&
                                character.arkhe.map((arkhe) => (
                                    <InfoChip
                                        key={arkhe}
                                        color="tertiary"
                                        src={`tcg/icons/factions/${arkhe}`}
                                        label={`Arkhe: ${arkhe}`}
                                    />
                                ))}
                        </FlexBox>
                    </Box>
                </FlexBox>
                {description && (
                    <TextStyled
                        variant="subtitle1-styled"
                        sx={{ fontStyle: "italic" }}
                    >
                        {description}
                    </TextStyled>
                )}
            </Stack>
        </Card>
    );
}

export default CharacterInfoMain;
