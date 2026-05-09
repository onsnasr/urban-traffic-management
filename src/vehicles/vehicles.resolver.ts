import { Resolver, Query, Mutation, Args, Int, ObjectType, Field } from '@nestjs/graphql';
import { VehiclesService } from './vehicles.service';

@ObjectType()
class VehicleType {
  @Field(() => Int)
  id: number;

  @Field()
  brand: string;

  @Field()
  model: string;

  @Field()
  licensePlate: string;

  @Field({ nullable: true })
  driverName: string;

  @Field()
  latitude: number;

  @Field()
  longitude: number;
}

@Resolver()
export class VehiclesResolver {
  constructor(private vehiclesService: VehiclesService) {}

  @Query(() => [VehicleType])
  async vehicles() {
    return this.vehiclesService.findAll();
  }

  @Query(() => VehicleType)
  async vehicle(@Args('id', { type: () => Int }) id: number) {
    return this.vehiclesService.findOne(id);
  }

  @Mutation(() => VehicleType)
  async createVehicle(
    @Args('brand') brand: string,
    @Args('model') model: string,
    @Args('licensePlate') licensePlate: string,
    @Args('driverName', { nullable: true }) driverName?: string,
  ) {
    return this.vehiclesService.create(brand, model, licensePlate, driverName);
  }

  @Mutation(() => VehicleType)
  async updateVehiclePosition(
    @Args('id', { type: () => Int }) id: number,
    @Args('latitude') latitude: number,
    @Args('longitude') longitude: number,
  ) {
    return this.vehiclesService.updatePosition(id, latitude, longitude);
  }
}
