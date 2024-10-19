import * as React from "react"
import { useDispatch } from "react-redux"

// MUI imports
import { useTheme, useMediaQuery, Box, Typography } from "@mui/material"

// Helper imports
import { CustomSlider } from "../_custom/CustomSlider"
import { updateWeaponCosts, updateTotalCosts } from "../../redux/reducers/AscensionPlannerReducer"
import { SetWeaponCostsLevel } from "../../data/AscensionCostIndex"

function WeaponAscensionLevel(props: any) {

    const theme = useTheme()

    const matches = useMediaQuery(theme.breakpoints.down("sm"))

    const dispatch = useDispatch()

    let { name, rarity } = props.weapon

    let levels
    rarity > 2 ? levels = ["1", "20", "20+", "40", "40+", "50", "50+", "60", "60+", "70", "70+", "80", "80+", "90"] : levels = ["1", "20", "20+", "40", "40+", "50", "50+", "60", "60+", "70"]
    const minDistance = 1
    let maxValue = levels.length
    const [sliderValue, setSliderValue] = React.useState([1, maxValue])
    const handleSliderChange = (event: Event, newValue: number | number[], activeThumb: number) => {
        if (!Array.isArray(newValue)) {
            return
        }
        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], maxValue - minDistance)
                setSliderValue([clamped, clamped + minDistance])
            }
            else {
                const clamped = Math.max(newValue[1], minDistance + 1)
                setSliderValue([clamped - minDistance, clamped])
            }
        }
        else {
            setSliderValue(newValue)
        }
    }

    React.useEffect(() => {
        dispatch(updateWeaponCosts([name, "level", SetWeaponCostsLevel(sliderValue[0], sliderValue[1], rarity)]))
        dispatch(updateTotalCosts())
    })

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: "-10px", pb: "16px" }}>
                <Typography sx={{ fontFamily: `${theme.font.genshin.family}`, fontSize: { xs: "14px", sm: "16px" }, color: `${theme.text.color}` }}>
                    Level
                </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ fontFamily: `${theme.font.genshin.family}`, fontSize: { xs: "12px", sm: "16px" }, color: `${theme.text.color}`, width: "90px" }}>
                    Lv. {levels[sliderValue[0] - 1]}
                </Typography>
                <CustomSlider value={sliderValue} step={1} min={1} max={maxValue} onChange={handleSliderChange} disableSwap size={matches ? "small" : "medium"} />
                <Typography sx={{ fontFamily: `${theme.font.genshin.family}`, fontSize: { xs: "12px", sm: "16px" }, color: `${theme.text.color}`, ml: "25px", width: "90px" }}>
                    Lv. {levels[sliderValue[1] - 1]}
                </Typography>
            </Box>
        </Box>
    )

}

export default WeaponAscensionLevel