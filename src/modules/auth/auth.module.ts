import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { TokenService } from "./token.service";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthGuard } from "./auth.guard";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("TOKEN_SECRET"),
        signOptions: { expiresIn: configService.get<string>("TOKEN_EXPIRES") },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
