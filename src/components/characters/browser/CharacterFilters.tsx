import { BaseSyntheticEvent } from "react";

// Component imports
import BrowserSort from "custom/BrowserSort";
import Dropdown from "custom/Dropdown";
import Image from "custom/Image";
import ToggleButtons from "custom/ToggleButtons";

// MUI imports
import {
    useTheme,
    List,
    IconButton,
    Toolbar,
    Button,
    Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

// Helper imports
import { objectKeys } from "helpers/utils";
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { selectUnreleasedContent } from "reducers/settings";
import {
    activeCharacterFilters,
    clearFilters,
    selectCharacterFilters,
    setAscensionStat,
    setBossMat,
    setCommonMat,
    setElement,
    setLocalMat,
    setNation,
    setRarity,
    setTalentBook,
    setWeapon,
    setWeeklyBossMat,
} from "reducers/characterFilters";
import { elements, weapons, rarities, nations } from "data/common";
import {
    CharacterAscensionStat,
    characterAscensionStats,
} from "data/characterAscensionStats";
import { formatMaterialName, getMaterialKeyNames } from "helpers/materials";
import {
    getTalentMaterial,
    talentMaterials,
} from "data/materials/talentMaterials";
import {
    commonMaterials,
    getCommonMaterial,
} from "data/materials/commonMaterials";
import { bossMaterials, getBossMaterial } from "data/materials/bossMaterials";
import {
    getWeeklyBossMaterial,
    groupedWeeklyBossMatNames,
} from "data/materials/weeklyBossMaterials";
import { groupedLocalMatNames } from "data/materials/localMaterials";

// Type imports
import { Element, WeaponType, Rarity, Nation } from "types/_common";
import {
    BossMaterial,
    WeeklyBossMaterial,
    LocalMaterial,
    CommonMaterial,
    TalentMaterial,
} from "types/materials";

function CharacterFilters({
    handleClose,
}: {
    handleClose: (arg0: any) => void;
}) {
    const theme = useTheme();

    const filters = useAppSelector(selectCharacterFilters);
    const dispatch = useAppDispatch();

    const showUnrelased = useAppSelector(selectUnreleasedContent);

    const filterGroups = [
        {
            name: "Element",
            value: filters.element,
            onChange: (_: BaseSyntheticEvent, newValues: Element[]) =>
                dispatch(setElement(newValues)),
            buttons: createButtons(elements, "elements"),
        },
        {
            name: "Weapon",
            value: filters.weapon,
            onChange: (_: BaseSyntheticEvent, newValues: WeaponType[]) =>
                dispatch(setWeapon(newValues)),
            buttons: createButtons(weapons, "weapons/icons"),
        },
        {
            name: "Rarity",
            value: filters.rarity,
            onChange: (_: BaseSyntheticEvent, newValues: Rarity[]) =>
                dispatch(setRarity(newValues)),
            buttons: rarities.slice(0, -3).map((rarity) => ({
                value: rarity,
                icon: (
                    <Image
                        src={`stars/Icon_${rarity}_Stars`}
                        style={{ height: "32px", padding: "6px" }}
                    />
                ),
            })),
            width: "128px",
        },
        {
            name: "Ascension Stat",
            value: filters.ascStat,
            onChange: (
                _: BaseSyntheticEvent,
                newValues: CharacterAscensionStat[]
            ) => dispatch(setAscensionStat(newValues)),
            buttons: createButtons(
                objectKeys(characterAscensionStats).slice(1),
                "icons/ascension_stats"
            ),
        },
        {
            name: "Talent Book",
            value: filters.talentBook,
            onChange: (_: BaseSyntheticEvent, newValues: TalentMaterial[]) =>
                dispatch(setTalentBook(newValues)),
            buttons: createButtons(
                getMaterialKeyNames([...talentMaterials], showUnrelased),
                "materials/talent"
            ),
            width: "128px",
        },
        {
            name: "Common Material",
            value: filters.commonMat,
            onChange: (_: BaseSyntheticEvent, newValues: CommonMaterial[]) =>
                dispatch(setCommonMat(newValues)),
            buttons: createButtons(
                getMaterialKeyNames([...commonMaterials], showUnrelased),
                "materials/common"
            ),
        },
        {
            name: "Boss Material",
            value: filters.bossMat,
            onChange: (_: BaseSyntheticEvent, newValues: BossMaterial[]) =>
                dispatch(setBossMat(newValues)),
            buttons: createButtons(
                getMaterialKeyNames([...bossMaterials], showUnrelased),
                "materials/boss"
            ),
        },
        {
            name: "Weekly Boss Material",
            value: filters.weeklyBossMat,
            onChange: (
                _: BaseSyntheticEvent,
                newValues: WeeklyBossMaterial[]
            ) => dispatch(setWeeklyBossMat(newValues)),
            buttons: createGroupedButtons(
                groupedWeeklyBossMatNames(showUnrelased),
                "bosses",
                "materials/weekly"
            ),
            grouped: true,
        },
        {
            name: "Local Specialty",
            value: filters.localMat,
            onChange: (_: BaseSyntheticEvent, newValues: LocalMaterial[]) =>
                dispatch(setLocalMat(newValues)),
            buttons: createGroupedButtons(
                groupedLocalMatNames(showUnrelased),
                "nations",
                "materials/local"
            ),
            grouped: true,
        },
        {
            name: "Nation",
            value: filters.nation,
            onChange: (_: BaseSyntheticEvent, newValues: Nation[]) =>
                dispatch(setNation(newValues)),
            buttons: createButtons(nations, "nations"),
        },
    ];

    return (
        <>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Button
                    onClick={() => dispatch(clearFilters())}
                    disabled={!useAppSelector(activeCharacterFilters)}
                    variant="contained"
                    color="secondary"
                    disableElevation
                    startIcon={<RestartAltIcon />}
                    sx={{
                        height: "32px",
                        "&.Mui-disabled": {
                            opacity: 0.35,
                            color: theme.appbar.color,
                        },
                        border: `1px solid ${theme.border.color.primary}`,
                    }}
                >
                    Reset
                </Button>
                <IconButton
                    onClick={handleClose}
                    sx={{ color: theme.appbar.color }}
                >
                    <CloseIcon />
                </IconButton>
            </Toolbar>
            <List sx={{ px: "16px" }}>
                {filterGroups.map((filter, index) => (
                    <Dropdown
                        key={index}
                        title={filter.name}
                        titleColor={
                            filter.value.length > 0
                                ? theme.text.selected
                                : theme.appbar.color
                        }
                        contentPadding="4px 0px 4px 24px"
                    >
                        {filter.grouped !== undefined ? (
                            <Stack spacing={1}>
                                {filter.buttons.map((group, idx) => (
                                    <Dropdown
                                        key={idx}
                                        img={group.icon}
                                        imgStyle={
                                            filter.name ===
                                            "Weekly Boss Material"
                                                ? {
                                                      border: `1px solid ${theme.border.color.primary}`,
                                                      borderRadius: "4px",
                                                      backgroundColor:
                                                          theme.icon
                                                              .backgroundColor,
                                                  }
                                                : undefined
                                        }
                                        title={group.title}
                                        titleColor={theme.appbar.color}
                                    >
                                        <ToggleButtons
                                            color="secondary"
                                            buttons={group.buttons}
                                            value={filter.value}
                                            onChange={filter.onChange}
                                            spacing={4}
                                            padding={
                                                "label" in group.buttons[0]
                                                    ? "0 8px"
                                                    : 0
                                            }
                                        />
                                    </Dropdown>
                                ))}
                            </Stack>
                        ) : (
                            <ToggleButtons
                                color="secondary"
                                buttons={filter.buttons}
                                value={filter.value}
                                onChange={filter.onChange}
                                width={filter.width || undefined}
                                spacing={4}
                                padding={
                                    "label" in filter.buttons[0] ? "0 8px" : 0
                                }
                            />
                        )}
                    </Dropdown>
                ))}
            </List>
            <BrowserSort
                type="characters"
                options={["release", "name", "rarity", "element", "weapon"]}
            />
        </>
    );
}

export default CharacterFilters;

function createButtons<T extends string>(items: readonly T[], url: string) {
    return items.map((item) => ({
        value: item,
        icon: url && (
            <Image
                src={`${url}/${item}${
                    ["materials/talent", "materials/common"].includes(url)
                        ? "3"
                        : ""
                }`}
                alt={`${item}`}
                style={{ width: "32px", padding: "4px", borderRadius: "4px" }}
                tooltip={getTooltip(item, url)}
            />
        ),
    }));
}

function createGroupedButtons<
    T extends { readonly [key: string]: readonly string[] }
>(items: T, groupUrl: string, url: string) {
    return Object.entries(items).map(([key, values]) => ({
        icon: `${groupUrl}/${key}`,
        title: key,
        buttons: createButtons(values, url),
    }));
}

function getTooltip<T extends string>(item: T, url: string) {
    let tooltip;
    if (url.startsWith("materials/common")) {
        tooltip = formatMaterialName(getCommonMaterial({ tag: item }));
    } else if (url.startsWith("materials/talent")) {
        tooltip = formatMaterialName(getTalentMaterial({ tag: item }));
    } else if (url.startsWith("materials/boss")) {
        tooltip = formatMaterialName(getBossMaterial({ tag: item }));
    } else if (url.startsWith("materials/weekly")) {
        tooltip = getWeeklyBossMaterial({ tag: item })?.displayName;
    } else if (url.startsWith("icons/ascension_stat")) {
        tooltip = `${
            characterAscensionStats[item as CharacterAscensionStat].title
        }`;
    } else {
        tooltip = `${item}`;
    }
    return tooltip;
}
