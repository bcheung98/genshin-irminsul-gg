import { useState, BaseSyntheticEvent } from "react";

// Component imports
import CharacterBuffs from "./CharacterBuffs";
import CharacterSkillKeywordPopup from "./skills/CharacterSkillKeywordPopup";
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Stack, Box, Dialog } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { parseSkillDescription } from "helpers/parseSkillDescription";
import { getSkillKeyword } from "helpers/getSkillKeyword";

// Type imports
import { CharacterConstellations, CharacterProps } from "types/character";
import { SkillKeyword } from "types/skill";

function CharacterConstellation({ character, buffs }: CharacterProps) {
    const theme = useTheme();

    const { name, element } = character;

    const indexes: number[] = [];
    const constellation: CharacterConstellations[] = [];
    character.constellation.forEach((con) => {
        if (!indexes.includes(con.index)) {
            indexes.push(con.index);
            constellation.push(con);
        } else {
            if (buffs && buffs.value === con.version?.value) {
                constellation.pop();
                constellation.push(con);
            }
        }
    });

    const [currentKeyword, setCurrentKeyword] = useState<SkillKeyword | null>(
        null
    );
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogOpen = (event: BaseSyntheticEvent) => {
        const keyword = getSkillKeyword({
            tag: event.target.className.split("-")[1],
            character,
            buffValue: buffs?.value,
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
            <MainContentBox
                title="Constellation"
                actions={<CharacterBuffs {...buffs} />}
            >
                <Grid container spacing={3}>
                    {constellation.map((con, index) => (
                        <Grid
                            key={index}
                            size={{ xs: 12, md: 6 }}
                            sx={{
                                p: 2,
                                backgroundColor: theme.background(1, "light"),
                                border: theme.mainContentBox.border,
                                borderRadius: theme.mainContentBox.borderRadius,
                            }}
                        >
                            <Stack
                                spacing={2}
                                direction="row"
                                alignItems="center"
                                sx={{ mb: "8px" }}
                            >
                                <Image
                                    src={`characters/constellations/${name.toLowerCase()}_c${
                                        con.index
                                    }`}
                                    alt={`c${con.index}`}
                                    style={theme.styles.skillIcon(element)}
                                />
                                <Box>
                                    <TextStyled variant="h6-styled">
                                        {con.name}
                                    </TextStyled>
                                    <TextStyled sx={{ fontStyle: "italic" }}>
                                        {`C${con.index}`}
                                    </TextStyled>
                                </Box>
                            </Stack>
                            <Text
                                component="span"
                                sx={{ color: theme.text.description }}
                            >
                                {parseSkillDescription({
                                    description: con.description,
                                    onClick: handleDialogOpen,
                                })}
                            </Text>
                        </Grid>
                    ))}
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
