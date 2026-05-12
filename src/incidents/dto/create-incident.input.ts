import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IncidentType } from '../incident.entity';

@InputType()
export class CreateIncidentInput {
  @Field()
  @IsEnum(IncidentType)
  type: IncidentType;

  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field()
  @IsNumber()
  latitude: number;

  @Field()
  @IsNumber()
  longitude: number;
}
