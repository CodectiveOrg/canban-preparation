import { z } from "zod";

import { StrictPasswordSchema } from "@/schemas/password-schema.ts";
import { StrictUsernameSchema } from "@/schemas/username-schema.ts";

export const SignUpSchema = z.object({
  username: StrictUsernameSchema,
  password: StrictPasswordSchema,
});
