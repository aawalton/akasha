import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperEffect = {
  id: "01a05fba-ce3c-73cc-87ea-23462f201563",
  type: "page-type/domain",
  slug: "temper-effect",
  definition: "what is put on a character for a while, for good or ill",
  parts: [
    "page-type/temper-buff-major",
    "page-type/temper-buff-minor",
    "page-type/temper-buff-other",
    "page-type/temper-curse",
    "page-type/temper-debuff-major",
    "page-type/temper-debuff-minor",
    "page-type/temper-debuff-other",
    "page-type/temper-special-effect-type",
    "page-type/temper-status-effect-type",
    "page-type/temper-target-armor",
    "page-type/temper-target-scope",
    "page-type/temper-target-type",
    "page-type/temper-vampire-stage",
  ],
} as const satisfies Domain
