import { BaseSyntheticEvent, useMemo, useState } from "react";

// Component imports
import Image from "custom/Image";
import SearchBar from "custom/SearchBar";
import Dropdown from "custom/Dropdown";
import ToggleButtons from "custom/ToggleButtons";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, Stack, StackProps } from "@mui/material";

// Helper imports
import { range, sortBy } from "helpers/utils";
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { selectCharacters } from "reducers/character";
import {
    addItem,
    getSelectedCharacters,
    setPlannerCharacters,
} from "reducers/planner";
import { getBackgroundColor, getRarityColor } from "helpers/rarityColors";
import { elements, rarities, weapons } from "data/common";
import { getBossMaterial } from "data/materials/bossMaterials";
import { getWeeklyBossMaterial } from "data/materials/weeklyBossMaterials";
import { getGemstone } from "data/materials/gemstones";
import { getLocalMaterial } from "data/materials/localMaterials";
import { getTalentMaterial } from "data/materials/talentMaterials";
import { getCommonMaterial } from "data/materials/commonMaterials";

// Type imports
import { Element, WeaponType, Rarity } from "types/_common";
import { Character } from "types/character";
import { CharacterCostObject } from "types/costs";
import { CharacterFilterState } from "reducers/characterFilters";

const initialFilters: CharacterFilterState = {
    element: [],
    weapon: [],
    rarity: [],
    ascStat: [],
    talentBook: [],
    commonMat: [],
    bossMat: [],
    weeklyBossMat: [],
    localMat: [],
    nation: [],
    gender: [],
};

function CharacterSelector({ handleClose }: { handleClose: () => void }) {
    const theme = useTheme();
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const dispatch = useAppDispatch();

    const characters = [...useAppSelector(selectCharacters)].sort((a, b) =>
        a.fullName.localeCompare(b.fullName)
    );

    const options = createOptions(characters);
    const selected = useAppSelector(getSelectedCharacters);

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = (event: BaseSyntheticEvent) => {
        setSearchValue(event.target.value);
    };

    const [filters, setFilters] = useState(initialFilters);
    const filterGroups = [
        {
            name: "Element",
            value: filters.element,
            onChange: (_: BaseSyntheticEvent, newValues: Element[]) =>
                setFilters({ ...filters, element: newValues }),
            buttons: createButtons(elements, "elements"),
        },
        {
            name: "Weapon",
            value: filters.weapon,
            onChange: (_: BaseSyntheticEvent, newValues: WeaponType[]) =>
                setFilters({ ...filters, weapon: newValues }),
            buttons: createButtons(weapons, "weapons/icons"),
        },
        {
            name: "Rarity",
            value: filters.rarity,
            onChange: (_: BaseSyntheticEvent, newValues: Rarity[]) =>
                setFilters({ ...filters, rarity: newValues }),
            buttons: rarities.slice(0, -3).map((rarity) => ({
                value: rarity,
                icon: (
                    <Image
                        src={`stars/Icon_${rarity}_Stars`}
                        style={{ height: "32px", padding: "6px" }}
                    />
                ),
            })),
            width: "auto",
        },
    ];

    const currentOptions = useMemo(
        () => filterOptions(options, selected, filters, searchValue),
        [options, selected, filters, searchValue]
    );

    const handleClick = (option: CharacterCostObject) => {
        const newValues = [...selected];
        newValues.push(option);
        dispatch(setPlannerCharacters(newValues));
        dispatch(addItem(option.id));
        handleClose();
    };

    const smallIconStyle = { width: "16px", height: "16px" };

    const stackParams: StackProps = {
        spacing: 2,
        direction: "row",
        alignItems: "center",
        sx: {
            p: 1,
            borderRadius: "4px",
            backgroundColor: theme.background(0, "dark"),
            "&:hover": {
                backgroundColor: theme.background(0, "light"),
                cursor: "pointer",
            },
        },
    };

    return (
        <Stack spacing={2}>
            <Stack spacing={2}>
                <SearchBar
                    placeholder="Search"
                    value={searchValue}
                    onChange={handleInputChange}
                    size={{ height: "36px" }}
                />
                <Dropdown title="Filters">
                    {filterGroups.map((filter, index) => (
                        <Stack key={index} spacing={1}>
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
                        </Stack>
                    ))}
                </Dropdown>
            </Stack>
            <Stack
                spacing={1}
                sx={{
                    height: "50vh",
                    maxHeight: "600px",
                    overflowY: "auto",
                }}
            >
                {currentOptions.length > 0 ? (
                    currentOptions.map((option) => (
                        <Stack
                            key={option.id}
                            {...stackParams}
                            onClick={() => handleClick(option)}
                        >
                            <Stack
                                spacing={1}
                                sx={{
                                    p: "4px",
                                    borderRadius: "16px",
                                    backgroundColor:
                                        theme.appbar.backgroundColor,
                                }}
                            >
                                <Image
                                    src={`elements/${option.element}`}
                                    alt={option.element}
                                    style={smallIconStyle}
                                    tooltip={option.element}
                                />
                                <Image
                                    src={`weapons/icons/${option.weapon}`}
                                    alt={option.weapon}
                                    style={smallIconStyle}
                                    tooltip={option.weapon}
                                />
                            </Stack>
                            <Image
                                src={`characters/avatars/${option.name}`}
                                alt={option.name}
                                style={{
                                    width: matches_md_up ? "48px" : "40px",
                                    height: matches_md_up ? "48px" : "40px",
                                    border: `2px solid ${getRarityColor(
                                        option.rarity
                                    )}`,
                                    borderRadius:
                                        theme.mainContentBox.borderRadius,
                                    backgroundColor: theme.background(2),
                                    boxShadow: `inset 0 0 24px 16px ${getBackgroundColor(
                                        option.rarity
                                    )}`,
                                }}
                            />
                            <TextStyled
                                variant={
                                    matches_md_up
                                        ? "body1-styled"
                                        : "body2-styled"
                                }
                                noWrap
                            >
                                {option.fullName}
                            </TextStyled>
                        </Stack>
                    ))
                ) : (
                    <TextStyled sx={{ textAlign: "center" }}>
                        No characters
                    </TextStyled>
                )}
            </Stack>
        </Stack>
    );
}

