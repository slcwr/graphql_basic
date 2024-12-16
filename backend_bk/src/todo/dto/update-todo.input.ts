import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateTodoInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;
}
