import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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

export type IUser = {
  name: string;
  password: string;
  refreshToken: string;
};

export type IUserResponse = {
  name: string;
};

export type IUserRequest = {
  name: string;
  password: string;
};

export type IUserDtoWithRefreshToken = {
  refreshToken: string;
  name: string;
};

export type ITokens = {
  refreshToken: string;
  accessToken: string;
};

export type IUserDtoWithTokens = {
  accessToken: string;
} & IUserDtoWithRefreshToken;

export type IUserBody = {
  keepLogin: boolean;
} & IUser;
