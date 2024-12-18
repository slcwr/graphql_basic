import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateTodoInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
