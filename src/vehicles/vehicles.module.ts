import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesService } from './vehicles.service';
import { VehiclesResolver } from './vehicles.resolver';
import { Vehicle } from './vehicle.entity';
import { GpsPosition } from './gps-position.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, GpsPosition]), ConfigModule],
  providers: [VehiclesService, VehiclesResolver],
})
export class VehiclesModule {}
