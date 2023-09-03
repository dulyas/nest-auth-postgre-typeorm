import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { randomBytes } from "crypto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  generateJWTToken(payload: any): string {
    return this.jwtService.sign(payload);
  }
  generateJWTRefresh(): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        randomBytes(48, (err, buffer: Buffer) => {
          resolve(buffer.toString("hex"));
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  async updateRefresh(name: string, refreshToken: string) {
    return this.usersRepository.update({ name }, { refreshToken });
  }

  async removeRefresh(refreshToken: string) {
    return this.usersRepository.update(
      { refreshToken },
      { refreshToken: null },
    );
  }
}
