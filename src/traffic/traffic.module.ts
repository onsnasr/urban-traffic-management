import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrafficService } from './traffic.service';
import { TrafficResolver } from './traffic.resolver';
import { TrafficZone } from './traffic-zone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrafficZone])],
  providers: [TrafficService, TrafficResolver],
})
export class TrafficModule {}
