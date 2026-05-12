import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class FilterNotificationInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  userId?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isRead?: boolean;
}
