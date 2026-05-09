import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum IncidentType {
  ACCIDENT = 'ACCIDENT',
  ROADWORKS = 'ROADWORKS',
  ROAD_CLOSED = 'ROAD_CLOSED',
  TRAFFIC_JAM = 'TRAFFIC_JAM',
}

export enum IncidentStatus {
  REPORTED = 'REPORTED',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
}

@Entity()
export class Incident {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: IncidentType })
  type: IncidentType;

  @Column({ type: 'enum', enum: IncidentStatus, default: IncidentStatus.REPORTED })
  status: IncidentStatus;

  @Column()
  description: string;

  @Column({ type: 'float' })
  latitude: number;

  @Column({ type: 'float' })
  longitude: number;

  @CreateDateColumn()
  createdAt: Date;
}
