import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todos } from './todo.model';
import { CreateTodoInput } from '../todo/dto/create-todo.input';
import { UpdateTodoInput } from '../todo/dto/update-todo.input';

@Resolver(() => Todos)
export class TodoResolver {
  constructor(private readonly TodoService: TodoService) {}

  @Query(() => [Todos])
  async todos() {
    return this.TodoService.findAll();
  }

  @Mutation(() => Todos) // Mutationタイプを追加
  async createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.TodoService.create(createTodoInput);
  }

  @Mutation(() => Todos)
  async deleteTodo(@Args('id', { type: () => ID }) id: string) {
    return this.TodoService.delete(Number(id));
  }

  @Mutation(() => Todos)
  async updateTodo(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput,
  ) {
    return this.TodoService.update(Number(id), updateTodoInput);
  }
}
