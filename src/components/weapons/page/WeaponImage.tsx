// Component imports
import Image from "custom/Image";

// MUI imports
import { useTheme } from "@mui/material";

// Helper imports
import { getBackgroundColor, getRarityColor } from "helpers/rarityColors";

// Type imports
import { WeaponProps } from "types/weapon";

function WeaponImage({ weapon }: WeaponProps) {
    const theme = useTheme();

    const { rarity } = weapon;

    return (
        <Image
            src={`weapons/${weapon.name}`}
            alt={weapon.name}
            style={{
                width: "100%",
                maxWidth: "256px",
                height: "auto",
                border: `2px solid ${getRarityColor(rarity)}`,
                borderRadius: theme.mainContentBox.borderRadius,
                backgroundColor: theme.background(2),
                boxShadow: `inset 0 0 24px 16px ${getBackgroundColor(
                    weapon.rarity
                )}`,
                backgroundImage: `url(https://assets.irminsul.gg/genshin/backgrounds/Background_${rarity}_Star.png)`,
                backgroundSize: "contain",
            }}
        />
    );
}

export default WeaponImage;
