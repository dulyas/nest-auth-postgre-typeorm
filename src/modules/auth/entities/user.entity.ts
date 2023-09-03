import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  refreshToken: string;
}

export class IUser {
  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  refreshToken: string;
}

export class IUserResponse {
  name: string;
}

export class IUserRequest {
  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;
}

export class IUserDtoWithRefreshToken {
  refreshToken: string;
  name: string;
}

export class ITokens {
  refreshToken: string;
  accessToken: string;
}

export class IUserDtoWithTokens extends IUserDtoWithRefreshToken {
  accessToken: string;
}

export class IUserBody extends IUser {
  @ApiProperty()
  keepLogin: boolean;
}
