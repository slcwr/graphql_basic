import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTodoinput {
  @Field()
  title: string;

  @Field()
  description: string;
}
