import { useState } from "react";

// Component imports
import TCGInfoMain from "./TCGInfoMain";
import TCGCostIcon from "../TCGCostIcon";
import TCGKeywordPopup from "./TCGKeywordPopup";
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import { FlexBox } from "styled/StyledBox";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, Box, Stack, Dialog } from "@mui/material";

// Helper imports
import { objectKeys } from "helpers/utils";
import { parseTCGSkillDescription } from "helpers/parseTCGSkillDescription";
import { useAppSelector } from "helpers/hooks";
import { tcgCommonKeywords } from "data/tcg/tcgCommonKeywords";
import { selectCharacterCards, selectKeywords } from "reducers/tcg";

// Type imports
import { TCGCardProps, TCGKeyword, TCGTalents, TCGWeaponType } from "types/tcg";

function TCGCardSkill({ card }: TCGCardProps) {
    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const characterCards = useAppSelector(selectCharacterCards);
    const keywords = [...tcgCommonKeywords, ...useAppSelector(selectKeywords)];

    const [currentKeyword, setCurrentKeyword] = useState<TCGKeyword | null>(
        null
    );
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogOpen = (event: React.BaseSyntheticEvent) => {
        let keyword: TCGKeyword | undefined;
        const tag = event.target.className.split("-")[1];
        if (tag.startsWith("_")) {
            const [_, charName, talentKey] = tag.split("_");
            const character = characterCards.find(
                (char) => char.name.toLowerCase() === charName
            );
            if (character) {
                const skill = character.talents[talentKey as keyof TCGTalents];
                if (skill) {
                    keyword = {
                        tag: tag,
                        name: skill.name,
                        type: formatTCGTalentKey(talentKey),
                        cost: skill.cost,
                        icon: `${getSkillIcon(
                            talentKey,
                            character.name,
                            character.weaponType,
                            character.talents
                        )}`,
                        description: skill.description,
                    };
                }
            }
        } else {
            keyword = keywords.find((key) => key.tag === tag);
        }
        if (keyword) {
            setCurrentKeyword(keyword);
            setDialogOpen(true);
        }
    };
    const handleDialogClose = () => {
        setCurrentKeyword(null);
        setDialogOpen(false);
    };

    return (
        <>
            <MainContentBox
                title={<TCGInfoMain card={card} />}
                headerProps={{ padding: 0 }}
            >
                {"talents" in card ? (
                    <Stack spacing={2}>
                        {objectKeys(card.talents).map((key, index) => (
                            <Stack
                                key={index}
                                spacing={1}
                                sx={{
                                    p: 2,
                                    backgroundColor: theme.background(
                                        1,
                                        "light"
                                    ),
                                    border: theme.mainContentBox.border,
                                    borderRadius:
                                        theme.mainContentBox.borderRadius,
                                }}
                            >
                                <FlexBox
                                    sx={{
                                        flexWrap: "wrap",
                                        gap: "8px",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Stack
                                        spacing={2}
                                        direction="row"
                                        alignItems="center"
                                    >
                                        <Image
                                            src={`tcg/${getSkillIcon(
                                                key,
                                                card.name,
                                                card.weaponType,
                                                card.talents
                                            )}`}
                                            alt={key}
                                            style={theme.styles.skillIcon(
                                                card.element
                                            )}
                                        />
                                        <Box>
                                            <TextStyled variant="h6-styled">
                                                {card.talents[key]?.name}
                                            </TextStyled>
                                            <TextStyled
                                                sx={{
                                                    color: theme.text.highlight,
                                                }}
                                            >
                                                {formatTCGTalentKey(key)}
                                            </TextStyled>
                                        </Box>
                                    </Stack>
                                    {card.talents[key]?.cost && (
                                        <TCGCostIcon
                                            cost={card.talents[key].cost}
                                            orientation="row"
                                            size={
                                                matches_md_up ? "40px" : "32px"
                                            }
                                        />
                                    )}
                                </FlexBox>
                                <Text
                                    component="span"
                                    sx={{ color: theme.text.description }}
                                >
                                    {parseTCGSkillDescription({
                                        description:
                                            card.talents[key]!.description,
                                        onClick: handleDialogOpen,
                                        theme: theme,
                                        matches: matches_sm_up,
                                    })}
                                </Text>
                            </Stack>
                        ))}
                    </Stack>
                ) : (
                    <Text
                        component="span"
                        sx={{ color: theme.text.description }}
                    >
                        {parseTCGSkillDescription({
                            description: card.description,
                            onClick: handleDialogOpen,
                            theme: theme,
                            matches: matches_sm_up,
                        })}
                    </Text>
                )}
            </MainContentBox>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                maxWidth="md"
                fullWidth
                disableScrollLock={matches_md_up}
            >
                <TCGKeywordPopup
                    keyword={currentKeyword}
                    handleClose={handleDialogClose}
                />
            </Dialog>
        </>
    );
}

export default TCGCardSkill;

function getSkillIcon(
    key: keyof TCGTalents,
    name: string,
    weapon: TCGWeaponType,
    talents: TCGTalents
) {
    let src: string;
    if (key === "attack") {
        if (weapon === "Other Weapons") {
            if (talents.attack.description.includes("Physical DMG")) {
                src = `character_talent_icons/attack_other_weapons`;
            } else {
                src = `character_talent_icons/attack_catalyst`;
            }
        } else {
            src = `character_talent_icons/attack_${weapon.toLowerCase()}`;
        }
    } else {
        src = `character_talent_icons/${name.toLowerCase()}_${key}`;
    }
    return src;
}

function formatTCGTalentKey(key: string) {
    switch (key) {
        case "attack":
        case "attack2":
            key = "Normal Attack";
            break;
        case "skill":
        case "skill2":
            key = "Elemental Skill";
            break;
        case "burst":
            key = "Elemental Burst";
            break;
        case "passive":
        case "passive2":
            key = "Passive Skill";
            break;
        default:
            key = "Combat Talent";
    }
    return key;
}
