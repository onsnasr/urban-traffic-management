import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { GpsPosition } from './gps-position.entity';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column({ unique: true })
  licensePlate: string;

  @Column({ nullable: true })
  driverName: string;

  @Column({ type: 'float', default: 0 })
  latitude: number;

  @Column({ type: 'float', default: 0 })
  longitude: number;

  @OneToMany(() => GpsPosition, position => position.vehicle)
  positions: GpsPosition[];

  @CreateDateColumn()
  createdAt: Date;
}
