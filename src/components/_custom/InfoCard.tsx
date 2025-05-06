import { CSSProperties } from "react";

// Component imports
import Image from "./Image";
import RouterLink from "components/nav/RouterLink";
import { StyledTooltip } from "styled/StyledTooltip";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, SxProps, Box, Card, Stack, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { getRarityColor } from "helpers/rarityColors";
import { zoomImageOnHover } from "helpers/utils";
import { formatMaterialName } from "helpers/materials";
import { getTalentMaterial } from "data/materials/talentMaterials";
import { getWeeklyBossMaterial } from "data/materials/weeklyBossMaterials";
import { getCommonMaterial } from "data/materials/commonMaterials";
import { getBossMaterial } from "data/materials/bossMaterials";

// Type imports
import { Element, Rarity, WeaponType } from "types/_common";
import { CharacterMaterials } from "types/materials";
import {
    CharacterAscensionStat,
    characterAscensionStats,
} from "data/characterAscensionStats";
import { WeaponSubStat } from "data/weaponStats";

interface InfoCardProps {
    name: string;
    displayName?: string;
    id?: string;
    type: "character" | "weapon" | "artifact";
    rarity?: Rarity;
    variant?: "icon" | "avatar" | "material-card";
    size?: string;
    showName?: boolean;
    info?: {
        element?: Element;
        weapon?: WeaponType;
        subStat?: CharacterAscensionStat | WeaponSubStat;
    };
    materials?: CharacterMaterials;
    backgroundColor?: string;
    disableTooltip?: boolean;
    disableLink?: boolean;
    disableZoomOnHover?: boolean;
    loading?: boolean;
    imgLoad?: "lazy" | "eager";
}

