import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    try {
      const res = await this.prisma.user.create({
        data: createUserDto,
      });
      return res;
    } catch (error) {
      console.log(error.code, error.message);
      throw new HttpException(error, 400);
    }
  }

  findAll() {
    return this.prisma.user.findMany({
      select: { name: true },
    });
  }

  async findOne(id: number) {
    console.log(id, 'email');
    // try {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    console.log(user, 'user');
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return user;
    // } catch (error) {
    // console.log(error.code);
    // throw new HttpException(error, 400);
    // }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
