import { QueryDto } from "src/entitys/query.dto";
import { UserQueryDto } from "src/modules/user/user.dto";
import * as XLSX from 'xlsx';
import * as PATH from 'path'
import * as AWS from 'aws-sdk';
import * as fs from 'fs';
export const excelExport=(data:any,fileName:string) => {

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Schools');
    const currentDate = new Date().toISOString().replace(/:/g, '-').substring(0, 19);
    const filePath = PATH.join('assets', `${fileName}${currentDate}.xlsx`);

    if (!fs.existsSync('assets')) {
        fs.mkdirSync('assets');
    }

    XLSX.writeFile(wb, filePath);
    return filePath;
}