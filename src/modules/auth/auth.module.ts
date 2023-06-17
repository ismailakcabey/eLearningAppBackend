import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { UserModule } from "../user/user.module";

@Module({
    imports: [
        UserModule,
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService
    ],
    exports: []
})

export class AuthModule {}