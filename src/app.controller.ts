import { Controller, UseGuards, Get, Request } from "@nestjs/common";
import { AuthGuard } from "./modules/auth/auth.guard";
import { IUserResponse } from "./modules/auth/interfaces/user.interfaces";
import { Request as RequestClass } from "express";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller()
export class AppController {
  constructor() {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get("/")
  async getUser(@Request() req: RequestClass): Promise<IUserResponse> {
    return req.user as IUserResponse;
  }
}
