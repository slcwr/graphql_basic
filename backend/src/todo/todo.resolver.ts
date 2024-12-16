import { Resolver, Query } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly userService: TodoService) {}

  @Query(() => [Todo])
  async users() {
    return this.userService.findAll();
  }
}
