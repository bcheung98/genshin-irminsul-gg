import * as React from "react";
import { connect } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, Autocomplete, ClickAwayListener, CardHeader } from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { Button, PopperComponent, StyledPopper, StyledInput } from "../../helpers/CustomAutocomplete";
import ErrorLoadingImage from "../../helpers/ErrorLoadingImage";

const WeaponSelector = (props) => {

    const theme = useTheme();

    let { weapons, setPlannerWeapons, updateTotalCosts } = props;

    React.useEffect(() => {
        setPlannerWeapons(value)
        updateTotalCosts()
    })

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [value, setValue] = React.useState([]);
    const [pendingValue, setPendingValue] = React.useState([]);

    const handleClick = (event) => {
        setPendingValue(value);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setValue(pendingValue);
        if (anchorEl) {
            anchorEl.focus();
        }
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "lc-label" : undefined;

    if (weapons.length > 0) {
        return (
            <React.Fragment>
                <Box
                    sx={{
                        width: 300,
                        p: "5px",
                        mx: "20px",
                        border: `1px solid ${theme.border.color}`,
                        borderRadius: "5px",
                    }}
                >
                    <Button disableRipple onClick={handleClick}>
                        <span style={{ fontFamily: "Genshin, sans-serif", color: "white" }}>Weapons</span>
                        <ArrowForwardIosSharpIcon sx={{ transform: "rotate(90deg)", color: "white" }} />
                    </Button>
                </Box>
                <StyledPopper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
                    <ClickAwayListener onClickAway={handleClose}>
                        <Box>
                            <Autocomplete
                                open
                                multiple
                                onClose={(event, reason) => {
                                    if (reason === "escape") {
                                        handleClose();
                                    }
                                }}
                                value={pendingValue}
                                onChange={(event, newValue, reason) => {
                                    if (
                                        event.type === "keydown" &&
                                        event.key === "Backspace" &&
                                        reason === "removeOption"
                                    ) {
                                        return;
                                    }
                                    setPendingValue(newValue);
                                }}
                                disableCloseOnSelect
                                PopperComponent={PopperComponent}
                                renderTags={() => null}
                                noOptionsText="No weapons"
                                renderOption={(props, option, { selected }) => (
                                    <li {...props} style={{ backgroundColor: selected ? `${theme.table.body.hover}` : `${theme.paper.backgroundColor}` }}>
                                        <Box
                                            component={DoneIcon}
                                            sx={{ width: 17, height: 17, mr: "5px", ml: "-2px" }}
                                            style={{
                                                visibility: selected ? "visible" : "hidden",
                                            }}
                                        />
                                        <CardHeader
                                            avatar={
                                                <img alt={option.name} src={`${process.env.REACT_APP_URL}/weapons/Weapon_${option.name.split(" ").join("_")}.png`} style={{ width: "48px" }} onError={ErrorLoadingImage} />
                                            }
                                            title={
                                                <Typography variant="body1" sx={{ fontFamily: "Genshin, sans-serif", }}>
                                                    {option.name}
                                                </Typography>
                                            }
                                            sx={{ p: 0, flexGrow: 1 }}
                                        />
                                        <Box
                                            component={CloseIcon}
                                            sx={{ opacity: 0.6, width: 18, height: 18 }}
                                            style={{
                                                visibility: selected ? "visible" : "hidden",
                                            }}
                                        />
                                    </li>
                                )}
                                options={[...weapons].sort((a, b) => {
                                    // Display the selected labels first.
                                    let ai = value.indexOf(a);
                                    ai = ai === -1 ? value.length + weapons.indexOf(a) : ai;
                                    let bi = value.indexOf(b);
                                    bi = bi === -1 ? value.length + weapons.indexOf(b) : bi;
                                    return ai - bi;
                                })}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <StyledInput
                                        ref={params.InputProps.ref}
                                        inputProps={params.inputProps}
                                        autoFocus
                                        placeholder="Search"
                                    />
                                )}
                            />
                        </Box>
                    </ClickAwayListener>
                </StyledPopper>
            </React.Fragment>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        weapons: state.weapons.weapons,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPlannerWeapons: (payload) => dispatch({ type: "SET_PLANNER_WEAPONS", payload }),
        updateTotalCosts: (payload) => dispatch({ type: "UPDATE_TOTAL_COSTS", payload })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(WeaponSelector);