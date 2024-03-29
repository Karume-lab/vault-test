import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import mData from "./../MOCK_DATA.json";

const BasicTable = () => {
  //       {
  //     "id": 85,
  //     "first_name": "Errol",
  //     "last_name": "Dodshon",
  //     "email": "edodshon2c@yale.edu",
  //     "gender": "Male",
  //     "dob": "2020-09-06T23:30:21Z"
  //   },
  const data = useMemo(() => mData, []);
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const columns = [
    { id: "id", header: "ID", accessorKey: "id" },
    { id: "first_name", header: "First Name", accessorKey: "first_name" },
    { id: "last_name", header: "Last Name", accessorKey: "last_name" },
    { id: "email", header: "Email", accessorKey: "email" },
    { id: "gender", header: "Gender", accessorKey: "gender" },
    { id: "dob", header: "DOB", accessorKey: "dob" },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div>
      <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        { asc: "UP", desc: "DOWN" }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => table.setPageIndex(0)}>First Page</button>
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          Previous Page
        </button>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Next Page
        </button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
          Last Page
        </button>
      </div>
    </div>
  );
};

export default BasicTable;
