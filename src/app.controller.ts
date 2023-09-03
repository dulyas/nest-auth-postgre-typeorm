import { Controller, UseGuards, Get, Request } from "@nestjs/common";
import { AuthGuard } from "./modules/auth/auth.guard";
import { IUserResponse } from "./modules/auth/entities/user.entity";
import { Request as RequestClass } from "express";

@Controller()
export class AppController {
  constructor() {}

  @UseGuards(AuthGuard)
  @Get("/")
  async getUser(@Request() req: RequestClass): Promise<IUserResponse> {
    return req.user as IUserResponse;
  }
}
