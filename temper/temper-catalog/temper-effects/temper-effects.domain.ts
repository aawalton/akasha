import type { Domain } from "../../../domains/domains/domain.page-type.ts"

export const temperEffects = {
  id: "01a05fba-ce3c-73cc-87ea-23462f201563",
  pageTypeSlug: "domain",
  slug: "temper-effects",
  definition: "what is put on a character for a while, for good or ill",
  pluralSlug: "temper-effectss",
  partSlugs: [
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
