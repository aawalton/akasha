import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const utils = {
  id: "01a0827a-166b-7a7c-9b60-e90209b46c46",
  type: "domain",
  slug: "utils",
  definition: "the pieces every domain reaches for and no domain claims",

  parts: [
    "domain/utils-fs",
    "domain/utils-hashing",
    "domain/utils-narrow",
    "domain/utils-process",
    "domain/utils-run",
    "domain/utils-slug",
    "domain/utils-system",
    "domain/utils-sync",
    "domain/utils-text",
    "domain/utils-timing",
    "domain/utils-waiting",
    "domain/digit-padding",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A `utils` module an addon's bundle reaches is compiled to Lua.",
    },
  ],
} as const satisfies Domain
