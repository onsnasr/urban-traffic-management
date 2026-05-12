import { Resolver, Query, Mutation, Args, Int, ObjectType, Field, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { IncidentType, IncidentStatus } from './incident.entity';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/guards/roles.decorator';

@ObjectType()
class IncidentObject {
  @Field(() => Int)
  id: number;

  @Field()
  type: string;

  @Field()
  status: string;

  @Field()
  description: string;

  @Field()
  latitude: number;

  @Field()
  longitude: number;
}

@Resolver()
export class IncidentsResolver {
  constructor(private incidentsService: IncidentsService) {}

  @Query(() => [IncidentObject])
  async incidents() {
    return this.incidentsService.findAll();
  }

  @Query(() => IncidentObject)
  async incident(@Args('id', { type: () => Int }) id: number) {
    return this.incidentsService.findOne(id);
  }

  @Mutation(() => IncidentObject)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'OPERATOR')
  async createIncident(
    @Args('type') type: IncidentType,
    @Args('description') description: string,
    @Args('latitude') latitude: number,
    @Args('longitude') longitude: number,
  ) {
    return this.incidentsService.create(type, description, latitude, longitude);
  }

  @Mutation(() => IncidentObject)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async updateIncidentStatus(
    @Args('id', { type: () => Int }) id: number,
    @Args('status') status: IncidentStatus,
  ) {
    return this.incidentsService.updateStatus(id, status);
  }
}
