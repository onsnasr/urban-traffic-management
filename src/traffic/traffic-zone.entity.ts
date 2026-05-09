import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum TrafficDensity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

@Entity()
export class TrafficZone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'float' })
  latitude: number;

  @Column({ type: 'float' })
  longitude: number;

  @Column({ type: 'int', default: 0 })
  vehicleCount: number;

  @Column({ type: 'enum', enum: TrafficDensity, default: TrafficDensity.LOW })
  density: TrafficDensity;

  @CreateDateColumn()
  createdAt: Date;
}
