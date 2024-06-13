import React from "react";
import { TableData } from "../../data/data";
import TableRow from "../TableRow/TableRow";

interface TableBodyProps {
  tableData: TableData[];
  tableHeadings: string[];
  selectedRowIds: string[];
  setSelectedRowIds: (ids: string[]) => void;
}

const TableBody: React.FC<TableBodyProps> = ({ tableData, tableHeadings, selectedRowIds, setSelectedRowIds }) => {

  /**
   * Handles the selection and deselection of table rows
   * @param isSelected - Rows checkbox is selected or not
   * @param selectedId - The id associated with the checkbox
   */
  const handleSelection = function (isSelected: boolean, selectedId: string) {

    if (isSelected) {
      setSelectedRowIds([...selectedRowIds, selectedId]);
    } else {
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