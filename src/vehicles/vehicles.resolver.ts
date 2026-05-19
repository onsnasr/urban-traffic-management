import { Resolver, Query, Mutation, Args, Int, ObjectType, Field } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/guards/roles.decorator';

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

  @Field({ nullable: true })
  latitude: number;

  @Field({ nullable: true })
  longitude: number;
}

@ObjectType()
class GpsPositionType {
  @Field(() => Int)
  id: number;

  @Field()
  latitude: number;

  @Field()
  longitude: number;

  @Field(() => Int)
  vehicleId: number;

  @Field()
  recordedAt: Date;
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

  @Query(() => [GpsPositionType])
  @UseGuards(JwtAuthGuard)
  async vehicleHistory(@Args('vehicleId', { type: () => Int }) vehicleId: number) {
    return this.vehiclesService.getHistory(vehicleId);
  }

  @Mutation(() => VehicleType)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'OPERATOR')
  async createVehicle(
    @Args('brand') brand: string,
    @Args('model') model: string,
    @Args('licensePlate') licensePlate: string,
    @Args('driverName', { nullable: true }) driverName?: string,
  ) {
    return this.vehiclesService.create(brand, model, licensePlate, driverName);
  }

  @Mutation(() => VehicleType)
  @UseGuards(JwtAuthGuard)
  async updateVehiclePosition(
    @Args('id', { type: () => Int }) id: number,
    @Args('latitude') latitude: number,
    @Args('longitude') longitude: number,
  ) {
    return this.vehiclesService.updatePosition(id, latitude, longitude);
  }
}
