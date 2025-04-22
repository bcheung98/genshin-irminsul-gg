import parse from "html-react-parser";

// Component imports
import Image from "custom/Image";
import InfoChip from "custom/InfoChip";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { useTheme, Stack, Divider, Box } from "@mui/material";

// Type imports
import { TCGCardProps } from "types/tcg";

function TCGInfoMain({ card }: TCGCardProps) {
    const theme = useTheme();

    const title = "talents" in card ? card.fullName : card.displayName;

    return (
        <Box
            sx={{
                p: "16px 24px",
                backgroundColor: theme.background(2),
                width: "100%",
            }}
        >
            <Stack spacing={2} divider={<Divider />}>
                <FlexBox
                    sx={{ flexWrap: "wrap", columnGap: "24px", rowGap: "8px" }}
                >
                    {"talents" in card && (
                        <Image
                            src={`tcg/icons/elements/${card.element}`}
                            alt={card.element}
                            style={{ width: "72px" }}
                            tooltip={card.element}
                        />
                    )}
                    <Box>
                        <Box sx={{ mb: "8px" }}>
                            <TextStyled variant="h4-styled">{title}</TextStyled>
                        </Box>
                        <FlexBox sx={{ flexWrap: "wrap", gap: "8px" }}>
                            {"talents" in card ? (
                                <>
                                    <InfoChip
                                        color="info"
                                        src={`tcg/icons/weapons/${card.weaponType}`}
                                        label={card.weaponType}
                                    />
                                    {card.factions.map((faction, index) => (
                                        <InfoChip
                                            key={index}
                                            color="tertiary"
                                            src={`tcg/icons/factions/${faction}`}
                                            label={faction}
                                        />
                                    ))}
                                    {card.arkhe && (
                                        <InfoChip
                                            color="tertiary"
                                            src={`tcg/icons/elements/arkhe/${card.arkhe}`}
                                            label={`Arkhe: ${card.arkhe}`}
                                        />
                                    )}
                                </>
                            ) : (
                                <>
                                    <InfoChip
                                        color="info"
                                        label={`${card.type} Card`}
                                    />
                                    {card.subType &&
                                        card.subType !== "Other" && (
                                            <InfoChip
                                                color="tertiary"
                                                src={`tcg/icons/subtypes/${card.subType}`}
                                                label={card.subType}
                                            />
                                        )}
                                    {card.combatAction && (
                                        <InfoChip
                                            color="tertiary"
                                            src={`tcg/icons/subtypes/Combat_Action`}
                                            label="Combat Action"
                                        />
                                    )}
                                    {card.weaponType && (
                                        <InfoChip
                                            color="tertiary"
                                            src={`tcg/icons/weapons/${card.weaponType}`}
                                            label={card.weaponType}
                                        />
                                    )}
                                </>
                            )}
                        </FlexBox>
                    </Box>
                </FlexBox>
                <Box sx={{ maxHeight: "112px", overflowY: "auto", pr: "16px" }}>
                    <TextStyled
                        variant="subtitle1-styled"
                        sx={{ fontStyle: "italic" }}
                    >
                        {parse(card.splash.description)}
                    </TextStyled>
                </Box>
            </Stack>
        </Box>
    );
}

export default TCGInfoMain;
