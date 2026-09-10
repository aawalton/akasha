import type { Domain } from "../domains/domain.page-type.types.ts"

export const text = {
  id: "01a049e9-651c-7003-82de-a9ff0562dea5",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "text",
  definition: "the text an agent reads",
  parts: ["domain/quote"],
} as const satisfies Domain
