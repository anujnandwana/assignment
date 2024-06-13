import React from "react";
import { TableData } from "../../data/data";
import DownloadAction from "../Actions/Download";
import SelectAll from "../Actions/SelectAll";
import SelectedText from "../Actions/SelectedText";

interface TableCaptionProps {
  selectedRowIds: string[];
  setSelectedRowIds: (ids: string[]) => void;
  selectAll: boolean;
  tableData: TableData[];
}

const TableCaption: React.FC<TableCaptionProps> = ({
  selectedRowIds,
  setSelectedRowIds,
  selectAll,
  tableData,
}) => {
  const [downloadAbleData, setDownloadAbleData] = React.useState<TableData[]>([]);

  
  /**
   * Update the disable/enable status of download btn by checking available status
   */
  React.useEffect(() => {
    const availableStatusData = tableData.filter(
      (row) =>
        selectedRowIds.includes(row.id as string) && row.status === "available"
    );
    setDownloadAbleData(availableStatusData);
  }, [tableData, selectedRowIds]);


  return (
    <caption>
      <SelectAll selectAll={selectAll} setSelectedRowIds={setSelectedRowIds} tableData={tableData} />
      <SelectedText selectedRowIds={selectedRowIds} />
      <DownloadAction downloadAbleData={downloadAbleData} />
    </caption>
  );
};

export default TableCaption;
