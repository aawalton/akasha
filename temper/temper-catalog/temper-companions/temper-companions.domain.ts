import type { Domain } from "../../../domains/domains/domain.page-type.ts"

export const temperCompanions = {
  id: "01a05fba-ce3c-7e66-903a-166903fcf181",
  pageTypeSlug: "domain",
  slug: "temper-companions",
  definition: "the companions who travel with a character",
  pluralSlug: "temper-companionss",
  partSlugs: [
    "page-type/temper-companion-activation-buff",
    "page-type/temper-companion-armor-slot",
    "page-type/temper-companion-base-role",
    "page-type/temper-companion-equipment-quality",
    "page-type/temper-companion-jewelry-slot",
    "page-type/temper-companion-passive-metric",
    "page-type/temper-companion-role",
    "page-type/temper-companion-skill",
    "page-type/temper-companion-skill-line",
    "page-type/temper-companion-skill-slot",
    "page-type/temper-companion-thing",
    "page-type/temper-companion-trait",
    "page-type/temper-companion-weapon-role",
    "page-type/temper-companion-weapon-slot",
    "page-type/temper-companion-weapon-type",
    "page-type/temper-eso-companion",
    "page-type/temper-eso-companion-equipment-constant",
  ],
} as const satisfies Domain
