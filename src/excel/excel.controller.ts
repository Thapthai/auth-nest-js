import { 
  Controller, 
  Post, 
  Get, 
  Body, 
  Res, 
  Param, 
  Query,
  UseGuards,
  BadRequestException 
} from '@nestjs/common';
import { Response } from 'express';
import { ExcelService, ExcelSheetData, ExcelColumn, ExcelExportOptions } from './excel.service';
import { PrismaService } from '../prisma/prisma.service';

// Import your auth guards if you have them
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface ExportRequestBody {
  type: 'users' | 'departments' | 'materials' | 'items' | 'dirties' | 'factories' | 'custom';
  filters?: any;
  columns?: string[];
  includeRelations?: boolean;
  customData?: any[];
  filename?: string;
  templateStyle?: 'modern' | 'classic' | 'minimal';
}

@Controller('excel')
// @UseGuards(JwtAuthGuard) // Uncomment if you want to protect these endpoints
export class ExcelController {
  constructor(
    private readonly excelService: ExcelService,
    private readonly prismaService: PrismaService
  ) {}

  /**
   * Export ข้อมูล Users
   */
  @Post('export/users')
  async exportUsers(@Body() body: ExportRequestBody, @Res() res: Response) {
    try {
      const users = await this.prismaService.user.findMany({
        where: body.filters,
        include: body.includeRelations ? {
          user_sale_office: {
            include: {
              sale_office: true
            }
          }
        } : undefined
      });

      const columns: ExcelColumn[] = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Name', key: 'name', width: 20 },
        { header: 'Email', key: 'email', width: 25 },
        { header: 'Permission ID', key: 'permission_id', width: 15 },
        { header: 'Email Verified', key: 'email_verified_at', width: 20 },
        { header: '2FA Enabled', key: 'is_two_factor_enabled', width: 15 },
        { header: 'Created At', key: 'create_at', width: 20 },
        { header: 'Updated At', key: 'update_at', width: 20 }
      ];

      // Add sale office info if relations are included
      if (body.includeRelations) {
        columns.push(
          { header: 'Sale Offices', key: 'sale_offices', width: 30 }
        );
        
        // Transform data to include sale office names
        users.forEach(user => {
          (user as any).sale_offices = (user as any).user_sale_office
            ?.map((uso: any) => uso.sale_office.site_office_name_th)
            .join(', ') || '';
        });
      }

      const buffer = await this.excelService.exportTableData(
        users,
        columns,
        {
          filename: body.filename || 'users_export.xlsx',
          templateStyle: body.templateStyle || 'modern',
          sheets: [{
            name: 'Users',
            data: users,
            columns,
            title: 'Users Export Report',
            summary: {
              'Total Users': users.length,
              'Active 2FA Users': users.filter(u => u.is_two_factor_enabled).length,
              'Export Date': new Date().toLocaleDateString('th-TH')
            }
          }]
        }
      );

      await this.excelService.sendExcelResponse(res, buffer, body.filename || 'users_export.xlsx');
    } catch (error) {
      throw new BadRequestException(`Failed to export users: ${error.message}`);
    }
  }

  /**
   * Export ข้อมูล Departments
   */
  @Post('export/departments')
  async exportDepartments(@Body() body: ExportRequestBody, @Res() res: Response) {
    try {
      const departments = await this.prismaService.departments.findMany({
        where: body.filters,
        include: body.includeRelations ? {
          sale_office: true
        } : undefined
      });

      const columns: ExcelColumn[] = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Department Code', key: 'department_code', width: 20 },
        { header: 'Description', key: 'description', width: 30 },
        { header: 'Group Code', key: 'group_code', width: 15 },
        { header: 'Ship ID', key: 'ship_id', width: 10 },
        { header: 'Is Default', key: 'is_default', width: 12 },
        { header: 'Name (TH)', key: 'name_th', width: 25 },
        { header: 'Name (EN)', key: 'name_en', width: 25 },
        { header: 'Status', key: 'status', width: 10 }
      ];

      if (body.includeRelations) {
        columns.push({ header: 'Sale Office', key: 'sale_office_name', width: 30 });
        departments.forEach(dept => {
          (dept as any).sale_office_name = (dept as any).sale_office?.site_office_name_th || '';
        });
      }

      const buffer = await this.excelService.exportTableData(
        departments,
        columns,
        {
          filename: body.filename || 'departments_export.xlsx',
          templateStyle: body.templateStyle || 'modern'
        }
      );

      await this.excelService.sendExcelResponse(res, buffer, body.filename || 'departments_export.xlsx');
    } catch (error) {
      throw new BadRequestException(`Failed to export departments: ${error.message}`);
    }
  }

  /**
   * Export ข้อมูล Materials
   */
  @Post('export/materials')
  async exportMaterials(@Body() body: ExportRequestBody, @Res() res: Response) {
    try {
      const materials = await this.prismaService.materials.findMany({
        where: body.filters,
        include: body.includeRelations ? {
          material_types: true,
          sap_sale: true
        } : undefined
      });

      const columns: ExcelColumn[] = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Material Code', key: 'material_code', width: 20 },
        { header: 'Name (TH)', key: 'material_name_th', width: 25 },
        { header: 'Name (EN)', key: 'material_name_en', width: 25 },
        { header: 'Long Name', key: 'long_meterial_name', width: 30 },
        { header: 'Description', key: 'description', width: 30 },
        { header: 'Status', key: 'status', width: 10 }
      ];

      if (body.includeRelations) {
        columns.push(
          { header: 'Material Type', key: 'material_type_name', width: 20 },
          { header: 'SAP Sale', key: 'sap_sale_code', width: 15 }
        );
        
        materials.forEach(material => {
          (material as any).material_type_name = (material as any).material_types?.name_th || '';
          (material as any).sap_sale_code = (material as any).sap_sale?.code || '';
        });
      }

      const buffer = await this.excelService.exportTableData(
        materials,
        columns,
        {
          filename: body.filename || 'materials_export.xlsx',
          templateStyle: body.templateStyle || 'modern'
        }
      );

      await this.excelService.sendExcelResponse(res, buffer, body.filename || 'materials_export.xlsx');
    } catch (error) {
      throw new BadRequestException(`Failed to export materials: ${error.message}`);
    }
  }

  /**
   * Export ข้อมูล Items
   */
  @Post('export/items')
  async exportItems(@Body() body: ExportRequestBody, @Res() res: Response) {
    try {
      const items = await this.prismaService.items.findMany({
        where: body.filters,
        include: body.includeRelations ? {
          material: true,
          item_category: true
        } : undefined
      });

      const columns: ExcelColumn[] = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'RFID Number', key: 'rfid_number', width: 20 },
        { header: 'Name (TH)', key: 'name_th', width: 25 },
        { header: 'Name (EN)', key: 'name_en', width: 25 },
        { header: 'Sale Office ID', key: 'saleoffice_id', width: 15 },
        { header: 'Department ID', key: 'department_id', width: 15 },
        { header: 'Status', key: 'status', width: 10 }
      ];

      if (body.includeRelations) {
        columns.push(
          { header: 'Material Code', key: 'material_code', width: 20 },
          { header: 'Category Name', key: 'category_name', width: 25 }
        );
        
        items.forEach(item => {
          (item as any).material_code = (item as any).material?.material_code || '';
          (item as any).category_name = (item as any).item_category?.name_th || '';
        });
      }

      const buffer = await this.excelService.exportTableData(
        items,
        columns,
        {
          filename: body.filename || 'items_export.xlsx',
          templateStyle: body.templateStyle || 'modern'
        }
      );

      await this.excelService.sendExcelResponse(res, buffer, body.filename || 'items_export.xlsx');
    } catch (error) {
      throw new BadRequestException(`Failed to export items: ${error.message}`);
    }
  }

  /**
   * Export ข้อมูล Dirties (รายการผ้าสกปรก)
   */
  @Post('export/dirties')
  async exportDirties(@Body() body: ExportRequestBody, @Res() res: Response) {
    try {
      const dirties = await this.prismaService.dirties.findMany({
        where: body.filters,
      });

      const columns: ExcelColumn[] = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Doc No', key: 'dirty_doc_no', width: 20 },
        { header: 'Doc Date', key: 'dirty_doc_date', width: 15 },
        { header: 'Sale Office ID', key: 'sale_office_id', width: 15 },
        { header: 'Factory ID', key: 'factory_id', width: 12 },
        { header: 'User ID', key: 'user_id', width: 10 },
        { header: 'Factory Sign Time', key: 'sign_factory_time', width: 20 },
        { header: 'NH Sign Time', key: 'sign_NH_time', width: 20 },
        { header: 'Status', key: 'status', width: 10 }
      ];

      const buffer = await this.excelService.exportTableData(
        dirties,
        columns,
        {
          filename: body.filename || 'dirties_export.xlsx',
          templateStyle: body.templateStyle || 'modern'
        }
      );

      await this.excelService.sendExcelResponse(res, buffer, body.filename || 'dirties_export.xlsx');
    } catch (error) {
      throw new BadRequestException(`Failed to export dirties: ${error.message}`);
    }
  }

  /**
   * Export ข้อมูล Factories
   */
  @Post('export/factories')
  async exportFactories(@Body() body: ExportRequestBody, @Res() res: Response) {
    try {
      const factories = await this.prismaService.factories.findMany({
        where: body.filters,
      });

      const columns: ExcelColumn[] = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Name (TH)', key: 'name_th', width: 25 },
        { header: 'Name (EN)', key: 'name_en', width: 25 },
        { header: 'Price', key: 'price', width: 15 },
        { header: 'Address', key: 'address', width: 40 },
        { header: 'Post', key: 'post', width: 10 },
        { header: 'Tel', key: 'tel', width: 15 },
        { header: 'Tax ID', key: 'tax_id', width: 15 },
        { header: 'Status', key: 'status', width: 10 }
      ];

      const buffer = await this.excelService.exportTableData(
        factories,
        columns,
        {
          filename: body.filename || 'factories_export.xlsx',
          templateStyle: body.templateStyle || 'modern'
        }
      );

      await this.excelService.sendExcelResponse(res, buffer, body.filename || 'factories_export.xlsx');
    } catch (error) {
      throw new BadRequestException(`Failed to export factories: ${error.message}`);
    }
  }

  /**
   * Export custom data
   */
  @Post('export/custom')
  async exportCustomData(@Body() body: ExportRequestBody, @Res() res: Response) {
    try {
      if (!body.customData || !Array.isArray(body.customData)) {
        throw new BadRequestException('Custom data is required and must be an array');
      }

      // Auto-generate columns from first data item if not provided
      let columns: ExcelColumn[] = [];
      if (body.customData.length > 0) {
        const firstItem = body.customData[0];
        columns = Object.keys(firstItem).map(key => ({
          header: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
          key,
          width: 15
        }));
      }

      const buffer = await this.excelService.exportTableData(
        body.customData,
        columns,
        {
          filename: body.filename || 'custom_export.xlsx',
          templateStyle: body.templateStyle || 'modern'
        }
      );

      await this.excelService.sendExcelResponse(res, buffer, body.filename || 'custom_export.xlsx');
    } catch (error) {
      throw new BadRequestException(`Failed to export custom data: ${error.message}`);
    }
  }

  /**
   * สร้าง Multi-sheet Report
   */
  @Post('export/multi-sheet-report')
  async exportMultiSheetReport(@Body() body: { sheets: any[], options?: any }, @Res() res: Response) {
    try {
      const sheets: ExcelSheetData[] = [];

      for (const sheetConfig of body.sheets) {
        let data: any[] = [];
        let columns: ExcelColumn[] = [];

        // Get data based on type
        switch (sheetConfig.type) {
          case 'users':
            data = await this.prismaService.user.findMany({ where: sheetConfig.filters });
            columns = [
              { header: 'ID', key: 'id', width: 10 },
              { header: 'Name', key: 'name', width: 20 },
              { header: 'Email', key: 'email', width: 25 },
              { header: '2FA Enabled', key: 'is_two_factor_enabled', width: 15 }
            ];
            break;
          case 'departments':
            data = await this.prismaService.departments.findMany({ where: sheetConfig.filters });
            columns = [
              { header: 'ID', key: 'id', width: 10 },
              { header: 'Code', key: 'department_code', width: 20 },
              { header: 'Name (TH)', key: 'name_th', width: 25 },
              { header: 'Status', key: 'status', width: 10 }
            ];
            break;
          case 'materials':
            data = await this.prismaService.materials.findMany({ where: sheetConfig.filters });
            columns = [
              { header: 'ID', key: 'id', width: 10 },
              { header: 'Code', key: 'material_code', width: 20 },
              { header: 'Name (TH)', key: 'material_name_th', width: 25 },
              { header: 'Status', key: 'status', width: 10 }
            ];
            break;
        }

        sheets.push({
          name: sheetConfig.name || sheetConfig.type,
          data,
          columns,
          title: sheetConfig.title || `${sheetConfig.type} Report`,
          summary: sheetConfig.includeSummary ? {
            'Total Records': data.length,
            'Export Date': new Date().toLocaleDateString('th-TH')
          } : undefined
        });
      }

      const buffer = await this.excelService.createMultiSheetReport(sheets, {
        filename: body.options?.filename || 'multi_sheet_report.xlsx',
        templateStyle: body.options?.templateStyle || 'modern',
        title: body.options?.title || 'Multi-Sheet Report',
        author: 'POSE System'
      });

      await this.excelService.sendExcelResponse(
        res, 
        buffer, 
        body.options?.filename || 'multi_sheet_report.xlsx'
      );
    } catch (error) {
      throw new BadRequestException(`Failed to export multi-sheet report: ${error.message}`);
    }
  }

  /**
   * สร้าง Import Template
   */
  @Get('template/:type')
  async getImportTemplate(@Param('type') type: string, @Res() res: Response) {
    try {
      let columns: ExcelColumn[] = [];
      let sampleData: any[] = [];

      switch (type) {
        case 'users':
          columns = [
            { header: 'Name', key: 'name', width: 20 },
            { header: 'Email', key: 'email', width: 25 },
            { header: 'Permission ID', key: 'permission_id', width: 15 },
            { header: 'Password', key: 'password', width: 20 }
          ];
          sampleData = [
            { name: 'John Doe', email: 'john@example.com', permission_id: 1, password: 'password123' },
            { name: 'Jane Smith', email: 'jane@example.com', permission_id: 2, password: 'password456' }
          ];
          break;
        case 'departments':
          columns = [
            { header: 'Department Code', key: 'department_code', width: 20 },
            { header: 'Sale Office ID', key: 'sale_office_id', width: 15 },
            { header: 'Description', key: 'description', width: 30 },
            { header: 'Group Code', key: 'group_code', width: 15 },
            { header: 'Ship ID', key: 'ship_id', width: 10 },
            { header: 'Is Default', key: 'is_default', width: 12 },
            { header: 'Name (TH)', key: 'name_th', width: 25 },
            { header: 'Name (EN)', key: 'name_en', width: 25 },
            { header: 'Status', key: 'status', width: 10 }
          ];
          break;
        case 'materials':
          columns = [
            { header: 'Material Code', key: 'material_code', width: 20 },
            { header: 'Name (TH)', key: 'material_name_th', width: 25 },
            { header: 'Name (EN)', key: 'material_name_en', width: 25 },
            { header: 'Long Name', key: 'long_meterial_name', width: 30 },
            { header: 'Material Type ID', key: 'material_type_id', width: 18 },
            { header: 'SAP Sale ID', key: 'sap_sale_id', width: 15 },
            { header: 'Description', key: 'description', width: 30 },
            { header: 'Status', key: 'status', width: 10 }
          ];
          break;
        default:
          throw new BadRequestException(`Template type '${type}' not supported`);
      }

      const buffer = await this.excelService.createImportTemplate(columns, sampleData);
      await this.excelService.sendExcelResponse(res, buffer, `${type}_import_template.xlsx`);
    } catch (error) {
      throw new BadRequestException(`Failed to create template: ${error.message}`);
    }
  }

  /**
   * Get available export types and their configurations
   */
  @Get('config')
  async getExportConfig() {
    return {
      availableTypes: [
        {
          type: 'users',
          name: 'Users',
          description: 'Export user data with optional relations',
          hasRelations: true,
          availableFilters: ['id', 'name', 'email', 'permission_id', 'is_two_factor_enabled']
        },
        {
          type: 'departments',
          name: 'Departments',
          description: 'Export department data',
          hasRelations: true,
          availableFilters: ['id', 'department_code', 'sale_office_id', 'status']
        },
        {
          type: 'materials',
          name: 'Materials',
          description: 'Export material data',
          hasRelations: true,
          availableFilters: ['id', 'material_code', 'material_type_id', 'status']
        },
        {
          type: 'items',
          name: 'Items',
          description: 'Export item data',
          hasRelations: true,
          availableFilters: ['id', 'rfid_number', 'saleoffice_id', 'department_id', 'status']
        },
        {
          type: 'dirties',
          name: 'Dirties',
          description: 'Export dirty linen data',
          hasRelations: false,
          availableFilters: ['id', 'dirty_doc_no', 'sale_office_id', 'factory_id', 'status']
        },
        {
          type: 'factories',
          name: 'Factories',
          description: 'Export factory data',
          hasRelations: false,
          availableFilters: ['id', 'name_th', 'name_en', 'status']
        },
        {
          type: 'custom',
          name: 'Custom Data',
          description: 'Export custom data provided in request',
          hasRelations: false,
          availableFilters: []
        }
      ],
      templateStyles: ['modern', 'classic', 'minimal'],
      supportedFormats: ['xlsx']
    };
  }
}