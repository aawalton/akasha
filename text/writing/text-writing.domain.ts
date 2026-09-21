import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const textWriting = {
  id: "01a08ccc-bd21-7a44-8927-686696e7f011",
  type: "page-type/domain",
  slug: "text-writing",
  definition: "how a value is written out as the English a reader reads",
  parts: [
    "module/capitalize",
    "module/counted",
    "module/name-drawing",
    "module/pad-two",
    "module/seconds",
    "module/shortened",
    "module/suggest-closest",
    "module/today",
  ],
} as const satisfies Domain
