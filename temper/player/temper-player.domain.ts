import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperPlayer = {
  id: "01a0c488-f911-75d9-878d-e0c1d2d74b66",
  type: "page-type/domain",
  slug: "temper-player",
  definition: "the account a player plays, and what it has done",
  parts: [
    "domain/temper-character",
    "domain/temper-skill-morph",
    "domain/temper-completion",
    "domain/temper-progress",
    "domain/temper-holdings",
  ],
  createdAt: "2026-09-21T15:15:06.129Z",
  updatedAt: "2026-09-21T15:34:59.000Z",
} as const satisfies Domain
