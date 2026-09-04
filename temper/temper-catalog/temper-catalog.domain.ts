import type { Domain } from "../../domains/domains/domain.page-type.ts"

export const temperCatalog = {
  id: "01a05fac-7580-7d88-a660-0f4eff1ab95e",
  pageTypeSlug: "domain",
  slug: "temper-catalog",
  definition: "what The Elder Scrolls Online itself holds, mirrored",
  pluralSlug: "temper-catalogs",
  partSlugs: [
    "domain/temper-companions",
    "domain/temper-effects",
    "domain/temper-gear",
    "domain/temper-pursuits",
    "domain/temper-skills",
    "domain/temper-world",
    "page-type/temper-catalog-thing",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every page here states what the game holds for everybody.",
    },
    {
      invariantKind: "departure",
      statement: "A page here is replaced by the next capture rather than edited by hand.",
    },
  ],
} as const satisfies Domain
