// src/tasks/tasks.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  // Injeção de dependência via construtor
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(): any[] {
    // Retorna array de qualquer tipo por enquanto
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): any {
    const tasks = this.tasksService.findOne(parseInt(id, 10));
    if (!tasks) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }
    return tasks;
  }

  @Post()
  create(@Body() createTasksDto: CreateTaskDto): any {
    return this.tasksService.createTask(createTasksDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTasksDto: UpdateTaskDto): any {
    const tasks = this.tasksService.update(id);
    if (!tasks) {
      throw new NotFoundException(
        `Produto com ID ${id} não encontrado para atualizar.`,
      );
    }
    return tasks;
  }

  @Delete(':id')
  remove(@Param('id') id: string): any {
    const removed = this.tasksService.remove(parseInt(id, 10));
    if (!removed) {
      throw new NotFoundException(
        `Produto com ID ${id} não encontrado para remover.`,
      );
    }
    return { message: `Produto com ID ${id} removido com sucesso.` };
  }
}
