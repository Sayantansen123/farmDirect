import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  //provides routing for the users module
  controllers: [UsersController],
  //provides the service for the users module
  providers: [UsersService],
})
export class UsersModule {}
