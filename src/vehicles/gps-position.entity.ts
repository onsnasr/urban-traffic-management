import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Entity()
export class GpsPosition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  latitude: number;

  @Column({ type: 'float' })
  longitude: number;

  @ManyToOne(() => Vehicle, vehicle => vehicle.positions)
  vehicle: Vehicle;

  @Column()
  vehicleId: number;

  @CreateDateColumn()
  recordedAt: Date;
}
