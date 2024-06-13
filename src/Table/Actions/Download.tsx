import React from "react";
import { TableData } from "../../data/data";
import DownloadIcon from "../../Icons/DownloadIcon";

interface DownloadProps {
  downloadAbleData: TableData[];
}

const Download: React.FC<DownloadProps> = ({ downloadAbleData }) => {

  /**
  * Handles the Download functionality when user clicks on it
  */
  const handleDownload = function (): void {
    let alertData = "";
    downloadAbleData.forEach((row) => {
      alertData += `Device: ${row.device} Path: ${row.path}\n`;
    });

    alert(alertData);
  };

 /**
 * Handles the Download functionality when user press the enter key on it for accessibility
 */
  const handleDownloadKeyUp = function (
    event: React.KeyboardEvent<HTMLButtonElement>
  ): void {
    if (event.key === "Enter" && downloadAbleData.length !== 0) {
      handleDownload();
    }

  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className={downloadAbleData.length !== 0 ? "active" : ""}
      onKeyUp={handleDownloadKeyUp}
      disabled={downloadAbleData.length === 0}
    >
      <DownloadIcon isActive={!!downloadAbleData.length} />
      Download Selected
    </button>
  );
};

export default Download;
