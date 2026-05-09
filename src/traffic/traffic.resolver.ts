import { Resolver, Query, Mutation, Args, Int, ObjectType, Field } from '@nestjs/graphql';
import { TrafficService } from './traffic.service';

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

  @Field(() => Int)
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

  @Query(() => [TrafficZoneType])
  async congestedZones() {
    return this.trafficService.getCongested();
  }

  @Mutation(() => TrafficZoneType)
  async createTrafficZone(
    @Args('name') name: string,
    @Args('latitude') latitude: number,
    @Args('longitude') longitude: number,
  ) {
    return this.trafficService.createZone(name, latitude, longitude);
  }

  @Mutation(() => TrafficZoneType)
  async updateTrafficDensity(
    @Args('id', { type: () => Int }) id: number,
    @Args('vehicleCount', { type: () => Int }) vehicleCount: number,
  ) {
    return this.trafficService.updateDensity(id, vehicleCount);
  }
}
