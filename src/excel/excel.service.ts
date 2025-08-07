import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { Response } from 'express';

export interface ExcelColumn {
  header: string;
  key: string;
  width?: number;
  style?: Partial<ExcelJS.Style>;
}

export interface ExcelSheetData {
  name: string;
  data: any[];
  columns: ExcelColumn[];
  title?: string;
  summary?: { [key: string]: any };
  chartData?: ChartConfig;
}

export interface ChartConfig {
  type: 'pie' | 'column' | 'line' | 'bar';
  title: string;
  categories: string[];
  series: {
    name: string;
    data: number[];
  }[];
}

export interface ExcelExportOptions {
  filename: string;
  sheets: ExcelSheetData[];
  author?: string;
  company?: string;
  title?: string;
  subject?: string;
  keywords?: string[];
  includeCharts?: boolean;
  templateStyle?: 'modern' | 'classic' | 'minimal';
}

@Injectable()
export class ExcelService {
  /**
   * สร้าง Excel file ที่มีฟีเจอร์ครบครัน
   */
  async createAdvancedExcel(options: ExcelExportOptions): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();

    // ตั้งค่า metadata ของ workbook
    workbook.creator = options.author || 'POSE System';
    workbook.lastModifiedBy = options.author || 'POSE System';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();

    // ตั้งค่า properties
    if (options.title) workbook.title = options.title;
    if (options.subject) workbook.subject = options.subject;
    if (options.company) workbook.company = options.company;
    if (options.keywords) workbook.keywords = options.keywords.join(',');

    // สร้าง worksheets
    for (const sheetData of options.sheets) {
      await this.createWorksheet(workbook, sheetData, options.templateStyle || 'modern');
    }

