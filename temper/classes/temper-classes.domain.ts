import type { Domain } from "../../domains/domain.page-type.ts"

export const temperClasses = {
  id: "01a06076-1b68-77b4-ae8b-23358145b5e9",
  pageTypeSlug: "domain",
  slug: "temper-classes",
  definition: "the classes a character is one of",
  parts: ["module/character-class"],
} as const satisfies Domain
