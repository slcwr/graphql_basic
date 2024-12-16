//delete-todo.input.ts
import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class DeleteTodoInput {
  @Field(() => ID)
  id: string;
}
