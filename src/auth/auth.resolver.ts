import { Resolver, Query, Mutation, Args, ObjectType, Field } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@ObjectType()
class UserType {
  @Field()
  id: number;

  @Field()
  email: string;

  @Field()
  role: string;
}

@ObjectType()
class AuthResponse {
  @Field()
  token: string;

  @Field(() => UserType)
  user: UserType;
}

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => String)
  hello(): string {
    return 'Auth service is running!';
  }

  @Mutation(() => UserType)
  async register(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.authService.register(email, password);
  }

  @Mutation(() => AuthResponse)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.authService.login(email, password);
  }
}
