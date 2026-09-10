import type { Domain } from "../../domains/domain.page-type.types.ts"

export const utilsText = {
  id: "01a08ccc-bd21-7a44-8927-686696e7f011",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "utils-text",
  definition: "how a value is written out as the English a reader reads",
  parts: ["module/counted", "module/capitalize"],
} as const satisfies Domain
