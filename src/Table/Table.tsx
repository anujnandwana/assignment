import React from "react";
import { TableData } from "../data/data";
import "./Table.css";
import TableBody from "./TableBody/TableBody";
import TableCaption from "./TableCaption/TableCaption";
import TableHeader from "./TableHeader/TableHeader";
import { v4 as uuidv4 } from 'uuid';

interface TableProps {
  data: TableData[];
}

function Table(props: TableProps) {
  const [tableData, setTableData] = React.useState<TableData[]>([]);
  const [selectedRowIds, setSelectedRowIds] = React.useState<string[]>([]);
  const [selectAll, setSelectAll] = React.useState(false);


  React.useEffect(() => {
    const tableIdsData: TableData[] = props?.data.map((rowData) => {
      // Adding the uniqueId to each row  
      rowData = { id: uuidv4(), ...rowData };
      return rowData;
    });

    setTableData(tableIdsData);
  }, [props?.data]);


  /** 
   * Handles the selectAll checkbox state by checking if all the checkbox is selected or not
   */
  React.useEffect(() => {
    setSelectAll(selectedRowIds.length === tableData.length)
  }, [selectedRowIds, tableData]);


  /**
   * Return the Array of table headings.
   * Memoize the calculation of table headings 
   * to avoid recomputation on each render for performance.
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
