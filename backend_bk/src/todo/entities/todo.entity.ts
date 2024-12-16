//todo.entity.ts

import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Todo {
  @Field(() => ID)
  id: string;

  @Field()
  text: string;
}
