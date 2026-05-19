import { Resolver, Query, Mutation, Args, Int, ObjectType, Field } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/guards/roles.decorator';

@ObjectType()
class NotificationType {
  @Field(() => Int)
  id: number;

  @Field()
  message: string;

  @Field()
  isRead: boolean;

  @Field(() => Int, { nullable: true })
  userId: number;
}

@Resolver()
export class NotificationsResolver {
  constructor(private notificationsService: NotificationsService) {}

  @Query(() => [NotificationType])
  @UseGuards(JwtAuthGuard)
  async notifications() {
    return this.notificationsService.findAll();
  }

  @Query(() => [NotificationType])
  @UseGuards(JwtAuthGuard)
  async unreadNotifications() {
    return this.notificationsService.findUnread();
  }

  @Mutation(() => NotificationType)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'OPERATOR')
  async createNotification(
    @Args('message') message: string,
    @Args('userId', { type: () => Int, nullable: true }) userId?: number,
  ) {
    return this.notificationsService.create(message, userId);
  }

  @Mutation(() => NotificationType)
  @UseGuards(JwtAuthGuard)
  async markNotificationAsRead(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.notificationsService.markAsRead(id);
  }
}
