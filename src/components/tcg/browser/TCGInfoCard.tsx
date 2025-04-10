import { CSSProperties } from "react";

// Component imports
import Image from "custom/Image";
import TCGHPIcon from "../TCGHPIcon";
import TCGEnergyIcon from "../TCGEnergyIcon";
import RouterLink from "components/nav/RouterLink";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import {
    useTheme,
    alpha,
    SxProps,
    Box,
    Card,
    Stack,
    Skeleton,
} from "@mui/material";

// Helper imports
import { pxToInt, zoomImageOnHover } from "helpers/utils";
import TCGCostIcon from "../TCGCostIcon";

interface TCGInfoCardProps {
    name: string;
    displayName?: string;
    id?: string;
    type: "character" | "action";
    size?: string;
    showName?: boolean;
    infoMain?: {
        hp?: number;
        cost?: string;
        energy?: string;
    };
    infoSecondary?: {
        energy?: string;
    };
    disableLink?: boolean;
    disableZoomOnHover?: boolean;
    loading?: boolean;
    imgLoad?: "lazy" | "eager";
}

function TCGInfoCard({
    name,
    displayName = name,
    id = displayName,
    type,
    size = "128px",
    showName = true,
    infoMain,
    infoSecondary,
    disableLink = false,
    disableZoomOnHover = false,
    loading = false,
    imgLoad = "eager",
}: TCGInfoCardProps) {
    const theme = useTheme();

    id = `${id.split(" ").join("")}-${type}-tcgCard`;

    const borderWidth = theme.displayCard.borderWidth;
    const borderRadius = "16px";
    const borderColor = theme.border.color.primary;

    const scale = showName ? 1.05 : 1;
    const imgSrc = `tcg/${type}_cards/${name}`;

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
        width: size,
        height: "auto",
        borderRadius: borderRadius,
        background: showName
            ? `linear-gradient(to bottom, transparent, ${theme.appbar.backgroundColor})`
            : "transparent",
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
        width: "auto",
        backgroundColor: "transparent",
    };

    const imageStyle: CSSProperties = {
        width: size,
        height: "100%",
        transform: `scale(${scale})`,
    };

    const cardImage = (
        <Image
            src={imgSrc}
            alt={name}
            id={`${id}-img`}
            style={imageStyle}
            loading={imgLoad}
        />
    );

    return (
        <Card sx={rootStyle} elevation={showName ? 2 : 0}>
            {!loading ? (
                <>
                    <Card elevation={0} sx={cardStyle}>
                        <Box
                            onMouseEnter={() => handleHover("enter")}
                            onMouseLeave={() => handleHover("leave")}
                            sx={imageContainerStyle}
                        >
                            {!disableLink ? (
                                <RouterLink
                                    to={`/tcg/${name
                                        .split(" ")
                                        .join("_")
                                        .toLowerCase()}`}
                                >
                                    {cardImage}
                                </RouterLink>
                            ) : (
                                cardImage
                            )}
                        </Box>
                        {showName && (
                            <Box
                                sx={{
                                    display: "flex",
                                    p: "8px",
                                }}
                            >
                                <RouterLink
                                    to={`/tcg/${name
                                        .split(" ")
                                        .join("_")
                                        .toLowerCase()}`}
                                    sx={{ mx: "auto" }}
                                >
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
                                            pointerEvents: !disableLink
                                                ? "auto"
                                                : "none",
                                        }}
                                        variant="body2-styled"
                                    >
                                        {showName && displayName}
                                    </TextStyled>
                                </RouterLink>
                            </Box>
                        )}
                    </Card>
                    {infoMain && (
                        <Stack
                            sx={{
                                position: "absolute",
                                zIndex: 5,
                                top: "-8px",
                                left: "-12%",
                            }}
                        >
                            {infoMain.hp !== undefined && (
                                <TCGHPIcon
                                    hp={infoMain.hp}
                                    size={`${pxToInt(size) / 3.2}px`}
                                />
                            )}
                            {infoMain.cost !== undefined && (
                                <TCGCostIcon
                                    cost={infoMain.cost}
                                    orientation="column"
                                    size={`${pxToInt(size) / (8 / 3)}px`}
                                />
                            )}
                            {/* {infoMain.energy !== undefined && (
                                <TCGCostIcon
                                    cost={infoMain.energy}
                                    orientation="column"
                                    size={`${pxToInt(size) / 3.2}px`}
                                />
                            )} */}
                        </Stack>
                    )}
                    {infoSecondary && (
                        <Stack
                            sx={{
                                position: "absolute",
                                zIndex: 5,
                                top: 0,
                                right: 0,
                                backgroundColor: alpha(
                                    theme.appbar.backgroundColor,
                                    0.675
                                ),
                                borderRadius: "0px 15px 0px 8px",
                            }}
                        >
                            {infoSecondary.energy !== undefined && (
                                <TCGEnergyIcon
                                    energy={infoSecondary.energy}
                                    size={`${pxToInt(size) / (16 / 3)}px`}
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

export default TCGInfoCard;
