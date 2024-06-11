import React from "react";

interface TableHeaderProps {
    tableHeadings: string[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ tableHeadings }) => {
    return (
        <thead>
            <tr>
                {tableHeadings.map((heading, headIndex) => {
                    return (
                        <th key={`head-${headIndex}`}>
                            {heading === "id" ? "" : heading}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
};

export default TableHeader;