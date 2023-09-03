import { ApiProperty } from "@nestjs/swagger";

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
