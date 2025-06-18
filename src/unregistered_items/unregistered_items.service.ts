import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUnregisteredItemDto } from './dto/create-unregistered_item.dto';
import { UpdateUnregisteredItemDto } from './dto/update-unregistered_item.dto';

@Injectable()
export class UnregisteredItemsService {
  constructor(private readonly prisma: PrismaService) { }

  // create(createDto: CreateUnregisteredItemDto) {
  //   return this.prisma.unregistered_items.create({
  //     data: createDto,
  //   });
  // }

  async create(createDto: CreateUnregisteredItemDto) {
    const existing = await this.prisma.unregistered_items.findFirst({
      where: {
        name: createDto.name,
        type_linen: createDto.type_linen,
      },
    });

    if (existing) {
      return existing;
    }

    return this.prisma.unregistered_items.create({
      data: createDto,
    });
  }


  findAll() {
    return this.prisma.unregistered_items.findMany();
  }

  findOne(id: number) {
    return this.prisma.unregistered_items.findUnique({
      where: { id },
    });
  }

  update(id: number, updateDto: UpdateUnregisteredItemDto) {
    return this.prisma.unregistered_items.update({
      where: { id },
      data: updateDto,
    });
  }

  remove(id: number) {
    return this.prisma.unregistered_items.delete({
      where: { id },
    });
  }
}
