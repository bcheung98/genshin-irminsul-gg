import { useState, BaseSyntheticEvent } from "react";

// Component imports
import CharacterSkillKeywordPopup from "./skills/CharacterSkillKeywordPopup";
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Stack, Box, Dialog } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { objectKeys } from "helpers/utils";
import { parseSkillDescription } from "helpers/parseSkillDescription";
import { getSkillKeyword } from "helpers/getSkillKeyword";

// Type imports
import { CharacterProps } from "types/character";
import { SkillKeyword } from "types/skill";

function CharacterConstellation({ character }: CharacterProps) {
    const theme = useTheme();

    const { name, element, constellation } = character;

    const [currentKeyword, setCurrentKeyword] = useState<SkillKeyword | null>(
        null
    );
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogOpen = (event: BaseSyntheticEvent) => {
        const keyword = getSkillKeyword({
            tag: event.target.className.split("-")[1],
            character,
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
            <MainContentBox title="Constellation">
                <Grid container spacing={3}>
                    {objectKeys(constellation).map(
                        (key, index) =>
                            key !== "name" && (
                                <Grid
                                    key={key}
                                    size={{ xs: 12, md: 6 }}
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
                                    <Stack
                                        key={index}
                                        spacing={2}
                                        direction="row"
                                        alignItems="center"
                                        sx={{ mb: "8px" }}
                                    >
                                        <Image
                                            src={`characters/constellations/${name.toLowerCase()}_${key}`}
                                            alt={key}
                                            style={theme.styles.skillIcon(
                                                element
                                            )}
                                        />
                                        <Box>
                                            <TextStyled variant="h6-styled">
                                                {constellation[key].name}
                                            </TextStyled>
                                            <TextStyled
                                                sx={{ fontStyle: "italic" }}
                                            >
                                                {key.toUpperCase()}
                                            </TextStyled>
                                        </Box>
                                    </Stack>
                                    <Text
                                        component="span"
                                        sx={{ color: theme.text.description }}
                                    >
                                        {parseSkillDescription({
                                            description:
                                                constellation[key].description,
                                            onClick: handleDialogOpen,
                                        })}
                                    </Text>
                                </Grid>
                            )
                    )}
                </Grid>
            </MainContentBox>
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

export default CharacterConstellation;