    // แปลงเป็น buffer
    return Buffer.from(await workbook.xlsx.writeBuffer());
  }

  /**
   * สร้าง worksheet พร้อม styling และฟีเจอร์ขั้นสูง
   */
  private async createWorksheet(
    workbook: ExcelJS.Workbook,
    sheetData: ExcelSheetData,
    style: 'modern' | 'classic' | 'minimal'
  ): Promise<void> {
    const worksheet = workbook.addWorksheet(sheetData.name);

    let currentRow = 1;

    // เพิ่ม title หากมี
    if (sheetData.title) {
      const titleCell = worksheet.getCell(`A${currentRow}`);
      titleCell.value = sheetData.title;
      titleCell.font = { size: 16, bold: true, color: { argb: 'FF2F5496' } };
      titleCell.alignment = { horizontal: 'center', vertical: 'middle' };

      // Merge cells สำหรับ title
      worksheet.mergeCells(`A${currentRow}:${this.getColumnLetter(sheetData.columns.length)}${currentRow}`);
      currentRow += 2;
    }

    // เพิ่ม summary หากมี
    if (sheetData.summary) {
      await this.addSummarySection(worksheet, sheetData.summary, currentRow, style);
      currentRow += Object.keys(sheetData.summary).length + 2;
    }

    // ตั้งค่า columns
    worksheet.columns = sheetData.columns.map(col => ({
      header: col.header,
      key: col.key,
      width: col.width || 15
    }));

    // Style headers
    const headerRow = worksheet.getRow(currentRow);
    this.styleHeaderRow(headerRow, style);
    currentRow++;

    // เพิ่มข้อมูล
    for (const item of sheetData.data) {
      const row = worksheet.addRow(item);
      this.styleDataRow(row, style);
    }

    // เพิ่ม auto filter
    worksheet.autoFilter = {
      from: { row: currentRow - sheetData.data.length - 1, column: 1 },
      to: { row: currentRow - 1, column: sheetData.columns.length }
    };

    // เพิ่ม charts หากต้องการ
    if (sheetData.chartData) {
      await this.addChart(worksheet, sheetData.chartData, currentRow + 2);
    }

    // เพิ่ม conditional formatting
    this.addConditionalFormatting(worksheet, sheetData, currentRow - sheetData.data.length - 1, currentRow - 1);

    // Freeze top row
    worksheet.views = [{ state: 'frozen', ySplit: currentRow - sheetData.data.length - 1 }];
  }

  /**
   * เพิ่ม summary section
   */
  private async addSummarySection(
    worksheet: ExcelJS.Worksheet,
    summary: { [key: string]: any },
    startRow: number,
    style: string
  ): Promise<void> {
    let row = startRow;

    for (const [key, value] of Object.entries(summary)) {
      const keyCell = worksheet.getCell(`A${row}`);
      const valueCell = worksheet.getCell(`B${row}`);

      keyCell.value = key;
      keyCell.font = { bold: true, color: { argb: 'FF404040' } };
      keyCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF2F2F2' } };

      valueCell.value = value;
      valueCell.font = { color: { argb: 'FF404040' } };

      // เพิ่ม border
      [keyCell, valueCell].forEach(cell => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });

      row++;
    }
  }

  /**
   * Style header row ตาม template
   */
  private styleHeaderRow(row: ExcelJS.Row, style: string): void {
    const styleConfig = {
      modern: {
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2F5496' } },
        font: { color: { argb: 'FFFFFFFF' }, bold: true, size: 11 },
        alignment: { horizontal: 'center', vertical: 'middle' }
      },
      classic: {
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF366092' } },
        font: { color: { argb: 'FFFFFFFF' }, bold: true, size: 10 },
        alignment: { horizontal: 'center', vertical: 'middle' }
      },
      minimal: {
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8F9FA' } },
        font: { color: { argb: 'FF495057' }, bold: true, size: 10 },
        alignment: { horizontal: 'left', vertical: 'middle' }
      }
    };

    const config = styleConfig[style];

    row.eachCell((cell) => {
      cell.fill = config.fill as any;
      cell.font = config.font;
      cell.alignment = config.alignment;
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });

    row.height = 25;
  }

  /**
   * Style data rows
   */
  private styleDataRow(row: ExcelJS.Row, style: string): void {
    row.eachCell((cell, colNumber) => {
      // Alternate row colors
      const isEvenRow = row.number % 2 === 0;

      if (style === 'modern' && isEvenRow) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8F9FA' } };
      }

      cell.border = {
        top: { style: 'thin', color: { argb: 'FFE1E5E9' } },
        left: { style: 'thin', color: { argb: 'FFE1E5E9' } },
        bottom: { style: 'thin', color: { argb: 'FFE1E5E9' } },
        right: { style: 'thin', color: { argb: 'FFE1E5E9' } }
      };

      cell.alignment = { vertical: 'middle' };

      // Auto-format numbers and dates
      if (typeof cell.value === 'number') {
        if (cell.value > 1000000000) {
          // Likely a timestamp
          cell.numFmt = 'dd/mm/yyyy hh:mm';
          cell.value = new Date(cell.value);
        } else if (cell.value % 1 !== 0) {
          // Decimal number
          cell.numFmt = '#,##0.00';
        } else {
          // Integer
          cell.numFmt = '#,##0';
        }
      }
    });

    row.height = 20;
  }

  /**
   * เพิ่ม conditional formatting
   */
  private addConditionalFormatting(
    worksheet: ExcelJS.Worksheet,
    sheetData: ExcelSheetData,
    startRow: number,
    endRow: number
  ): void {
    // ตัวอย่าง: highlight negative numbers
    sheetData.columns.forEach((col, index) => {
      if (col.key.includes('amount') || col.key.includes('price') || col.key.includes('total')) {
        worksheet.addConditionalFormatting({
          ref: `${this.getColumnLetter(index + 1)}${startRow + 1}:${this.getColumnLetter(index + 1)}${endRow}`,
          rules: [
            {
              type: 'cellIs',
              operator: 'lessThan',
              priority: 1,
              formulae: [0],
              style: {
                fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: 'FFFFC7CE' } },
                font: { color: { argb: 'FF9C0006' } }
              }
            }
          ]
        });
      }

      // Highlight status columns
      if (col.key.includes('status')) {
        worksheet.addConditionalFormatting({
          ref: `${this.getColumnLetter(index + 1)}${startRow + 1}:${this.getColumnLetter(index + 1)}${endRow}`,
          rules: [
            {
              type: 'containsText',
              operator: 'containsText',
              priority: 1,
              text: 'active',
              style: {
                fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: 'FFC6EFCE' } },
                font: { color: { argb: 'FF006100' } }
              }
            },
            {
              type: 'containsText',
              operator: 'containsText',
              priority: 2,
              text: 'inactive',
              style: {
                fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: 'FFFFC7CE' } },
                font: { color: { argb: 'FF9C0006' } }
              }
            }
          ]
        });
      }
    });
  }

  /**
   * เพิ่ม chart (ต้องใช้ร่วมกับ chartjs-to-image หรือวิธีอื่น)
   */
  private async addChart(worksheet: ExcelJS.Worksheet, chartConfig: ChartConfig, startRow: number): Promise<void> {
    // สำหรับ ExcelJS เราสามารถเพิ่มข้อมูลสำหรับ chart แต่ต้องใช้ tools อื่นช่วยสร้าง chart image
    // ในที่นี้เราจะเพิ่ม summary table สำหรับ chart data

    const chartStartRow = startRow + 2;

    // เพิ่ม chart title
    const titleCell = worksheet.getCell(`A${chartStartRow}`);
    titleCell.value = `Chart Data: ${chartConfig.title}`;
    titleCell.font = { bold: true, size: 12 };

    // เพิ่ม chart data table
    let currentRow = chartStartRow + 2;

    // Headers
    const headerRow = worksheet.getRow(currentRow);
    headerRow.getCell(1).value = 'Category';
    chartConfig.series.forEach((series, index) => {
      headerRow.getCell(index + 2).value = series.name;
    });

    this.styleHeaderRow(headerRow, 'modern');
    currentRow++;

    // Data
    chartConfig.categories.forEach((category, index) => {
      const dataRow = worksheet.getRow(currentRow);
      dataRow.getCell(1).value = category;

      chartConfig.series.forEach((series, seriesIndex) => {
        dataRow.getCell(seriesIndex + 2).value = series.data[index] || 0;
      });

      this.styleDataRow(dataRow, 'modern');
      currentRow++;
    });
  }

  /**
   * ส่ง Excel file เป็น response
   */
  async sendExcelResponse(res: Response, buffer: Buffer, filename: string): Promise<void> {
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', buffer.length);
    res.send(buffer);
  }

  /**
   * สร้าง Excel สำหรับ export ข้อมูลตาราง
   */
  async exportTableData(
    data: any[],
    columns: ExcelColumn[],
    options: Partial<ExcelExportOptions> = {}
  ): Promise<Buffer> {
    const defaultOptions: ExcelExportOptions = {
      filename: 'export.xlsx',
      sheets: [{
        name: 'Data',
        data,
        columns,
        title: 'Data Export'
      }],
      templateStyle: 'modern',
      ...options
    };

    return this.createAdvancedExcel(defaultOptions);
  }

  /**
   * สร้าง Excel report พร้อม multiple sheets
   */
  async createMultiSheetReport(sheets: ExcelSheetData[], options: Partial<ExcelExportOptions> = {}): Promise<Buffer> {
    const defaultOptions: ExcelExportOptions = {
      filename: 'report.xlsx',
      sheets,
      templateStyle: 'modern',
      author: 'POSE System',
      company: 'POSE Company',
      ...options
    };

    return this.createAdvancedExcel(defaultOptions);
  }

  /**
   * Utility function to get column letter (A, B, C, ..., AA, AB, ...)
   */
  private getColumnLetter(colNumber: number): string {
    let letter = '';
    while (colNumber > 0) {
      const remainder = (colNumber - 1) % 26;
      letter = String.fromCharCode(65 + remainder) + letter;
      colNumber = Math.floor((colNumber - 1) / 26);
    }
    return letter;
  }

  /**
   * สร้าง Excel template สำหรับ import ข้อมูล
   */
  async createImportTemplate(columns: ExcelColumn[], sampleData?: any[]): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Template');

    // เพิ่ม instruction sheet
    const instructionSheet = workbook.addWorksheet('Instructions');
    instructionSheet.getCell('A1').value = 'Template Instructions';
    instructionSheet.getCell('A1').font = { bold: true, size: 14 };
    instructionSheet.getCell('A3').value = '1. Fill in the data in the "Template" sheet';
    instructionSheet.getCell('A4').value = '2. Do not modify the column headers';
    instructionSheet.getCell('A5').value = '3. Follow the data format shown in sample rows';
    instructionSheet.getCell('A6').value = '4. Save the file and upload';

    // Setup template sheet
    worksheet.columns = columns.map(col => ({
      header: col.header,
      key: col.key,
      width: col.width || 15
    }));

    // Style header
    const headerRow = worksheet.getRow(1);
    this.styleHeaderRow(headerRow, 'modern');

    // Add sample data if provided
    if (sampleData && sampleData.length > 0) {
      sampleData.forEach(item => {
        const row = worksheet.addRow(item);
        this.styleDataRow(row, 'modern');
      });
    }

    // Add data validation for specific columns
    columns.forEach((col, index) => {
      const columnLetter = this.getColumnLetter(index + 1);

      // Add validation for boolean fields
      if (col.key.includes('status') || col.key.includes('is_')) {
        // Data validation for boolean fields - simplified version
        const range = `${columnLetter}2:${columnLetter}1000`;
        // Note: ExcelJS data validation API may vary by version
        try {
          (worksheet as any).dataValidations?.add(range, {
            type: 'list',
            allowBlank: true,
            formulae: ['"true,false"']
          });
        } catch (e) {
          // Fallback: skip validation if not supported
        }
      }
    });

    return Buffer.from(await workbook.xlsx.writeBuffer());
  }
}