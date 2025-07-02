import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from './user/user.module';
import { WorkoutModule } from './workout/workout.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes env vars available app-wide
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'meme3199',
      database: 'gymtrackr',
      autoLoadEntities: true,
      synchronize: true,
    }),
    JwtModule.register({}), // can be left empty if you use JwtStrategy
    UserModule,
    WorkoutModule,
  ],
})
export class AppModule {}



