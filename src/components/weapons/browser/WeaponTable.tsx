import { BaseSyntheticEvent, useState } from "react";

// Component imports
import WeaponTableRow from "./WeaponTableRow";
import MainContentBox from "custom/MainContentBox";
import SortTableHead, {
    getComparator,
    HeadColumn,
    Order,
} from "custom/SortTableHead";

// MUI imports
import { Table, TableContainer, TableBody } from "@mui/material";

// Helper imports
import { baseATKScaling, subStats, WeaponBaseATK } from "data/weaponStats";

// Type imports
import { Weapon } from "types/weapon";

export type WeaponRow = Pick<
    Weapon,
    "id" | "name" | "displayName" | "rarity" | "type"
>;

function WeaponTable({ weapons }: { weapons: Weapon[] }) {
    const [order, setOrder] = useState<Order>("desc");
    const [orderBy, setOrderBy] = useState("rarity");

    const handleRequestSort = (_: BaseSyntheticEvent, property: string) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const headColumns: HeadColumn[] = [
        { id: "displayName", label: "Name" },
        { id: "rarity", label: "Rarity" },
        { id: "type", label: "Type" },
        { id: "baseATK", label: "ATK" },
        { id: "subStat", label: "Substat" },
    ];

    const rows = weapons.map((weapon) => {
        const baseATK = weapon.stats.atk.toString() as WeaponBaseATK;
        const atk = baseATKScaling[baseATK].slice(-1)[0];
        const subStat = weapon.stats.subStat
            ? `${weapon.stats.subStat} ${
                  subStats[baseATK][weapon.stats.subStat]?.slice(-1)[0]
              }`
            : "_";
        return {
            id: weapon.id,
            name: weapon.name,
            displayName: weapon.displayName,
            rarity: weapon.rarity,
            type: weapon.type,
            baseATK: atk.toLocaleString(),
            subStat: subStat,
        };
    });

    return (
        <MainContentBox
            title={`${weapons.length} ${
                weapons.length === 1 ? "Weapon" : "Weapons"
            }`}
            contentProps={{ padding: 0 }}
        >
            <TableContainer>
                <Table>
                    <SortTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        headColumns={headColumns}
                    />
                    <TableBody>
                        {rows
                            .sort(getComparator(order, orderBy, "displayName"))
                            .map((row) => (
                                <WeaponTableRow
                                    key={row.displayName}
                                    row={row}
                                />
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainContentBox>
    );
}

export default WeaponTable;
