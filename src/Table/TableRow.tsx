import React from "react";
import "./Table.css";

interface TableRowProps {
  rowData: any;
  tableHeadings: string[];
  isSelected: boolean;
  onSelectRow: (isSelected: boolean, selectedId: string) => void;
}

const TableRow: React.FC<TableRowProps> = ({
  rowData,
  tableHeadings,
  isSelected,
  onSelectRow,
}) => {
    
  /**
   * Handles the selection and deselection of table rows
   * @param event - The change event from the checkbox input
   * @param selectedData - The row data associated with the checkbox
   */
  const handleSelectRow = (
    event: React.ChangeEvent<HTMLInputElement>,
    selectedId: string
  ) => {
    onSelectRow(event.target.checked, selectedId);
  };

  /**
   * Handles key up events for the checkbox
   * @param event - The keyboard event
   * @param rowData - The row data associated with the checkbox
   */
  const handleKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>,
    selectedId: string
  ) => {
    if (event.key === "Enter") {
      onSelectRow(!isSelected, selectedId);
    }
  };

  return (
    <tr className={isSelected ? "active " : ""}>
      {tableHeadings.map((heading, colIndex) => (
        <td
          key={`row-${rowData.id}-col-${colIndex}`}
          aria-label={heading}
          className={heading}
          data-status={heading === "status" ? rowData[heading] : undefined}
        >
          {heading === "id" ? (
            <input
              type="checkbox"
              className="row-selector"
              onChange={(event) => handleSelectRow(event, rowData.id)}
              onKeyUp={(event) => handleKeyUp(event, rowData.id)}
              checked={isSelected}
              aria-checked={isSelected}
              aria-labelledby={`row-${rowData.id}-label`}
            />
          ) : (
            rowData[heading]
          )}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
