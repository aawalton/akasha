import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperItems = {
  id: "01a0c488-cb67-7b5d-a939-5a29e22abc76",
  type: "page-type/domain",
  slug: "temper-items",
  definition: "the items a player holds, and the rules over them",
  parts: ["domain/temper-items-rules", "domain/temper-items-filters"],
} as const satisfies Domain
