import { Resolver, Query, Mutation, Args, Int, ObjectType, Field } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { TrafficService } from './traffic.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';

@ObjectType()
class TrafficZoneType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  latitude: number;

  @Field()
  longitude: number;

  @Field()
  vehicleCount: number;

  @Field()
  density: string;
}

@Resolver()
export class TrafficResolver {
  constructor(private trafficService: TrafficService) {}

  @Query(() => [TrafficZoneType])
  async trafficZones() {
    return this.trafficService.findAll();
  }

  @Query(() => TrafficZoneType)
  async trafficZone(@Args('id', { type: () => Int }) id: number) {
    return this.trafficService.findOne(id);
  }

  @Query(() => [TrafficZoneType])
  async congestedZones() {
    return this.trafficService.getCongested();
  }

  @Mutation(() => TrafficZoneType)
  @UseGuards(JwtAuthGuard)
  async createTrafficZone(
    @Args('name') name: string,
    @Args('latitude') latitude: number,
    @Args('longitude') longitude: number,
  ) {
    return this.trafficService.createZone(name, latitude, longitude);
  }

  @Mutation(() => TrafficZoneType)
  @UseGuards(JwtAuthGuard)
  async updateTrafficDensity(
    @Args('id', { type: () => Int }) id: number,
    @Args('vehicleCount', { type: () => Int }) vehicleCount: number,
  ) {
    return this.trafficService.updateDensity(id, vehicleCount);
  }
}
