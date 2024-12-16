import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryPrismaModule } from '@nestjs-query/query-prisma';
import { PrismaService } from './prisma.service';
import { TodoItemDTO } from './dto/todo-item.dto';
import { TodoItem } from '@prisma/client';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryPrismaModule.forFeature({ service: PrismaService })],
      resolvers: [
        {
          DTOClass: TodoItemDTO,
          EntityClass: TodoItem,
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          delete: { many: { disabled: true } },
        },
      ],
    }),
  ],
  providers: [PrismaService],
})
export class TodoItemModule {}