export default CharacterSelector;

function createOptions(characters: Character[]) {
    const costArray = range(0, 4, 0);
    return characters.map(
        (char) =>
            ({
                id: `character_${char.id}`,
                name: char.name,
                fullName: char.fullName,
                rarity: char.rarity,
                element: char.element,
                weapon: char.weapon,
                release: char.release,
                costs: {
                    // Source of each material is mapped to a specific index in the array:
                    // [Level, Attack, Skill, Burst]
                    credits: {
                        Credit: costArray,
                    },
                    characterXP: {
                        CharacterXP1: costArray,
                        CharacterXP2: costArray,
                        CharacterXP3: costArray,
                    },
                    bossMat: {
                        [getBossMaterial({ tag: char.materials.bossMat })?.id!]:
                            costArray,
                    },
                    weeklyBossMat: {
                        [getWeeklyBossMaterial({
                            tag: char.materials.weeklyBossMat,
                        })?.id!]: costArray,
                    },
                    crown: {
                        Crown: costArray,
                    },
                    gemstone: {
                        [getGemstone({ tag: `${char.element}1` })?.id!]:
                            costArray,
                        [getGemstone({ tag: `${char.element}2` })?.id!]:
                            costArray,
                        [getGemstone({ tag: `${char.element}3` })?.id!]:
                            costArray,
                        [getGemstone({ tag: `${char.element}4` })?.id!]:
                            costArray,
                    },
                    localMat: {
                        [getLocalMaterial({ tag: char.materials.localMat })
                            ?.id!]: costArray,
                    },
                    talentBook: {
                        [getTalentMaterial({
                            tag: `${char.materials.talentBook}1`,
                        })?.id!]: costArray,
                        [getTalentMaterial({
                            tag: `${char.materials.talentBook}2`,
                        })?.id!]: costArray,
                        [getTalentMaterial({
                            tag: `${char.materials.talentBook}3`,
                        })?.id!]: costArray,
                    },
                    commonMat: {
                        [getCommonMaterial({
                            tag: `${char.materials.commonMat}1`,
                        })?.id!]: costArray,
                        [getCommonMaterial({
                            tag: `${char.materials.commonMat}2`,
                        })?.id!]: costArray,
                        [getCommonMaterial({
                            tag: `${char.materials.commonMat}3`,
                        })?.id!]: costArray,
                    },
                },
                values: {
                    level: {},
                    attack: {},
                    skill: {},
                    burst: {},
                },
                dataFormat: "v2",
            } as CharacterCostObject)
    );
}

function filterOptions(
    characters: CharacterCostObject[],
    selected: CharacterCostObject[],
    filters: CharacterFilterState,
    searchValue: string
) {
    let chars: CharacterCostObject[];
    chars = characters.filter(
        (char) => !selected.map((char) => char.id).includes(char.id)
    );
    if (filters.element.length > 0) {
        chars = chars.filter((char) => filters.element.includes(char.element));
    }
    if (filters.weapon.length > 0) {
        chars = chars.filter((char) => filters.weapon.includes(char.weapon));
    }
    if (filters.rarity.length > 0) {
        chars = chars.filter((char) => filters.rarity.includes(char.rarity));
    }
    if (searchValue !== "") {
        chars = chars.filter(
            (char) =>
                char.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                char.fullName.toLowerCase().includes(searchValue.toLowerCase())
        );
    }
    chars = chars.sort(
        (a, b) =>
            sortBy(a.release.version, b.release.version) ||
            sortBy(a.rarity, b.rarity) ||
            sortBy(b.fullName, a.fullName)
    );

    return chars;
}

function createButtons<T extends string>(items: readonly T[], url: string) {
    return items.map((item) => ({
        value: item,
        icon: url && (
            <Image
                src={`${url}/${item}`}
                alt={`${item}`}
                style={{ width: "32px", padding: "4px", borderRadius: "4px" }}
                tooltip={item}
            />
        ),
    }));
}
