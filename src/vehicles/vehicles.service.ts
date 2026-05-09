import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async create(brand: string, model: string, licensePlate: string, driverName?: string) {
    const vehicle = this.vehicleRepository.create({ brand, model, licensePlate, driverName });
    return this.vehicleRepository.save(vehicle);
  }

  async findAll() {
    return this.vehicleRepository.find();
  }

  async findOne(id: number) {
    const vehicle = await this.vehicleRepository.findOne({ where: { id } });
    if (!vehicle) throw new NotFoundException('Vehicle not found');
    return vehicle;
  }

  async updatePosition(id: number, latitude: number, longitude: number) {
    const vehicle = await this.findOne(id);
    vehicle.latitude = latitude;
    vehicle.longitude = longitude;
    return this.vehicleRepository.save(vehicle);
  }
}
