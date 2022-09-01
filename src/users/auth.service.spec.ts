import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './users.entity';

it('can create an instance of auth service', async () => {
  //crrate a fake copy of users service

  const fakeUsersService: Partial<UsersService> = {
    find: () => Promise<User[]>.resolve([]),
    create: (email: string, password: string) =>
      Promise<User>.resolve({ id: 1, email, password } as User),
  };
  const module = await Test.createTestingModule({
    providers: [
      AuthService,
      { provide: UsersService, useValue: fakeUsersService },
    ],
  }).compile();

  const service = module.get(AuthService);

  expect(service).toBeDefined();
});
