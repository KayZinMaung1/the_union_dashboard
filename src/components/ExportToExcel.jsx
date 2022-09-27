import React from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { ExportOutlined } from "@ant-design/icons";
import MediumButton from './MediumButton';
import { useTranslation } from "react-i18next";

const ExportToExcel = ({ apiData, fileName }) => {
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const {t} = useTranslation();

    const exportToCSV = (apiData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(apiData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };


    return (
        <MediumButton icon={<ExportOutlined />} text={t("component.export")} bgColor="var(--green-color)" onClick={(e) => exportToCSV(apiData, fileName)}/>
    );
};
export default ExportToExcel;