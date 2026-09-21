import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperPlayer = {
  id: "01a0c488-f911-75d9-878d-e0c1d2d74b66",
  type: "page-type/domain",
  slug: "temper-player",
  definition: "the account a player plays, and what it has done",
  parts: ["domain/temper-character"],
} as const satisfies Domain