function InfoCard({
    name,
    displayName = name,
    id = displayName,
    type,
    rarity = 3,
    variant = "avatar",
    size = "128px",
    showName = variant !== "icon",
    info,
    materials,
    backgroundColor,
    disableTooltip = showName,
    disableLink = false,
    disableZoomOnHover = variant === "material-card",
    loading = false,
    imgLoad = "eager",
}: InfoCardProps) {
    const theme = useTheme();

    id = `${id.split(" ").join("")}-${variant}-infoCard`;

    const borderWidth = variant !== "icon" ? theme.displayCard.borderWidth : 2;
    const borderRadius = variant === "icon" ? "4px" : "16px";
    const borderColor =
        variant === "icon"
            ? getRarityColor(rarity)
            : theme.border.color.primary;

    size = variant === "icon" ? "64px" : variant === "avatar" ? size : "96px";
    const imgSize =
        variant === "icon" ? `calc(${size} - ${borderWidth * 2}px)` : size;

    let scale = 1;
    let imgSrc = "",
        route;
    switch (type) {
        case "character":
            imgSrc = `characters/avatars/${name}`;
            route = "characters";
            break;
        case "weapon":
            imgSrc = `weapons/${name}`;
            scale = variant === "avatar" ? 1.05 : 1;
            route = "weapons";
            break;
        case "artifact":
            imgSrc = `artifacts/sets/${name.split(" ").join("_")}/${
                name.startsWith("Prayers") ? "circlet" : "flower"
            }`;
            route = "artifacts";
            break;
    }
    const href = !disableLink
        ? `/${route}/${name.split(" ").join("_").toLowerCase()}`
        : "";

    const handleHover = (direction: "enter" | "leave") => {
        !disableZoomOnHover &&
            zoomImageOnHover({
                direction,
                id: `${id}-img`,
                baseScale: scale,
                zoom: scale + 0.05,
            });
    };

    const rootStyle: SxProps = {
        position: "relative",
        overflow: "visible",
        width: variant !== "material-card" ? size : "auto",
        height: variant !== "icon" ? "auto" : size,
        borderRadius: borderRadius,
        background: `linear-gradient(to bottom, transparent, ${theme.appbar.backgroundColor})`,
    };

    const cardStyle: SxProps = {
        borderStyle: "solid",
        borderWidth: borderWidth,
        borderColor: borderColor,
        borderRadius: borderRadius,
        backgroundColor: "transparent",
    };

    const imageContainerStyle: SxProps = {
        display: "flex",
        overflow: "clip",
        width:
            variant === "material-card" ? `calc(${imgSize} * 8 / 3)` : "auto",
        backgroundColor:
            variant === "avatar" && type === "character"
                ? backgroundColor
                : "transparent",
        backgroundImage:
            variant === "avatar" && type === "character"
                ? null
                : `url(https://assets.irminsul.gg/${
                      variant === "material-card" ? "wuwa" : "genshin"
                  }/backgrounds/Background_${rarity}_Star.png)`,
        backgroundSize: "contain",
        backgroundRepeat: variant === "material-card" ? "repeat" : "no-repeat",
    };

    const imageStyle: CSSProperties = {
        width: imgSize,
        height: "100%",
        transform: `scale(${scale})`,
    };

    const infoIconStyle: CSSProperties = {
        width: `calc(${imgSize} / 8 + 12px)`,
        height: `calc(${imgSize} / 8 + 12px)`,
        minWidth: "28px",
        minHeight: "28px",
        padding: "4px",
    };

    return (
        <Card sx={rootStyle} elevation={2}>
            {!loading ? (
                <>
                    <Card elevation={0} sx={cardStyle}>
                        <StyledTooltip
                            title={!disableTooltip ? displayName : ""}
                            arrow
                            placement="top"
                        >
                            <Box
                                onMouseEnter={() => handleHover("enter")}
                                onMouseLeave={() => handleHover("leave")}
                                sx={imageContainerStyle}
                            >
                                <RouterLink to={href}>
                                    <Image
                                        src={imgSrc}
                                        alt={name}
                                        id={`${id}-img`}
                                        style={imageStyle}
                                        loading={imgLoad}
                                    />
                                </RouterLink>
                                {variant === "material-card" && materials && (
                                    <MaterialGrid
                                        materials={materials}
                                        size={imgSize}
                                    />
                                )}
                            </Box>
                        </StyledTooltip>
                        {showName && (
                            <Box
                                sx={{
                                    display: "flex",
                                    p: "8px",
                                    borderTop:
                                        variant === "icon"
                                            ? "none"
                                            : `calc(${imgSize} / 20) solid ${getRarityColor(
                                                  rarity
                                              )}`,
                                }}
                            >
                                <RouterLink to={href} sx={{ mx: "auto" }}>
                                    <TextStyled
                                        onMouseEnter={() =>
                                            handleHover("enter")
                                        }
                                        onMouseLeave={() =>
                                            handleHover("leave")
                                        }
                                        sx={{
                                            color: theme.appbar.color,
                                            textAlign: "center",
                                        }}
                                        variant={
                                            variant === "material-card"
                                                ? "body1-styled"
                                                : "body2-styled"
                                        }
                                    >
                                        {showName && displayName}
                                    </TextStyled>
                                </RouterLink>
                            </Box>
                        )}
                    </Card>
                    {info && (
                        <Stack
                            sx={{
                                position: "absolute",
                                zIndex: 5,
                                top: "-4px",
                                left: "-12px",
                                backgroundColor: theme.appbar.backgroundColor,
                                borderRadius: "16px",
                            }}
                        >
                            {info.element !== undefined && (
                                <Image
                                    src={`elements/${info.element}`}
                                    alt={info.element}
                                    style={infoIconStyle}
                                    tooltip={info.element}
                                />
                            )}
                            {info.weapon !== undefined && (
                                <Image
                                    src={`weapons/icons/${info.weapon}`}
                                    alt={info.weapon}
                                    style={infoIconStyle}
                                    tooltip={info.weapon}
                                />
                            )}
                            {info.subStat && (
                                <Image
                                    src={`icons/ascension_stats/${info.subStat}`}
                                    alt={info.subStat}
                                    style={infoIconStyle}
                                    tooltip={
                                        characterAscensionStats[info.subStat]
                                            .title
                                    }
                                />
                            )}
                        </Stack>
                    )}
                </>
            ) : (
                <Skeleton
                    variant="rounded"
                    width={size}
                    height={size}
                    sx={{ borderRadius: borderRadius }}
                />
            )}
        </Card>
    );
}

export default InfoCard;

function MaterialGrid({
    materials,
    size,
}: {
    materials: CharacterMaterials;
    size: string;
}) {
    const theme = useTheme();

    const { talentBook, commonMat, localMat, bossMat, weeklyBossMat } =
        materials;

    const images = [
        {
            src: `materials/talent/${talentBook}3`,
            tag: formatMaterialName(getTalentMaterial({ tag: talentBook })),
        },
        {
            src: `materials/weekly/${weeklyBossMat}`,
            tag: formatMaterialName(
                getWeeklyBossMaterial({ tag: weeklyBossMat })
            ),
        },
        {
            src: `materials/common/${commonMat}3`,
            tag: formatMaterialName(getCommonMaterial({ tag: commonMat })),
        },
        {
            src: `materials/boss/${bossMat}`,
            tag: formatMaterialName(getBossMaterial({ tag: bossMat })),
        },
        {
            src: `materials/local/${localMat}`,
            tag: localMat,
        },
    ];

    return (
        <Box sx={{ px: "8px", py: "4px", height: size }}>
            <Grid container spacing={0.75}>
                {images.map((img) => (
                    <Image
                        key={img.tag}
                        src={img.src}
                        alt={img.tag}
                        style={{
                            width: `calc(${size} / (8 / 3.5))`,
                            border: `1px solid ${theme.border.color.primary}`,
                            borderRadius: "4px",
                            backgroundColor: theme.icon.backgroundColor,
                        }}
                        tooltip={img.tag}
                    />
                ))}
            </Grid>
        </Box>
    );
}
