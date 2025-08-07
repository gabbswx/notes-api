import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { BadRequestException } from '@nestjs/common';

@Controller('notes')
@UseGuards(JwtAuthGuard) // protege las rutas
export class NotesController {
  constructor(private notesService: NotesService) {}
  
  // crear una nota
  @Post()
  async create(
    @Body() createNoteDto: CreateNoteDto,
    @Req() req: Request,
  ): Promise<any> {
    const user = req.user as { userId: number };
    if (!user || typeof user.userId !== 'number') {
      throw new BadRequestException('Invalid user');
    }
    try {
      return await this.notesService.create(createNoteDto, user.userId);
    } catch (error) {
      throw new BadRequestException(
        error &&
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as { message?: unknown }).message === 'string'
          ? (error as { message: string }).message
          : 'Failed to create note',
      );
    }
  }

  // buscar todas las notas de un user
  @Get()
  async findAll(@Req() req: Request): Promise<any[]> {
    console.log('User from token:', req.user);
    const user = req.user as { userId: number };
    if (!user || typeof user.userId !== 'number') {
      throw new BadRequestException('Invalid user');
    }
    try {
      const result = (await this.notesService.findAll(user.userId)) as any[];
      return result;
    } catch (error) {
      throw new BadRequestException(
        error &&
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as { message?: unknown }).message === 'string'
          ? (error as { message: string }).message
          : 'Failed to fetch notes',
      );
    }
  }

  // actualizar una nota
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto, @Req() req: Request) {
    const user = req.user as { userId: number };
    if (!user || typeof user.userId !== 'number') {
      throw new BadRequestException('Invalid user');
    }
    try {
      const updateResult: unknown = await this.notesService.update(
        +id,
        updateNoteDto,
        user.userId,
      );
      if (updateResult instanceof Error) {
        throw new BadRequestException(
          updateResult.message || 'Failed to update note',
        );
      }
      return updateResult;
    } catch (error) {
      throw new BadRequestException(
        error &&
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as { message?: unknown }).message === 'string'
          ? (error as { message: string }).message
          : 'Failed to update note',
      );
    }
  }

  // eliminar una nota
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as { userId: number };
    if (!user || typeof user.userId !== 'number') {
      throw new BadRequestException('Invalid user');
    }
    try {
      const deleteResult: unknown = await this.notesService.delete(+id, user.userId);
      if (deleteResult instanceof Error) {
        throw new BadRequestException(
          deleteResult.message || 'Failed to delete note',
        );
      }
      return deleteResult;
    } catch (error) {
      throw new BadRequestException(
        error &&
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as { message?: unknown }).message === 'string'
          ? (error as { message: string }).message
          : 'Failed to delete note',
      );
    }
  }
}
