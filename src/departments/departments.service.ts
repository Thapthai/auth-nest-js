import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DepartmentsService {
  constructor(private readonly prisma: PrismaService) { }

  // Function to get detailed duplicate information
  async getDuplicateFieldDetails(department_code: string, sale_office_id: number, excludeId?: number): Promise<string[]> {
    const duplicateFields: string[] = [];

    // Check department_code within the same sale_office_id only
    const existingDepartmentCode = await this.prisma.departments.findFirst({
      where: {
        department_code,
        sale_office_id, // ต้องเป็น sale_office_id เดียวกัน
        ...(excludeId && { NOT: { id: excludeId } })
      }
    });

    if (existingDepartmentCode) {
      duplicateFields.push('Department code already exists in this sale office');
    }

    return duplicateFields;
  }


  async create(createDepartmentDto: CreateDepartmentDto) {
    // Check for duplicates
    const duplicateFields = await this.getDuplicateFieldDetails(
      createDepartmentDto.department_code,
      createDepartmentDto.sale_office_id
    );

    if (duplicateFields.length > 0) {
      throw new ConflictException(duplicateFields);
    }

    return this.prisma.departments.create({
      data: createDepartmentDto,
    });
  }

  async findAll() {
    return this.prisma.departments.findMany({
      include: {
        sale_office: false,
      },
      orderBy: { id: 'desc' },
    });
  }


  async findAllBySaleOffice({ page, pageSize, keyword, saleOfficeId }: {
    page: number;
    pageSize: number;
    keyword: string;
    saleOfficeId?: number;
  }) {
    const skip = (page - 1) * pageSize;

    // นับจำนวนรวมก่อน (total)
    const total = await this.prisma.departments.count({
      where: {
        AND: [
          saleOfficeId ? { sale_office_id: saleOfficeId } : {},
          {
            OR: [
              { name_th: { contains: keyword } },
              { name_en: { contains: keyword } },
              { department_code: { contains: keyword } },
              { description: { contains: keyword } },
            ],
          },
        ],
      },
    });

    // ดึงข้อมูลแบบ paginate
    const items = await this.prisma.departments.findMany({
      where: {
        AND: [
          saleOfficeId ? { sale_office_id: saleOfficeId } : {},
          {
            OR: [
              { name_th: { contains: keyword } },
              { name_en: { contains: keyword } },
              { department_code: { contains: keyword } },
              { description: { contains: keyword } },
            ],
          },
        ],
      },
      skip,
      take: pageSize,
      orderBy: { id: 'asc' },
      select: {
        id: true,
        department_code: true,
        name_th: true,
        name_en: true,
        description: true,
        status: true,
        create_at: true,
        update_at: true,
      },
    });

    return { items, total };
  }


  async findOne(id: number) {
    const department = await this.prisma.departments.findUnique({
      where: { id },
    });
    if (!department) {
      throw new NotFoundException(`Department #${id} not found`);
    }
    return department;
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const existingDepartment = await this.findOne(id); // ตรวจสอบก่อนว่า department มีอยู่จริง

    // Check for duplicates only if department_code or sale_office_id is being updated
    if (updateDepartmentDto.department_code || updateDepartmentDto.sale_office_id) {
      const duplicateFields = await this.getDuplicateFieldDetails(
        updateDepartmentDto.department_code || existingDepartment.department_code,
        updateDepartmentDto.sale_office_id || existingDepartment.sale_office_id,
        id // Exclude current record
      );

      if (duplicateFields.length > 0) {
        throw new ConflictException(duplicateFields);
      }
    }

    return this.prisma.departments.update({
      where: { id },
      data: updateDepartmentDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // ตรวจสอบก่อนว่า department มีอยู่จริง
    return this.prisma.departments.delete({
      where: { id },
    });
  }
}
