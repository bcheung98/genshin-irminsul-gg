import * as React from "react"

// Component imports
import CharacterAscensionCardMaterials from "./_CharacterAscensionCardMaterials"
import CharacterAscensionLevel from "./CharacterAscensionLevel"
import CharacterAscensionATK from "./CharacterAscensionATK"
import CharacterAscensionSkill from "./CharacterAscensionSkill"
import CharacterAscensionBurst from "./CharacterAscensionBurst"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Typography, CardHeader, ButtonBase } from "@mui/material"

// Helper imports
import { CustomTooltip } from "../_custom/CustomTooltip"
import { Accordion, AccordionDetails, AccordionSummary } from "../_custom/CustomAccordion"
import ErrorLoadingImage from "../../helpers/ErrorLoadingImage"

function CharacterAscensionCard(props: any) {

    const theme = useTheme()

    let { name, rarity, element, weapon } = props.character

    const smallIcon = {
        width: "24px",
        height: "24px",
        backgroundColor: `${theme.materialImage.backgroundColor}`,
        border: `1px solid ${theme.border.color}`,
        borderRadius: "24px",
        marginBottom: "10px",
    }

    const mainIcon = {
        width: "64px",
        border: `2px solid ${theme.border.color}`,
        borderRadius: "64px",
        backgroundColor: "rgb(32, 32, 32)",
        backgroundImage: `url(${process.env.REACT_APP_URL}/backgrounds/Background_${rarity}_Star.png)`,
        backgroundSize: "100%"
    }

    return (
        <Box
            sx={{
                width: "100%",
                border: `1px solid ${theme.border.color}`,
                borderRadius: "5px",
                backgroundColor: `${theme.paper.backgroundColor}`,
                p: 1,
            }}
        >
            <CardHeader
                avatar={
                    <Box sx={{ position: "relative" }}>
                        <ButtonBase disableRipple href={`${process.env.REACT_APP_BASENAME}/characters/${props.character.name.split(" ").join("_").toLowerCase()}`} target="_blank">
                            <img alt={name} src={`${process.env.REACT_APP_URL}/characters/icons/${name.split(" ").join("_")}.png`} style={mainIcon} onError={ErrorLoadingImage} />
                        </ButtonBase>
                        <Box sx={{ position: "absolute", top: "50px", left: "-5px" }}>
                            <CustomTooltip title={element} arrow placement="top">
                                <img style={smallIcon} src={`${process.env.REACT_APP_URL}/elements/${element}.png`} alt={element} onError={ErrorLoadingImage} />
                            </CustomTooltip>
                        </Box>
                        <Box sx={{ position: "absolute", top: "50px", left: "45px" }}>
                            <CustomTooltip title={weapon} arrow placement="top">
                                <img style={smallIcon} src={`${process.env.REACT_APP_URL}/weapons/icons/${weapon}.png`} alt={weapon} onError={ErrorLoadingImage} />
                            </CustomTooltip>
                        </Box>
                    </Box>
                }
                title={
                    <React.Fragment>
                        <ButtonBase disableRipple href={`${process.env.REACT_APP_BASENAME}/characters/${props.character.name.split(" ").join("_").toLowerCase()}`} target="_blank">
                            <Typography variant="h6" sx={{ fontFamily: `${theme.font.genshin.family}`, color: `${theme.text.color}` }}>
                                {props.character.fullname ? props.character.fullname : name}
                            </Typography>
                        </ButtonBase>
                        <img style={{
                            display: "block",
                            marginLeft: "-2.5px",
                            marginTop: "5px",
                            height: "20px",
                        }} src={(`${process.env.REACT_APP_URL}/stars/Icon_${rarity}_Stars.png`)} alt={rarity} onError={ErrorLoadingImage} />
                    </React.Fragment>
                }
            />
            <hr style={{ border: `.5px solid ${theme.border.color}`, marginTop: "15px", marginBottom: "15px" }} />
            <Box sx={{ ml: "15px" }}>
                <Typography variant="body1" sx={{ fontFamily: `${theme.font.genshin.family}`, color: `${theme.text.color}` }}>
                    Materials Required
                </Typography>
                <CharacterAscensionCardMaterials character={props.character} />
            </Box>
            <hr style={{ border: `.5px solid ${theme.border.color}`, marginTop: "15px" }} />
            <Accordion>
                <AccordionSummary>
                    <Typography variant="body1" sx={{ fontFamily: `${theme.font.genshin.family}`, color: `${theme.text.color}` }}>
                        Edit
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ mx: "10px", px: 0 }}>
                    <CharacterAscensionLevel character={props.character} />
                    <CharacterAscensionATK character={props.character} />
                    <CharacterAscensionSkill character={props.character} />
                    <CharacterAscensionBurst character={props.character} />
                </AccordionDetails>
            </Accordion>
        </Box>
    )

}

export default CharacterAscensionCard