import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTodoInput } from '../todo/dto/update-todo.input';

@Injectable()
export class TodoService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    const todos = await this.prismaService.todo.findMany({});
    return todos.map((todo) => ({
      id: todo.id,
      title: todo.title,
      description: todo.description,
    }));
  }
  async findOne(id: number) {
    return this.prismaService.todo.findUnique({
      where: { id },
    });
  }

  async create(data: { title?: string; description?: string }) {
    return this.prismaService.todo.create({
      data,
    });
  }

  async update(id: number, updateTodoInput: UpdateTodoInput) {
    return this.prismaService.todo.update({
      where: { id },
      data: {
        title: updateTodoInput.title,
        description: updateTodoInput.description,
      },
    });
  }

  async delete(id: number) {
    try {
      const todo = await this.prismaService.todo.delete({
        where: { id },
      });

      if (!todo) {
        throw new NotFoundException('Todo with ID ${id} not found');
      }
      return todo;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Todo with ID ${id} not found');
        }
      }
      throw error;
    }
  }
}
