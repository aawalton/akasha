import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const util = {
  id: "01a0827a-166b-7a7c-9b60-e90209b46c46",
  type: "page-type/domain",
  slug: "util",
  definition: "the pieces every domain reaches for and no domain claims",

  parts: ["domain/util-slug"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A `utils` module an addon's bundle reaches is compiled to Lua.",
    },
  ],
} as const satisfies Domain
