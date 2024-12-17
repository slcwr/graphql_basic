import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Todos {
  //GraphQLスキーマではID型だが、typescriptの型(バックエンド内部)としてはnumber型として扱われる。データベース上ではIntegerとして保存。
  //GraphQLのID型は特殊な型で、一意性を表現するために使用される。GraphQLサーバーでシリアライズする際(クライアントに送信される際)は文字列に変換される。
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;
}
