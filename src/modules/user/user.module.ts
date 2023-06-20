import { CacheModule, CacheStore, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./user.service";
import { UserTable } from "./user.entity";
import { UserController } from "./user.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { redisStore } from 'cache-manager-redis-store'
import { CacheManagerService } from "src/helpers/cache";
@Module({
    imports: [
        TypeOrmModule.forFeature([UserTable]),
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService,
        CacheManagerService
    ],
    exports: [
        UserService
    ]
})

export class UserModule{}