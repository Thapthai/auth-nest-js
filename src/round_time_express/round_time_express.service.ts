import { Injectable } from '@nestjs/common';
import { CreateRoundTimeExpressDto } from './dto/create-round_time_express.dto';
import { UpdateRoundTimeExpressDto } from './dto/update-round_time_express.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoundTimeExpressService {
  constructor(private readonly prisma: PrismaService) { }

  create(createRoundTimeExpressDto: CreateRoundTimeExpressDto) {
    return this.prisma.round_time_express.create({
      data: createRoundTimeExpressDto,
    });
  }

  findAll() {
    return this.prisma.round_time_express.findMany();
  }


  async findAllRoundTimeExpressPagination(
    {
      page = 1,
      pageSize = 10,
      saleoffice_id = ''
    }:
      {
        page?: number;
        pageSize?: number;
        saleoffice_id?: string
      }
  ) {
    const skip = (page - 1) * pageSize;


    const where: any = {};

    if (saleoffice_id) {
      where.sale_office_id = parseInt(saleoffice_id);
    }

    const total = await this.prisma.round_time_express.count({
      where,
    });

    const data = await this.prisma.round_time_express.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { id: 'asc' },
      select: {
        id: true,
        time: true,
        sale_office_id: true,
        status: true,
        create_at: true,
        update_at: true,
      },
    });

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  findOne(id: number) {
    return this.prisma.round_time_express.findUnique({
      where: { id },
    });
  }

  update(id: number, updateRoundTimeExpressDto: UpdateRoundTimeExpressDto) {
    return this.prisma.round_time_express.update({
      where: { id },
      data: updateRoundTimeExpressDto,
    });
  }

  remove(id: number) {
    return this.prisma.round_time_express.delete({
      where: { id },
    });
  }
}
