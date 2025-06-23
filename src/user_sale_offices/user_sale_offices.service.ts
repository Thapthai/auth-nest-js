import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserSaleOfficeDto } from './dto/create-user_sale_office.dto';
import { UpdateUserSaleOfficeDto } from './dto/update-user_sale_office.dto';

@Injectable()
export class UserSaleOfficesService {
  constructor(private prisma: PrismaService) { }

  create(data: CreateUserSaleOfficeDto) {
    return this.prisma.user_sale_offices.create({ data });
  }

  findAll() {
    return this.prisma.user_sale_offices.findMany({
      include: {
        user: true,
        sale_office: true,
      },
    });
  }

  findSaleOfficesByUserId(userId: number) {
    return this.prisma.user_sale_offices.findMany({
      where: { user_id: userId },
      include: {
        sale_office: true, // ดึงข้อมูลสาขา
      },
    });
  }


  findOne(id: number) {
    return this.prisma.user_sale_offices.findUnique({
      where: { id },
      include: {
        user: true,
        sale_office: true,
      },
    });
  }

  update(id: number, data: UpdateUserSaleOfficeDto) {
    return this.prisma.user_sale_offices.update({
      where: { id },
      data,
    });
  }


  async updateUserSaleOffice(id: number, userSaleOfficedto: UpdateUserSaleOfficeDto) {
    const { sale_office_ids } = userSaleOfficedto;

    const currentOffices = await this.prisma.user_sale_offices.findMany({
      where: { user_id: id },
      select: { sale_office_id: true },
    });

    const currentIds = currentOffices.map((o) => o.sale_office_id);

    const toAdd = sale_office_ids.filter((id) => !currentIds.includes(id));

    const toRemove = currentIds.filter((id) => !sale_office_ids.includes(id));

    await this.prisma.user_sale_offices.createMany({
      data: toAdd.map((sale_office_id) => ({
        user_id: id,
        sale_office_id,
      })),
      skipDuplicates: true,
    });

    await this.prisma.user_sale_offices.deleteMany({
      where: {
        user_id: id,
        sale_office_id: { in: toRemove },
      },
    });

    return { message: 'Updated successfully' };
  }


  remove(id: number) {
    return this.prisma.user_sale_offices.delete({ where: { id } });
  }
}
