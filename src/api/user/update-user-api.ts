import { z } from "zod";

import type { ResponseDto } from "@/dto/response-dto.ts";

import { IdentitySettingsSchema } from "@/schemas/identity-settings-schema.ts";

import { richFetch } from "@/utils/fetch-utils.ts";

export type UpdateUserRequestDto = z.infer<typeof IdentitySettingsSchema>;

export async function updateUserApi(
  dto: UpdateUserRequestDto,
): Promise<ResponseDto> {
  return richFetch("/user", {
    method: "PATCH",
    body: generateFormData(dto),
  });
}

function generateFormData(dto: UpdateUserRequestDto): FormData {
  const formData = new FormData();

  Object.entries(dto).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return formData;
}
