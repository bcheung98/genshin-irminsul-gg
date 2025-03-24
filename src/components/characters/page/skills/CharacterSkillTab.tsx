// Component imports
import CharacterSkillScaling from "./CharacterSkillScaling";
import CharacterSkillLevelUpCost from "./CharacterSkillLevelUpCost";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Box, Divider, Stack } from "@mui/material";

// Helper imports
import { parseSkillDescription } from "helpers/parseSkillDescription";

// Type imports
import { Element } from "types/_common";
import { CharacterSkillKey, CharacterSkills } from "types/character";
import { CharacterMaterials } from "types/materials";
import { LevelUpCostSkillKeys } from "custom/LevelUpCosts";
import { SkillWithScaling } from "types/skill";

interface CharacterSkillTabProps {
    mode: "table" | "slider";
    skills: CharacterSkills;
    skillKey: CharacterSkillKey;
    element: Element;
    materials: CharacterMaterials;
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
    skills,
    skillKey,
    element,
    materials,
}: CharacterSkillTabProps) {
    const theme = useTheme();

    const skill = skills[skillKey] as SkillWithScaling;

    return (
        <Stack spacing={3} divider={<Divider />} sx={{ pb: "16px" }}>
            <Box>
                <Box sx={{ mb: "24px" }}>
                    <TextStyled sx={{ mb: "8px", fontStyle: "italic" }}>
                        {formatSkillKey(skillKey)}
                    </TextStyled>
                    <TextStyled variant="h6-styled" sx={{ mb: "8px" }}>
                        {skill.name}
                    </TextStyled>
                    <Text
                        component="span"
                        sx={{ color: theme.text.description }}
                    >
                        {parseSkillDescription({
                            description: skill.description,
                        })}
                    </Text>
                </Box>
                <Text variant="subtitle1" sx={{ fontStyle: "italic" }}>
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
        </Stack>
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
