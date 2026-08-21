import type { ResponseDto } from "@/dto/response.dto";

import type { User } from "@/entities/user";

import { richFetch } from "@/utils/fetch.utils";

export type SignInRequestDto = Pick<User, "username" | "password">;

export async function signInApi(dto: SignInRequestDto): Promise<ResponseDto> {
  return richFetch("/auth/sign-in", {
    method: "POST",
    body: JSON.stringify(dto),
  });
}
