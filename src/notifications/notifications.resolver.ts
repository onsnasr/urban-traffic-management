import { Resolver, Query, Mutation, Args, Int, ObjectType, Field } from '@nestjs/graphql';
import { NotificationsService } from './notifications.service';

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
  async notifications() {
    return this.notificationsService.findAll();
  }

  @Mutation(() => NotificationType)
  async createNotification(
    @Args('message') message: string,
    @Args('userId', { type: () => Int, nullable: true }) userId?: number,
  ) {
    return this.notificationsService.create(message, userId);
  }

  @Mutation(() => NotificationType)
  async markNotificationAsRead(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.notificationsService.markAsRead(id);
  }
}
