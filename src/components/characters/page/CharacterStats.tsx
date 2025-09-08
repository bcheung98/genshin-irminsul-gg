import { BaseSyntheticEvent, useEffect, useState } from "react";

// Component imports
import MainContentBox from "custom/MainContentBox";
import StatsTable from "custom/StatsTable";
import ToggleButtons from "custom/ToggleButtons";
import { skillDisplayButtons } from "components/Settings";

// MUI imports
import { useTheme } from "@mui/material";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectSkillDisplay, SkillDisplay } from "reducers/settings";
import { characterAscensionStatScalings } from "data/characterAscensionStats";

// Type imports
import { CharacterProps } from "types/character";

function CharacterStats({ character }: CharacterProps) {
    const theme = useTheme();

    const { rarity, element, stats } = character;
    const ascensionStats = characterAscensionStatScalings(
        rarity,
        stats.ascensionStat,
        { em: stats.em }
    );
    const ascStatScaling = !["CRIT Rate", "CRIT DMG"].includes(
        stats.ascensionStat
    )
        ? ascensionStats[stats.ascensionStat]
        : undefined;

    const currentSkillDisplay = useAppSelector(selectSkillDisplay);
    const [mode, setMode] = useState<SkillDisplay>(currentSkillDisplay);
    const handleMode = (_: BaseSyntheticEvent, newView: SkillDisplay) => {
        if (newView !== null) {
            setMode(newView);
        }
    };

    const levels = [
        "1",
        "20",
        "20+",
        "40",
        "40+",
        "50",
        "50+",
        "60",
        "60+",
        "70",
        "70+",
        "80",
        "80+",
        "90",
        "95",
        "100",
    ];

    const data = [
        ["Level", ...levels],
        [
            "Base HP",
            ...levels.map((_, index) =>
                (stats.hp[index] || 0).toLocaleString()
            ),
        ],
        [
            "Base ATK",
            ...levels.map((_, index) =>
                (stats.atk[index] || 0).toLocaleString()
            ),
        ],
        [
            "Base DEF",
            ...levels.map((_, index) =>
                (stats.def[index] || 0).toLocaleString()
            ),
        ],
        [
            "CRIT Rate",
            ...levels.map(
                (_, index) =>
                    (ascensionStats["CRIT Rate"] &&
                        ascensionStats["CRIT Rate"][index]) ||
                    0
            ),
        ],
        [
            "CRIT DMG",
            ...levels.map(
                (_, index) =>
                    (ascensionStats["CRIT DMG"] &&
                        ascensionStats["CRIT DMG"][index]) ||
                    0
            ),
        ],
    ];
    stats.em.reduce((a, c) => a + c) != 0 &&
        stats.ascensionStat !== "Elemental Mastery" &&
        data.push([
            "Elemental Mastery",
            ...levels.map((_, index) =>
                (stats.em[index] || 0).toLocaleString()
            ),
        ]);
    ascStatScaling &&
        data.push([
            stats.ascensionStat,
            ...levels.map((_, index) => ascStatScaling[index]),
        ]);

    useEffect(() => {
        setMode(currentSkillDisplay);
    }, [currentSkillDisplay]);

    return (
        <MainContentBox
            title="Stats"
            actions={
                <ToggleButtons
                    color="secondary"
                    buttons={skillDisplayButtons}
                    value={mode}
                    exclusive
                    onChange={handleMode}
                    spacing={0}
                    padding={10}
                    highlightOnHover={false}
                />
            }
        >
            <StatsTable
                mode={mode}
                levels={levels}
                data={data}
                orientation="column"
                sliderProps={{
                    initialValue: 14,
                    sx: {
                        minWidth: "100px",
                        maxWidth: "50%",
                        ml: "8px",
                        color: theme.text[
                            element.toLowerCase() as keyof typeof theme.text
                        ],
                    },
                }}
                tableProps={{
                    sx: {
                        width:
                            mode === "slider"
                                ? { xs: "100%", sm: "50%" }
                                : "100%",
                    },
                }}
            />
        </MainContentBox>
    );
}

export default CharacterStats;
