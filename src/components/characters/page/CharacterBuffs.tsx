// Component imports
import ToggleButtons from "custom/ToggleButtons";
import type { CharacterBuffs } from "types/character";

function CharacterBuffs({ versions, value, onChange }: CharacterBuffs) {
    return versions && versions.length > 1 ? (
        <ToggleButtons
            color="secondary"
            buttons={versions}
            value={value}
            exclusive
            onChange={onChange}
            spacing={0}
            padding={10}
            highlightOnHover={false}
        />
    ) : null;
}

export default CharacterBuffs;
