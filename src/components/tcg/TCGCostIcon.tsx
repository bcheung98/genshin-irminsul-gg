// Component imports
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { Box, Stack } from "@mui/material";

function TCGCostIcon(props: {
    cost: string;
    orientation: "column" | "row";
    size: string;
}) {
    const costArray = props.cost.split(" ");

    return (
        <Stack direction={props.orientation}>
            {costArray.map((cost, index) => (
                <Box
                    key={index}
                    sx={{
                        textAlign: "center",
                        width: props.size,
                        height: props.size,
                        backgroundImage: `url(https://assets.irminsul.gg/genshin/tcg/icons/dice/${cost.slice(
                            -1
                        )}.png)`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "100%",
                    }}
                >
                    <TextStyled
                        sx={{
                            fontSize: `calc(${props.size} / 2.25) !important`,
                            lineHeight: props.size,
                            color: `white`,
                            textShadow:
                                "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                            userSelect: "none",
                        }}
                    >
                        {cost.slice(0, -1)}
                    </TextStyled>
                </Box>
            ))}
        </Stack>
    );
}

export default TCGCostIcon;
