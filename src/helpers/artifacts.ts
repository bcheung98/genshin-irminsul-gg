import { Artifact, ArtifactPiece } from "types/artifact";

export function formatPieceType(piece: ArtifactPiece) {
    switch (piece) {
        case "flower":
            return "Flower of Life";
        case "feather":
            return "Plume of Death";
        case "sands":
            return "Sands of Eon";
        case "goblet":
            return "Goblet of Eonothem";
        case "circlet":
            return "Circlet of Logos";
    }
}

export function formatSetEffectKeys(key: keyof Artifact["setEffect"]) {
    switch (key) {
        case "onePiece":
            return "1-Piece";
        case "twoPiece":
            return "2-Pieces";
        case "fourPiece":
            return "4-Pieces";
    }
}
