import type { Domain } from "../../../domains/domain.page-type.ts"

export const temperSkills = {
  id: "01a05fba-ce3c-73c4-bd0e-ef070ee7df98",
  pageTypeSlug: "domain",
  slug: "temper-skills",
  definition: "what a character can do and where the doing is learned",
  pluralSlug: "temper-skillss",
  partSlugs: [
    "page-type/temper-affix-script",
    "page-type/temper-class",
    "page-type/temper-focus-script",
    "page-type/temper-grimoire",
    "page-type/temper-scribed-skill",
    "page-type/temper-scribing-source",
    "page-type/temper-scribing-thing",
    "page-type/temper-script",
    "page-type/temper-signature-script",
    "page-type/temper-skill",
    "page-type/temper-skill-line",
    "page-type/temper-skill-line-category",
    "page-type/temper-skill-slot",
    "page-type/temper-skill-type",
  ],
} as const satisfies Domain
