import type { Domain } from "../domains/domains/domain.page-type.ts"

export const text = {
  id: "01a049e9-651c-7003-82de-a9ff0562dea5",
  pageTypeSlug: "domain",
  slug: "text",
  definition: "the text an agent reads",
  partSlugs: ["domain/quote"],
} as const satisfies Domain
