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
    TypeOrmModule.forRootAsync({
  useFactory: () => ({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'password',
    database: process.env.DATABASE_NAME || 'gymtrackr',
    autoLoadEntities: true,
    synchronize: true,
  }),
}),

    JwtModule.register({}), // can be left empty if you use JwtStrategy
    UserModule,
    WorkoutModule,
  ],
})
export class AppModule {}



