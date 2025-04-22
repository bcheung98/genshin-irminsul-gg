// Component imports
import Image from "custom/Image";

// MUI imports
import { Box, Stack } from "@mui/material";

// Helper imports
import { range } from "helpers/utils";

function TCGEnergyIcon(props: { energy: string; size: string }) {
    const energy = props.energy.split(" ")[1].slice(0, -1);

    return (
        <Stack>
            {range(Number(energy)).map((index) => (
                <Box key={index} sx={{ width: props.size, height: props.size }}>
                    <Image
                        src="tcg/icons/Energy_Card"
                        alt="Energy"
                        style={{
                            width: "100%",
                            height: "100%",
                            padding: "4px",
                            maxWidth: "64px",
                            userSelect: "none",
                            pointerEvents: "none",
                        }}
                    />
                </Box>
            ))}
        </Stack>
    );
}

export default TCGEnergyIcon;
