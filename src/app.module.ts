import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NotesModule } from './notes/notes.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AuthModule, UserModule, NotesModule],
  providers: [PrismaService],
})
export class AppModule {}
