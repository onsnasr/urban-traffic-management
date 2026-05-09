import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incident, IncidentType, IncidentStatus } from './incident.entity';

@Injectable()
export class IncidentsService {
  constructor(
    @InjectRepository(Incident)
    private incidentRepository: Repository<Incident>,
  ) {}

  async create(type: IncidentType, description: string, latitude: number, longitude: number) {
    const incident = this.incidentRepository.create({ type, description, latitude, longitude });
    return this.incidentRepository.save(incident);
  }

  async findAll() {
    return this.incidentRepository.find();
  }

  async findOne(id: number) {
    const incident = await this.incidentRepository.findOne({ where: { id } });
    if (!incident) throw new NotFoundException('Incident not found');
    return incident;
  }

  async updateStatus(id: number, status: IncidentStatus) {
    const incident = await this.findOne(id);
    incident.status = status;
    return this.incidentRepository.save(incident);
  }
}
