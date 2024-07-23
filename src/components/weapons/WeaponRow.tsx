import * as React from "react"

// MUI imports 
import { Box, ButtonBase, CardHeader, Typography } from "@mui/material"

// Helper imports
import { StyledTableCellNoVert, StyledTableRows } from "../../helpers/CustomTable"
import ErrorLoadingImage from "../../helpers/ErrorLoadingImage"

function WeaponRow(props: any) {

    let { row, index } = props

    return (
        <React.Fragment>
            <StyledTableRows key={index} >

                { /* Name + Icon */}
                <StyledTableCellNoVert>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CardHeader sx={{ p: 0 }}
                            avatar={
                                <ButtonBase disableRipple href={`/project-irminsul/weapon/${row.name.split(" ").join("_").toLowerCase()}`} target="_blank">
                                    <img alt={row.name} src={(`${process.env.REACT_APP_URL}/weapons/Weapon_${row.name.split(" ").join("_")}.png`)} style={{ width: "48px", cursor: "pointer" }} onError={ErrorLoadingImage} />
                                </ButtonBase>
                            }
                            title={
                                <ButtonBase disableRipple href={`/project-irminsul/weapon/${row.name.split(" ").join("_").toLowerCase()}`} target="_blank">
                                    <Typography variant="body1"
                                        sx={{
                                            fontFamily: "Genshin, sans-serif",
                                            cursor: "pointer",
                                            "&:hover": {
                                                color: "rgb(30, 175, 255)",
                                                textDecoration: "underline",
                                            },
                                        }}
                                    >
                                        {row.name}
                                    </Typography>
                                </ButtonBase>
                            }
                        />
                    </Box>
                </StyledTableCellNoVert>

                { /* Rarity */}
                <StyledTableCellNoVert>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img src={(`${process.env.REACT_APP_URL}/stars/Icon_${row.rarity}_Stars.png`)} alt={row.rarity} style={{ height: "25px" }} />
                    </Box>
                </StyledTableCellNoVert>

                { /* Weapon */}
                <StyledTableCellNoVert>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CardHeader sx={{ p: 0 }}
                            avatar={
                                <img alt={row.weapon} src={(`${process.env.REACT_APP_URL}/weapons/icons/Icon_${row.type}.png`)}
                                    style={{
                                        width: "36px",
                                        border: "1px solid rgba(0, 0, 0, 0)",
                                        borderRadius: "64px",
                                    }}
                                />
                            }
                            title={
                                <Typography variant="body2" sx={{ fontFamily: "Genshin, sans-serif" }}>
                                    {row.type}
                                </Typography>
                            }
                        />
                    </Box>
                </StyledTableCellNoVert>

                { /* Base ATK */}
                <StyledTableCellNoVert>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body2" sx={{ fontFamily: "Genshin, sans-serif" }}>
                            {row.atk}
                        </Typography>
                    </Box>
                </StyledTableCellNoVert>

                { /* 2nd Stat */}
                <StyledTableCellNoVert>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body2" sx={{ fontFamily: "Genshin, sans-serif" }}>
                            {row.subStat}
                        </Typography>
                    </Box>
                </StyledTableCellNoVert>

            </StyledTableRows>
        </React.Fragment >
    )
}

export default WeaponRow