import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
