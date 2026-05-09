import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async create(message: string, userId?: number) {
    const notification = this.notificationRepository.create({ message, userId });
    return this.notificationRepository.save(notification);
  }

  async findAll() {
    return this.notificationRepository.find();
  }

  async markAsRead(id: number) {
    const notification = await this.notificationRepository.findOne({ where: { id } });
    if (!notification) throw new NotFoundException('Notification not found');
    notification.isRead = true;
    return this.notificationRepository.save(notification);
  }
}
