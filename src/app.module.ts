import { CacheModule, CacheStore, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolModule } from './modules/school/school.module';
import { SchoolTable } from './modules/school/school.entity';
import { UserTable } from './modules/user/user.entity';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { LessonTable } from './modules/lesson/lesson.entity';
import { LessonModule } from './modules/lesson/lesson.module';
import { NotesTable } from './modules/notes/notes.entity';
import { NotesModule } from './modules/notes/notes.module';
import { CacheManagerService } from './helpers/cache';
import { redisStore } from 'cache-manager-redis-store';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: {
              expiresIn: '1d'
            }
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (
        configService: ConfigService
      )=>({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [
          SchoolTable,
          UserTable,
          LessonTable,
          NotesTable,
        ],
        synchronize: true,
      }),
      inject: [ConfigService]
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        host:configService.get('REDIS_HOST'),
        port:configService.get<number>('REDIS_PORT'),
        isGlobal: true,
        store: (await redisStore({
          url: configService.get('REDIS_URL'),
          ttl:300
        })) as unknown as CacheStore,
      }),
      inject: [ConfigService],
    }),
    SchoolModule,
    UserModule,
    AuthModule,
    LessonModule,
    NotesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
