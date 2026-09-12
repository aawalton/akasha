import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const utilsText = {
  id: "01a08ccc-bd21-7a44-8927-686696e7f011",
  type: "domain",
  slug: "utils-text",
  definition: "how a value is written out as the English a reader reads",
  parts: [
    "module/capitalize",
    "module/counted",
    "module/name-drawing",
    "module/one-line",
    "module/seconds",
    "module/shortened",
    "module/suggest-closest",
  ],
} as const satisfies Domain
