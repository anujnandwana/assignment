import React from "react";
import { TableData } from "../data/data";
import Download from "../Icons/Download";

interface TableCaptionProps {
  selectedRowIds: string[];
  setSelectedRowIds: (ids: string[]) => void;
  selectAll: boolean;
  tableData: TableData[];
}


const TableCaption: React.FC<TableCaptionProps> = ({ selectedRowIds, setSelectedRowIds, selectAll, tableData }) => {

  const [downloadAbleData, setDownloadAbleData] = React.useState<TableData[]>([]);;

  React.useEffect(() => {
    const availableStatusData = tableData.filter((row) => selectedRowIds.includes(row.id as string) && row.status === "available");
    setDownloadAbleData(availableStatusData);
  }, [tableData, selectedRowIds]);

  const handleDownloadClick = function (): void {
    let alertData = "";

    downloadAbleData.forEach((row) => {
      alertData = alertData + "Device:" + row.device + " Path:" + row.path + "\n";
    });

    alert(alertData);
  }

  const handleDownloadKeyUp = function (event: React.KeyboardEvent<HTMLButtonElement>): void {
    if(event.key === "Enter" && downloadAbleData.length !== 0){
      handleDownloadClick()
    }
    return;
  }

  

  /**
   * Handles the selection and deselection of selectAll using keyboard and mouse
   * @param isSelected - The row is selected or not 
   * @param keyType - The type of key pressed 
   */
  const handleSelectAll = function (isSelected: boolean, keyType: string | undefined) {

    if (keyType !== undefined && keyType !== 'Enter') {
      return;
    }

    if ((isSelected && keyType === undefined) || (keyType === 'Enter' && isSelected)) {
      setSelectedRowIds(
        tableData.map((row) => {
          return row.id as string;
        })
      );
    } else {
      setSelectedRowIds([]);
    }
  };


  return (
    <caption>
      <input type="checkbox" aria-label="Select All Rows"
        checked={selectAll}
        onChange={(event) => handleSelectAll(event.target.checked, undefined)}
        onKeyUp={(event) => handleSelectAll(!selectAll, event.key)}
      />
      <label > {!selectedRowIds.length ? "None Selected" : `Selected ${selectedRowIds.length}`}</label>
      <button type="button" onClick={() => handleDownloadClick()} className={downloadAbleData.length !== 0 ? "active" : ""} onKeyUp={(event)=>handleDownloadKeyUp(event)}> <Download isActive={!!downloadAbleData.length}/>Download Selected</button>
    </caption>
  );
};

export default TableCaption;