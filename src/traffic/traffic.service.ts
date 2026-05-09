import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrafficZone, TrafficDensity } from './traffic-zone.entity';

@Injectable()
export class TrafficService {
  constructor(
    @InjectRepository(TrafficZone)
    private zoneRepository: Repository<TrafficZone>,
  ) {}

  async createZone(name: string, latitude: number, longitude: number) {
    const zone = this.zoneRepository.create({ name, latitude, longitude });
    return this.zoneRepository.save(zone);
  }

  async findAll() {
    return this.zoneRepository.find();
  }

  async findOne(id: number) {
    const zone = await this.zoneRepository.findOne({ where: { id } });
    if (!zone) throw new NotFoundException('Zone not found');
    return zone;
  }

  async updateDensity(id: number, vehicleCount: number) {
    const zone = await this.findOne(id);
    zone.vehicleCount = vehicleCount;
    if (vehicleCount < 10) zone.density = TrafficDensity.LOW;
    else if (vehicleCount < 30) zone.density = TrafficDensity.MEDIUM;
    else zone.density = TrafficDensity.HIGH;
    return this.zoneRepository.save(zone);
  }

  async getCongested() {
    return this.zoneRepository.find({ where: { density: TrafficDensity.HIGH } });
  }
}
