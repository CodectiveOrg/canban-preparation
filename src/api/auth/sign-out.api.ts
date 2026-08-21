import type { ResponseDto } from "@/dto/response.dto";

import { richFetch } from "@/utils/fetch.utils";

export async function signOutApi(): Promise<ResponseDto> {
  return richFetch("/auth/sign-out", { method: "DELETE" });
}
