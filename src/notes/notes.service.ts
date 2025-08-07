import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from '../../generated/prisma';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  // crear nota con userId
  create(data: CreateNoteDto, userId: number): Promise<Note> {
    console.log('Creating note with:', { data, userId }); // Debug clave
    return this.prisma.note.create({
      data: { ...data, userId },
    });
  }

  // todas las notas del user
  findAll(userId: number) {
    return this.prisma.note.findMany({ where: { userId } });
  }

  // actualizar nota
  update(id: number, data: UpdateNoteDto, userId: number) {
    return this.prisma.note.update({ 
      where: { id, userId }, // Ensure user can only update their own notes
      data 
    });
  }

  // eliminar nota
  delete(id: number, userId: number) {
    return this.prisma.note.delete({ where: { id, userId } });
  }
}
