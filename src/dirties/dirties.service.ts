import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDirtyDto } from './dto/create-dirty.dto';
import { UpdateDirtyDto } from './dto/update-dirty.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DirtiesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createDirtyDto: CreateDirtyDto) {
    try {
      const { factory_id } = createDirtyDto;

      const dirty_doc_no = "DRT-" + Date.now(); // สร้างรหัสเอกสารอัตโนมัติ
      const now = new Date();

      return await this.prisma.dirties.create({
        data: {
          dirty_doc_no: dirty_doc_no,
          dirty_doc_date: now,
          sale_office_id: 1, // <- แก้ตามจริง
          department_id: 1,  // <- แก้ตามจริง
          factory_id: factory_id,
          status: true,
        },
      });

    } catch (error) {
      throw new Error("Create dirty failed: " + error.message);
    }
  }


  findAll() {
    return this.prisma.dirties.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async findPaginated(page: number, limit: number, keyword?: string) {
    const skip = (page - 1) * limit;

    const where = keyword
      ? {
        dirty_doc_no: {
          contains: keyword,
        }
      }
      : {};

    const [data, total] = await Promise.all([
      this.prisma.dirties.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'desc' },
      }),
      this.prisma.dirties.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }




  async findOne(id: number) {
    const dirty = await this.prisma.dirties.findUnique({ where: { id } });
    if (!dirty) throw new NotFoundException(`Dirty #${id} not found`);
    return dirty;
  }

  async update(id: number, updateDirtyDto: UpdateDirtyDto) {
    await this.findOne(id); // ตรวจสอบก่อนว่ามีจริง
    return this.prisma.dirties.update({
      where: { id },
      data: {
        ...updateDirtyDto,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // ตรวจสอบก่อนว่ามีจริง
    return this.prisma.dirties.delete({ where: { id } });
  }
}
