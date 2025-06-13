import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewLinenDto } from './dto/create-new_linen.dto';
import { UpdateNewLinenDto } from './dto/update-new_linen.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NewLinensService {
  constructor(private prisma: PrismaService) { }

  async create(createNewLinenDto: CreateNewLinenDto) {

    try {
      const { factory_id, department_id, total } = createNewLinenDto;

      const doc_no = "NLT-" + Date.now(); // สร้างรหัสเอกสารอัตโนมัติ
      const now = new Date();

      return await this.prisma.new_linens.create({
        data: {
          doc_no: doc_no,
          doc_date: now,
          sale_office_id: 1, // <- แก้ตามจริง
          department_id: department_id,  // <- แก้ตามจริง
          factory_id: factory_id,
          total: total,
          is_recive: false,
          status: true,
        },
      });

    } catch (error) {
      throw new Error("Create dirty failed: " + error.message);
    }
  }

  async findAll() {
    return this.prisma.new_linens.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async findPaginated(page: number, limit: number, keyword?: string) {
    const skip = (page - 1) * limit;

    const where = keyword
      ? {
        doc_no: {
          contains: keyword,
        }
      }
      : {};

    const [data, total] = await Promise.all([
      this.prisma.new_linens.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'desc' },
      }),
      this.prisma.new_linens.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }



  async findOne(id: number) {
    const linen = await this.prisma.new_linens.findUnique({
      where: { id },
    });
    if (!linen) throw new NotFoundException(`NewLinen with id ${id} not found`);
    return linen;
  }

  async update(id: number, updateNewLinenDto: UpdateNewLinenDto) {
    await this.findOne(id); // validate existence
    return this.prisma.new_linens.update({
      where: { id },
      data: updateNewLinenDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // validate existence
    return this.prisma.new_linens.delete({
      where: { id },
    });
  }
}
