import { BaseSyntheticEvent, useState } from "react";

// Component imports
import CharacterSkillScaling from "./CharacterSkillScaling";
import CharacterSkillLevelUpCost from "./CharacterSkillLevelUpCost";
import CharacterSkillKeywordPopup from "./CharacterSkillKeywordPopup";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Box, Stack, Dialog } from "@mui/material";

// Helper imports
import { parseSkillDescription } from "helpers/parseSkillDescription";
import { getSkillKeyword } from "helpers/getSkillKeyword";

// Type imports
import { Element } from "types/_common";
import { Character, CharacterBuffs, CharacterSkillKey } from "types/character";
import { CharacterMaterials } from "types/materials";
import { LevelUpCostSkillKeys } from "custom/LevelUpCosts";
import { SkillKeyword } from "types/skill";

interface CharacterSkillTabProps {
    mode: "table" | "slider";
    character: Character;
    skillKey: CharacterSkillKey;
    buffs?: CharacterBuffs;
}

export interface CharacterSkillScalingProps {
    mode: "table" | "slider";
    scaling: string[][];
    element: Element;
}

export interface CharacterSkillLevelUpProps {
    skillKey: LevelUpCostSkillKeys;
    element: Element;
    materials: CharacterMaterials;
}

function CharacterSkillTab({
    mode,
    character,
    skillKey,
    buffs,
}: CharacterSkillTabProps) {
    const theme = useTheme();

    const { element, materials } = character;
    let skillData = character.skills[skillKey]!;
    if (buffs && buffs?.value !== "v1" && skillData.length > 1) {
        skillData = skillData.filter(
            (skill) => skill.version?.value === buffs.value
        );
    } else {
        skillData = skillData.slice(0, 1);
    }

    const [currentKeyword, setCurrentKeyword] = useState<SkillKeyword | null>(
        null
    );
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogOpen = (event: BaseSyntheticEvent) => {
        const keyword = getSkillKeyword({
            tag: event.target.className.split("-")[1],
            character,
            buffValue: buffs?.value
        });
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
            <Stack spacing={1} sx={{ mb: 2 }}>
                <TextStyled sx={{ fontStyle: "italic" }}>
                    {formatSkillKey(skillKey)}
                </TextStyled>
                <Stack spacing={2}>
                    {skillData.map((skill, index) => (
                        <Box key={`${skillKey}-${index}`}>
                            <Box sx={{ mb: "24px" }}>
                                <TextStyled
                                    variant="h6-styled"
                                    sx={{ mb: "8px" }}
                                >
                                    {skill.name}
                                </TextStyled>
                                <Text
                                    component="span"
                                    sx={{ color: theme.text.description }}
                                >
                                    {parseSkillDescription({
                                        description: skill.description,
                                        onClick: handleDialogOpen,
                                    })}
                                </Text>
                            </Box>
                            <Text
                                variant="subtitle1"
                                sx={{ fontStyle: "italic" }}
                            >
                                {skill.splash &&
                                    parseSkillDescription({
                                        description: skill.splash,
                                    })}
                            </Text>
                            <Stack spacing={2} sx={{ mt: "24px" }}>
                                <CharacterSkillScaling
                                    mode={mode}
                                    scaling={skill.scaling}
                                    element={element}
                                />
                                {skillKey !== "altsprint" && (
                                    <CharacterSkillLevelUpCost
                                        skillKey={skillKey}
                                        element={element}
                                        materials={materials}
                                    />
                                )}
                            </Stack>
                        </Box>
                    ))}
                </Stack>
            </Stack>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                maxWidth="md"
                fullWidth
                disableScrollLock
            >
                <CharacterSkillKeywordPopup
                    keyword={currentKeyword}
                    element={element}
                    handleClose={handleDialogClose}
                />
            </Dialog>
        </>
    );
}

export default CharacterSkillTab;

function formatSkillKey(key: CharacterSkillKey) {
    switch (key) {
        case "attack":
            return "Normal Attack";
        case "skill":
            return "Elemental Skill";
        case "burst":
            return "Elemental Burst";
        case "altsprint":
            return "Alternate Sprint";
    }
}
