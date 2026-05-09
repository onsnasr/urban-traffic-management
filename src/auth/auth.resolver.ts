import { Resolver, Query, Mutation, Args, ObjectType, Field, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterInput } from './dto/register.input';

@ObjectType()
class UserType {
  @Field(() => Int)
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
  async register(@Args('input') input: RegisterInput) {
    return this.authService.register(input.email, input.password, input.role);
  }

  @Mutation(() => AuthResponse)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.authService.login(email, password);
  }
}
