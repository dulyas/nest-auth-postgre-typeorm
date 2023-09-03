import { TokenService } from "./token.service";
import { compare, hash } from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import {
  ITokens,
  IUserRequest,
  IUserDtoWithRefreshToken,
  IUserDtoWithTokens,
} from "./interfaces/user.interfaces";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private tokenService: TokenService,
    private configService: ConfigService,
  ) {}

  async register({
    name,
    password,
  }: IUserRequest): Promise<IUserDtoWithTokens> {
    const user = await this.usersRepository.findOne({ where: { name } });
    const PASSWORD_SALT = +this.configService.get("PASSWORD_SALT");

    if (user) {
      throw new HttpException("Name already exist", 400);
    }

    const accessToken = this.tokenService.generateJWTToken({ name });
    const refreshToken = await this.tokenService.generateJWTRefresh();
    const hashPassword = await hash(password, PASSWORD_SALT);

    await this.usersRepository.insert({
      name,
      password: hashPassword,
      refreshToken,
    });

    return {
      name,
      refreshToken,
      accessToken,
    };
  }

  async refresh({ refreshToken }: IUserDtoWithRefreshToken): Promise<ITokens> {
    const user = await this.usersRepository.findOne({
      where: { refreshToken },
    });

    if (user) {
      return await this.login(user);
    } else {
      throw new UnauthorizedException("Bad token");
    }
  }

  async login({ name, password }: IUserRequest): Promise<ITokens> {
    const user = await this.usersRepository.findOne({ where: { name } });
    if (!user) {
      throw new UnauthorizedException("No user for this login");
    }

    const isPassEquals = await compare(password, user.password);
    if (!isPassEquals) {
      throw new UnauthorizedException("Wrong password");
    }

    const accessToken = this.tokenService.generateJWTToken({ name });
    const refreshToken = await this.tokenService.generateJWTRefresh();

    await this.tokenService.updateRefresh(name, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(refreshToken: string): Promise<{ message: string }> {
    await this.tokenService.removeRefresh(refreshToken);

    return {
      message: "Logged out successfully",
    };
  }
}
