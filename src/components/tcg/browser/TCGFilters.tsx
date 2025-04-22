import { BaseSyntheticEvent } from "react";

// Component imports
import Dropdown from "custom/Dropdown";
import Image from "custom/Image";
import ToggleButtons from "custom/ToggleButtons";

// MUI imports
import { useTheme, List, IconButton, Toolbar, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { elements } from "data/common";
import {
    tcgActionCardSubTypes,
    tcgFactions,
    tcgWeaponTypes,
} from "data/tcg/tcg";
import {
    setCardType,
    clearFilters,
    selectTCGFilters,
    activeTCGFilters,
    setElement,
    setWeapon,
    setFaction,
    setCardGroup,
} from "reducers/tcgFilters";

// Type imports
import {
    TCGActionCardSubType,
    TCGCardType,
    TCGFaction,
    TCGWeaponType,
} from "types/tcg";
import { Element } from "types/_common";

function TCGFilters({ handleClose }: { handleClose: (arg0: any) => void }) {
    const theme = useTheme();

    const filters = useAppSelector(selectTCGFilters);
    const dispatch = useAppDispatch();

    const filterGroups = [
        {
            name: "Card Type",
            value: filters.cardType,
            onChange: (_: BaseSyntheticEvent, newValues: TCGCardType[]) =>
                dispatch(setCardType(newValues)),
            buttons: ["Character", "Action"].map((type) => ({
                value: type.toLowerCase(),
                icon: (
                    <Image
                        src={`tcg/icons/CardType_${type}`}
                        alt={`${type} Card`}
                        style={{
                            width: "32px",
                            borderRadius: "4px",
                        }}
                        tooltip={`${type} Card`}
                    />
                ),
            })),
        },
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
            onChange: (_: BaseSyntheticEvent, newValues: TCGWeaponType[]) =>
                dispatch(setWeapon(newValues)),
            buttons: createButtons(tcgWeaponTypes, "tcg/icons/weapons"),
        },
        {
            name: "Faction",
            value: filters.faction,
            onChange: (_: BaseSyntheticEvent, newValues: TCGFaction[]) =>
                dispatch(setFaction(newValues)),
            buttons: createButtons(tcgFactions, "tcg/icons/factions"),
        },
        {
            name: "Action Card Group",
            value: filters.cardGroup,
            onChange: (
                _: BaseSyntheticEvent,
                newValues: TCGActionCardSubType[]
            ) => dispatch(setCardGroup(newValues)),
            buttons: createButtons(tcgActionCardSubTypes, "tcg/icons/subtypes"),
        },
    ];

    return (
        <>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Button
                    onClick={() => dispatch(clearFilters())}
                    disabled={!useAppSelector(activeTCGFilters)}
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
                        <ToggleButtons
                            color="secondary"
                            buttons={filter.buttons}
                            value={filter.value}
                            onChange={filter.onChange}
                            spacing={4}
                            padding={"label" in filter.buttons[0] ? "0 8px" : 0}
                        />
                    </Dropdown>
                ))}
            </List>
        </>
    );
}

export default TCGFilters;

function createButtons<T extends string>(items: readonly T[], url: string) {
    return items.map((item) => ({
        value: item,
        icon: (
            <Image
                src={`${url}/${item}`}
                alt={`${item}`}
                style={{ width: "32px", padding: "4px", borderRadius: "4px" }}
                tooltip={item}
            />
        ),
    }));
}
