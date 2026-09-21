import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperCatalog = {
  id: "01a05fac-7580-7d88-a660-0f4eff1ab95e",
  type: "page-type/domain",
  slug: "temper-catalog",
  definition: "what The Elder Scrolls Online itself has, mirrored",
  parts: [
    "domain/temper-companion",
    "domain/temper-effect",
    "domain/temper-gear",
    "domain/temper-pursuit",
    "domain/temper-world",
    "page-type/temper-catalog-thing",
    "page-type/temper-skill",
    "domain/temper-catalog-core",
    "domain/temper-catalog-side-file",
    "domain/temper-upstream-data",
    "domain/temper-alchemy",
    "domain/temper-character-race",
    "domain/temper-champion-point",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page here states a thing the game has for everybody.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page here is replaced by the next capture rather than edited by hand.",
    },
  ],
} as const satisfies Domain
