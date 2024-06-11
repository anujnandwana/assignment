import React from "react";
import { TableData } from "../data/data";
import "./Table.css";
import TableBody from "./TableBody";
import TableCaption from "./TableCaption";
import TableHeader from "./TableHeader";

interface TableProps {
  data: TableData[];
}

function Table(props: TableProps) {
  // State for storing the table data along with the unique IDs
  const [tableData, setTableData] = React.useState<TableData[]>([]);

  // State for storing the IDs of Selected Rows
  const [selectedRowIds, setSelectedRowIds] = React.useState<string[]>([]);

  // State for storing the selectAll values 
  const [selectAll, setSelectAll] = React.useState(false);

  // Adding the random uniqueId to each row 
  React.useEffect(() => {
    const tableIdsData: TableData[] = props?.data.map((rowData) => {
      rowData = { id: crypto.randomUUID(), ...rowData };
      return rowData;
    });

    setTableData(tableIdsData);
  }, [props?.data]);


  React.useEffect(() => {
    setSelectAll(selectedRowIds.length === tableData.length)
  }, [selectedRowIds, tableData]);


  /**
   * Return the Array of table headings also
   * Memoize the calculation of table headings to avoid recomputation on each render
   */
  const headings = React.useMemo(() => {
    const rowHeadings = tableData.reduce((acc: string[], curr: Object) => {
      acc.push(...Object.keys(curr));
      return acc;
    }, []);
    return Array.from(new Set(rowHeadings));
  }, [tableData]);


  return (
    <div id={"data-table-wrapper"}>
      <table className="data-table" role="grid" aria-label="Data Table">
        <TableCaption selectedRowIds={selectedRowIds} setSelectedRowIds={setSelectedRowIds} tableData={tableData} selectAll={selectAll} />
        <TableHeader tableHeadings={headings} />
        <TableBody tableData={tableData} tableHeadings={headings} selectedRowIds={selectedRowIds} setSelectedRowIds={setSelectedRowIds} />

      </table>
    </div>
  );
}

export default Table;
