import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { VerifyEmail } from 'src/authentication/email/verifyEmail.service';
import { Prisma } from 'generated/prisma';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService,
    private readonly sendVerifyEmail: VerifyEmail
  ) { }


  async generateVerificationToken(email: string) {

    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new Error("Email not found");
    }

    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 1 วัน

    // ลบ token เดิม (กันซ้ำ)
    await this.prisma.verification_token.deleteMany({
      where: { email },
    });

    // สร้าง token ใหม่
    await this.prisma.verification_token.create({
      data: {
        email,
        token,
        expires,
      },
    });

    await this.sendVerifyEmail.sendVerificationEmail(email, token);

    return token;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const { email, password, name, permission_id } = createUserDto;
      const hashed = await bcrypt.hash(password, 10);
      const now = new Date();
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashed,
          name: name,
          permission_id: permission_id,
          is_two_factor_enabled: false,
        },
        select: {
          email: true,
          name: true,
        }
      });
      await this.generateVerificationToken(user.email);

      return user;
    }
    catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') { // email unique 
          throw new HttpException('email unique', HttpStatus.BAD_REQUEST);

        }
      }
      throw error;
    }

  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        name: true,
        email: true,
        id:true,
        permission_id: true,
        user_sale_office: {
          select: {
            sale_office_id: true,
            sale_office: {

            }
          }
        }
      }
    });

  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return { message: 'update successful' };
  }


  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
