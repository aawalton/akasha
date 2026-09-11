import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const utils = {
  id: "01a0827a-166b-7a7c-9b60-e90209b46c46",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "utils",
  definition: "the pieces every domain reaches for and no domain claims",

  parts: [
    "domain/utils-fs",
    "domain/utils-narrow",
    "domain/utils-process",
    "domain/utils-run",
    "domain/utils-system",
    "domain/utils-sync",
    "domain/utils-text",
    "domain/digit-padding",
  ],
} as const satisfies Domain
