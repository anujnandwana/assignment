import React from "react";
import { TableData } from "../data/data";
import TableRow from "./TableRow";

interface TableBodyProps {
    tableData: TableData[];
    tableHeadings: string[];
    selectedRowIds: string[];
    setSelectedRowIds: any;
}


const TableBody: React.FC<TableBodyProps> = ({ tableData, tableHeadings, selectedRowIds, setSelectedRowIds }) => {

  /**
   * Handles the selection and deselection of table rows
   * @param event - The change event from the checkbox input
   * @param selectedId - The id associated with the checkbox
   */
  const handleSelection = function (isSelected: boolean, selectedId: string) {
    if (isSelected) {
      // Add the row ID to the selectedRows if checked
      setSelectedRowIds([...selectedRowIds, selectedId]);
    } else {
      // Remove the row ID from the selectedRows if unchecked
      const selectedIds: string[] = [];
      selectedRowIds.forEach((id) => {
        if (id !== selectedId) {
          selectedIds.push(id);
        }
      });
      setSelectedRowIds(selectedIds);
    }

  };
  
    return (
        <tbody className="data-table-container">
            {tableData.map((rowData) => {
                return (
                    <TableRow
                        key={rowData.id}
                        rowData={rowData}
                        tableHeadings={tableHeadings}
                        isSelected={selectedRowIds.includes(rowData.id as string)}
                        onSelectRow={handleSelection}
                    />
                );
            })}
        </tbody>
    );
};

export default TableBody;