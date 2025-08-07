import { useState, BaseSyntheticEvent, useMemo } from "react";

// Component imports
import InfoCard from "custom/InfoCard";
import SearchBar from "custom/SearchBar";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import Grid from "@mui/material/Grid2";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectArtifacts } from "reducers/artifact";

// Type imports
import { Artifact } from "types/artifact";

function ArtifactBrowser() {
    const documentTitle = `Artifact ${import.meta.env.VITE_DOCUMENT_TITLE}`;
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

    const artifacts = [...useAppSelector(selectArtifacts)].sort(
        (a, b) =>
            b.release.version.localeCompare(a.release.version) ||
            b.rarity - a.rarity ||
            b.displayName.localeCompare(a.displayName)
    );

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = (event: BaseSyntheticEvent) => {
        setSearchValue(event.target.value);
    };

    const currentArtifacts = useMemo(
        () => filterArtifacts(artifacts, searchValue),
        [artifacts, searchValue]
    );

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
                <Grid size={{ xs: 12, sm: "auto" }}>
                    <SearchBar
                        placeholder="Search"
                        value={searchValue}
                        onChange={handleInputChange}
                        size={{ height: "36px" }}
                    />
                </Grid>
            </Grid>
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
