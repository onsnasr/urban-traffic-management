import { IsEmail, MinLength, IsEnum, IsOptional } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { UserRole } from '../user.entity';

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(6)
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
