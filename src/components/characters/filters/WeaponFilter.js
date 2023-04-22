import React from "react";
import { connect } from "react-redux";
import { FilterTooltip } from "../../../helpers/FilterTooltip";
import ErrorLoadingImage from "../../../helpers/ErrorLoadingImage";

const Weapons = ["Sword", "Claymore", "Polearm", "Bow", "Catalyst"];

const WeaponFilter = (props) => {
    return (
        <React.Fragment>
            {
                Weapons.map((weapon, index) => (
                    <FilterTooltip key={index} title={weapon} arrow placement="top">
                        <img className="filter-off" id={`${weapon.toLowerCase()}-button`} src={`${process.env.REACT_APP_URL}/weapons/icons/Weapon-class-${weapon.toLowerCase()}-icon.png`} alt={weapon} onClick={(e) => props.setFilter(e.target.alt)} onError={ErrorLoadingImage} />
                    </FilterTooltip>
                ))
            }
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setFilter: (target) => dispatch({ type: "SET_CHAR_WEAPON_FILTERS", target })
    }
}

export default connect(null, mapDispatchToProps)(WeaponFilter);
