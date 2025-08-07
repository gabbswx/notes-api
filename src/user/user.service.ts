import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // buscar uno por username
  async findByUsername(username: string) {
    return this.prisma.user.findUnique({ 
      where: { 
        name: username 
      } 
    });
  }

  // crear uno nuevo
  async createUser(username: string, password: string) {
    return this.prisma.user.create({ data: { name: username, password } });
  }
}
