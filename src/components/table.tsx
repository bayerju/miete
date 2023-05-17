import React, { useMemo } from 'react';
import MaterialReactTable, { type MRT_ColumnDef } from 'material-react-table';
import { map } from 'lodash';
// import { data, type Person } from './makeData';
export interface Data {
    scenario: string;
    claudia: number;
    clinton: number;
    lukas: number;
    jezabel: number;
    julian: number;
    jeju: number;
    wohnNeu: number;
    agatheNeu: number;
    beschreibung: string;
}
interface Column {
    accessorKey: keyof Data;
    header: string;
}

interface Props {
    data: Data[];
    // columns?: Column[];
}

export const Table = (props: Props) => {
    const columns = useMemo<MRT_ColumnDef[]>(
        //column definitions...
        () => [
            {
                accessorKey: 'scenario',
                header: 'Szenario',
            },
            {
                accessorKey: 'claudia',
                header: 'Claudia',
            },
            {
                accessorKey: 'clinton',
                header: 'Clinton',
            },
            {
                accessorKey: 'lukas',
                header: 'Lukas',
            },
            {
                accessorKey: 'jezabel',
                header: 'Jezabel',
            },
            {
                accessorKey: 'julian',
                header: 'Julian',
            },
            {
                accessorKey: 'jeju',
                header: 'Jeju',
            },
            {
                accessorKey: 'wohnNeu',
                header: 'Wohnzimmer',
            },
            {
                accessorKey: 'agatheNeu',
                header: 'Agathe',
            },
            {
                accessorKey: 'beschreibung',
                header: 'Beschreibung',
                minSize: 300,
                size: 300,
                maxSize: 500,
            },
        ],
        [],
        //end
    );

    return (
        <MaterialReactTable
            columns={columns}
            data={props.data}
            enableColumnActions={false}
            enableColumnFilters={false}
            enablePagination={false}
            enableSorting={false}
            enableBottomToolbar={false}
            enableTopToolbar={false}
            muiTableBodyRowProps={{ hover: false }}
            muiTableBodyProps={{
                sx: {
                    //stripe the rows, make odd rows a darker color
                    '& tr:nth-of-type(odd)': {
                        backgroundColor: '#7d7d7d',
                    },
                },
            }}
            defaultColumn={{
                minSize: 20, //allow columns to get smaller than default
                maxSize: 300, //allow columns to get larger than default
                size: 110, //make columns wider by default
            }}
            enableColumnResizing
            layoutMode="grid" //instead of the default "semantic" layout mode
            muiTableHeadCellProps={{
                sx: {
                    flex: '0 0 auto',
                },
            }}
            muiTableBodyCellProps={{
                sx: {
                    flex: '0 0 auto',
                },
            }}
        />
    );
};
