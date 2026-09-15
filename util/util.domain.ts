import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const util = {
  id: "01a0827a-166b-7a7c-9b60-e90209b46c46",
  type: "domain",
  slug: "util",
  definition: "the pieces every domain reaches for and no domain claims",

  parts: [
    "domain/digit-padding",
    "domain/util-fs",
    "domain/util-narrow",
    "domain/util-process",
    "domain/util-run",
    "domain/util-slug",
    "domain/util-sync",
    "domain/util-system",
    "domain/util-text",
    "domain/util-timing",
    "domain/util-waiting",
    "module/during-call",
    "module/sha256-hex",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A `utils` module an addon's bundle reaches is compiled to Lua.",
    },
  ],
} as const satisfies Domain
