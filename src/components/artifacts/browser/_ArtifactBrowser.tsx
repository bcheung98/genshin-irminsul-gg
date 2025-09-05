import { useState, BaseSyntheticEvent, useMemo } from "react";

// Component imports
import ArtifactListRow from "./ArtifactListRow";
import InfoCard from "custom/InfoCard";
import ToggleButtons, { CustomToggleButtonProps } from "custom/ToggleButtons";
import SearchBar from "custom/SearchBar";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { Card } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import TableRowsIcon from "@mui/icons-material/TableRows";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { selectArtifacts } from "reducers/artifact";
import { selectBrowserSettings, setBrowserView, View } from "reducers/browser";
import { parseVersionNumber } from "helpers/utils";

// Type imports
import { Artifact } from "types/artifact";

function ArtifactBrowser() {
    const documentTitle = `Artifacts ${import.meta.env.VITE_DOCUMENT_TITLE}`;
    const documentDesc = `A list of all Genshin Impact Artifact Sets`;
    document.title = documentTitle;
    document
        .querySelector('meta[property="og:title"]')
        ?.setAttribute("content", documentTitle);
    document
        .querySelector('meta[property="description"]')
        ?.setAttribute("content", documentDesc);
    document
        .querySelector('meta[property="og:description"]')
        ?.setAttribute("content", documentDesc);

    const dispatch = useAppDispatch();

    const artifacts = [...useAppSelector(selectArtifacts)].sort(
        (a, b) =>
            parseVersionNumber(b.release.version).localeCompare(
                parseVersionNumber(a.release.version)
            ) ||
            b.rarity - a.rarity ||
            b.displayName.localeCompare(a.displayName)
    );

    const browserSettings = useAppSelector(selectBrowserSettings).artifacts;

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = (event: BaseSyntheticEvent) => {
        setSearchValue(event.target.value);
    };

    const currentArtifacts = useMemo(
        () => filterArtifacts(artifacts, searchValue),
        [artifacts, searchValue]
    );

    const currentView = browserSettings.view;
    const [view, setView] = useState<View>(currentView);
    const handleView = (_: BaseSyntheticEvent, view: View) => {
        if (view !== null) {
            setView(view);
            dispatch(setBrowserView({ type: "artifacts", view }));
        }
    };
    const buttons: CustomToggleButtonProps[] = [
        {
            value: "icon",
            icon: <ViewCompactIcon />,
        },
        {
            value: "table",
            icon: <TableRowsIcon />,
        },
    ];

    return (
        <>
            <Grid
                container
                rowSpacing={2}
                columnSpacing={3}
                sx={{ mb: "20px" }}
            >
                <Grid size="auto">
                    <TextStyled variant="h5-styled" sx={{ lineHeight: "36px" }}>
                        Artifacts
                    </TextStyled>
                </Grid>
                <Grid size={{ xs: 6, sm: "auto" }}>
                    <ToggleButtons
                        color="primary"
                        buttons={buttons}
                        value={view}
                        exclusive
                        onChange={handleView}
                        highlightOnHover={false}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: "auto" }}>
                    <SearchBar
                        placeholder="Search"
                        value={searchValue}
                        onChange={handleInputChange}
                        size={{ height: "36px" }}
                    />
                </Grid>
            </Grid>
            {view === "icon" && (
                <Grid container spacing={3}>
                    {currentArtifacts.map((artifact, index) => (
                        <InfoCard
                            key={index}
                            id={`${artifact.name}-artifactBrowser`}
                            name={artifact.name}
                            displayName={artifact.displayName}
                            type="artifact"
                            rarity={artifact.rarity}
                        />
                    ))}
                </Grid>
            )}
            {view === "table" && (
                <Card>
                    {currentArtifacts.map((artifact, index) => (
                        <ArtifactListRow
                            key={index}
                            artifact={artifact}
                            index={index}
                        />
                    ))}
                </Card>
            )}
        </>
    );
}

export default ArtifactBrowser;

function filterArtifacts(artifacts: Artifact[], searchValue: string) {
    if (searchValue !== "") {
        return artifacts.filter(
            (artifact) =>
                artifact.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) ||
                artifact.displayName
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
        );
    } else {
        return artifacts;
    }
}
