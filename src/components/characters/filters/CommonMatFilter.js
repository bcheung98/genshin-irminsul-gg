import React from "react";
import { connect } from "react-redux";
import { FilterTooltip } from "../../../helpers/FilterTooltip";
import { formatCommonMats } from "../../../helpers/TooltipText";
import ErrorLoadingImage from "../../../helpers/ErrorLoadingImage";

const CommonMaterials = ["Arrow", "Fatui Insignia", "Mask", "Nectar", "Scroll", "Slime", "Treasure Hoarder Insignia", "Handguard", "Specter", "Fungi", "Headband"];

const CommonMatFilter = (props) => {
    return (
        <React.Fragment>
            {
                CommonMaterials.map((material, index) => (
                    <FilterTooltip key={index} title={formatCommonMats(`${material}`)} arrow placement="top">
                        <img className="filter-off" id={`${material.toLowerCase()}-button`} src={`${process.env.REACT_APP_URL}/materials/common_mats/${material.split(" ").join("_")}3.png`} alt={material} onClick={(e) => props.setFilter(e.target.alt)} onError={ErrorLoadingImage} />
                    </FilterTooltip>
                ))
            }
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setFilter: (target) => dispatch({ type: "SET_CHAR_COMMON_MAT_FILTERS", target })
    }
}

export default connect(null, mapDispatchToProps)(CommonMatFilter);