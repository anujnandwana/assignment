import React from "react";
import { TableData } from "../../data/data";

interface SelectAllProps {
    selectAll: boolean;
    setSelectedRowIds: (ids: string[]) => void;
    tableData: TableData[]
}

const SelectAll: React.FC<SelectAllProps> = ({ selectAll, setSelectedRowIds, tableData }) => {

   /**
   * Handles the selection and deselection of selectAll using keyboard and mouse
   * @param isSelected - The selectAll checkbox is selected or not
   * @param keyType - The type of key pressed
   */
    const handleSelectAll = function (isSelected: boolean, keyType: string | undefined) {
        
        if (keyType !== undefined && keyType !== "Enter") {
            return;
        }

        if ((isSelected && keyType === undefined) || (keyType === "Enter" && isSelected)) {
            setSelectedRowIds( tableData.map((row) => row.id as string));
        } else {
            setSelectedRowIds([]);
        }
    };

    return (
        <input
            type="checkbox"
            aria-label="Select All Rows"
            checked={selectAll}
            onChange={(event) => handleSelectAll(event.target.checked, undefined)}
            onKeyUp={(event) => handleSelectAll(!selectAll, event.key)}
        />
    );
};

export default SelectAll;
