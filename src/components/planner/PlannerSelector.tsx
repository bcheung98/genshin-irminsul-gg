import { useState } from "react";

// Component imports
import CharacterSelector from "./CharacterSelector";
import WeaponSelector from "./WeaponSelector";
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Card, Stack, Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Helper imports
import { toTitleCase } from "helpers/utils";

function PlannerSelector({ type }: { type: "character" | "weapon" }) {
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const selector =
        type === "character" ? (
            <CharacterSelector handleClose={handleClose} />
        ) : (
            <WeaponSelector handleClose={handleClose} />
        );

    const icon =
        type === "character" ? (
            <Image
                src="icons/Aether"
                alt="Characters"
                style={{
                    width: "24px",
                    height: "24px",
                    backgroundColor: theme.appbar.backgroundColor,
                    borderRadius: "4px",
                }}
            />
        ) : (
            <Image
                src="icons/Weapons"
                alt="Weapons"
                style={{
                    width: "28px",
                    height: "28px",
                    backgroundColor: theme.appbar.backgroundColor,
                    borderRadius: "4px",
                }}
            />
        );

    return (
        <>
            <Card
                sx={{
                    p: "16px",
                    width: "auto",
                    height: "32px",
                    borderRadius: "8px",
                    backgroundColor: theme.background(2),
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    "&:hover": {
                        backgroundColor: theme.background(2, "light"),
                    },
                }}
                onClick={handleClickOpen}
            >
                <Stack spacing={1} direction="row" alignItems="center">
                    {icon}
                    <TextStyled
                        variant="body2-styled"
                        sx={{
                            textTransform: "capitalize",
                        }}
                    >
                        {`Add ${type}`}
                    </TextStyled>
                </Stack>
            </Card>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="xs"
                fullWidth
                disableScrollLock
            >
                <MainContentBox
                    title={`Add a ${toTitleCase(type)}`}
                    actions={
                        <IconButton
                            disableRipple
                            onClick={handleClose}
                            sx={{ color: theme.appbar.color }}
                        >
                            <CloseIcon />
                        </IconButton>
                    }
                    contentProps={{ padding: "16px 8px" }}
                >
                    {selector}
                </MainContentBox>
            </Dialog>
        </>
    );
}

export default PlannerSelector;
