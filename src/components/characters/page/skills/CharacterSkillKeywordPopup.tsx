// Component imports
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Box, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Helper imports
import { parseSkillDescription } from "helpers/parseSkillDescription";

// Type imports
import { Element } from "types/_common";
import { SkillKeyword } from "types/skill";
import { CharacterPassiveType, CharacterSkillKey } from "types/character";

interface CharacterSkillKeywordPopupProps {
    handleClose: () => void;
    element: Element;
    keyword: SkillKeyword | null;
}

function CharacterSkillKeywordPopup({
    handleClose,
    element,
    keyword,
}: CharacterSkillKeywordPopupProps) {
    const theme = useTheme();

    return (
        <Box sx={{ overflowY: "auto", scrollbarWidth: "thin" }}>
            {keyword && (
                <MainContentBox
                    title={keyword.type ? "Related Talents" : "Related effects"}
                    actions={
                        <IconButton
                            disableRipple
                            onClick={handleClose}
                            sx={{ color: theme.appbar.color, p: 0 }}
                        >
                            <CloseIcon />
                        </IconButton>
                    }
                    contentProps={{ padding: "16px" }}
                >
                    <Stack
                        spacing={2}
                        direction="row"
                        alignItems="center"
                        sx={{ mb: keyword.icon ? "16px" : "8px" }}
                    >
                        {keyword.icon && (
                            <Image
                                src={keyword.icon}
                                alt={keyword.tag}
                                style={theme.styles.skillIcon(element)}
                            />
                        )}
                        <Box>
                            <TextStyled variant="h6-styled">
                                {keyword.name}
                            </TextStyled>
                            <TextStyled sx={{ fontStyle: "italic" }}>
                                {formatTalentKey(keyword.talentKey)}
                            </TextStyled>
                        </Box>
                    </Stack>
                    <Text
                        component="span"
                        sx={{ color: theme.text.description }}
                    >
                        {parseSkillDescription({
                            description: keyword?.description || "",
                            disableLink: true,
                        })}
                    </Text>
                </MainContentBox>
            )}
        </Box>
    );
}

export default CharacterSkillKeywordPopup;

function formatTalentKey(
    key: CharacterSkillKey | CharacterPassiveType | undefined
) {
    switch (key) {
        case "attack":
            return "Normal Attack";
        case "skill":
            return "Elemental Skill";
        case "burst":
            return "Elemental Burst";
        case "altsprint":
            return "Alternate Sprint";
        case "a1":
        case "a4":
        case "nightsoul":
        case "util":
        case "":
            return "Passive Talent";
    }
}
