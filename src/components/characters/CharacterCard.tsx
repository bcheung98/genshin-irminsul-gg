// Component imports
import CharacterMaterialGrid from "./CharacterMaterialGrid"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Typography, Card, CardContent, ButtonBase, Box } from "@mui/material"
import Grid from "@mui/material/Grid2"

// Helper imports
import { CustomTooltip } from "../../helpers/CustomTooltip"
import { GetRarityColor } from "../../helpers/RarityColors"
import ErrorLoadingImage from "../../helpers/ErrorLoadingImage"

function CharacterCard(props: any) {

    const theme = useTheme()

    let { name, rarity, element, weapon } = props.character

    const characterIconBackground = {
        margin: "auto",
        marginLeft: "2px",
        backgroundColor: `${theme.materialImage.backgroundColor}`,
        backgroundSize: "100%",
        border: `1px solid ${theme.border.color}`,
        borderRadius: "5px",
        width: "100px",
        height: "100px",

        // Comment out following line if using new icon
        // backgroundImage: `url(${process.env.REACT_APP_URL}/backgrounds/Background_${rarity}_Star.png)`,

        // Comment out following line if using old icon
        borderBottom: `5px solid ${GetRarityColor(rarity)}`,
    }

    // Old Icon: 
    // const characterIcon = `${process.env.REACT_APP_URL}/characters/icons/${name.split(" ").join("_")}.png`

    // New Icon
    const characterIcon = `${process.env.REACT_APP_URL}/characters/avatars/${name.split(" ").join("_")}.png`

    return (
        <Card variant="outlined"
            sx={{
                width: 320,
                height: 195,
                mr: "15px",
                mb: "15px",
                backgroundColor: `${theme.card.backgroundColor}`,
                border: `1px solid ${theme.border.color}`,
                borderRadius: "5px",
                fontFamily: `${theme.font.genshin.family}`
            }}
        >
            <CardContent sx={{ py: "10px" }}>
                <Box
                    sx={{
                        display: "flex",
                        position: "relative"
                    }}
                >
                    <ButtonBase disableRipple href={`${process.env.REACT_APP_BASENAME}/characters/${props.character.name.split(" ").join("_").toLowerCase()}`} target="_blank">
                        <Typography variant="h5" sx={{ fontFamily: `${theme.font.genshin.family}`, color: `${theme.text.color}` }}>
                            {name}
                        </Typography>
                    </ButtonBase>
                    <Box
                        sx={{
                            display: "flex",
                            position: "absolute",
                            right: "-5px"
                        }}
                    >
                        <CustomTooltip title={element} arrow placement="top">
                            <img style={{ height: "32px", width: "32px", marginRight: "1px" }} src={(`${process.env.REACT_APP_URL}/elements/${element}.png`)} alt={element} onError={ErrorLoadingImage} />
                        </CustomTooltip>
                        <CustomTooltip title={weapon} arrow placement="top">
                            <img style={{ height: "36px", width: "36px", marginTop: "-2px" }} src={(`${process.env.REACT_APP_URL}/weapons/icons/${weapon}.png`)} alt={weapon} onError={ErrorLoadingImage} />
                        </CustomTooltip>
                    </Box>
                </Box>
                <Grid container sx={{ mt: "10px" }}>
                    <Grid size="auto">
                        <Box sx={{ width: "105px" }}>
                            <ButtonBase disableRipple href={`${process.env.REACT_APP_BASENAME}/characters/${props.character.name.split(" ").join("_").toLowerCase()}`} target="_blank">
                                <img src={characterIcon} alt={name} style={characterIconBackground} onError={ErrorLoadingImage} />
                            </ButtonBase>
                            <img src={(`${process.env.REACT_APP_URL}/stars/Icon_${rarity}_Stars.png`)} alt={rarity}
                                style={{
                                    display: "block",
                                    margin: "auto",
                                    marginTop: "5px",
                                    height: "25px",
                                }}
                                onError={ErrorLoadingImage}
                            />
                        </Box>
                    </Grid>
                    <Grid size={7.5}>
                        <CharacterMaterialGrid character={props.character} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card >
    )

}

export default CharacterCard