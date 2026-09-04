import type { Module } from "@akasha/code-system/module"

export const writAlchemyParser = {
  id: "01a061c7-e894-7a5b-ad70-177ed293d8e2",
  pageTypeSlug: "module",
  slug: "writ-alchemy-parser",
  definition: "reads an alchemy writ and says what it asks for",
  code: "ts",
} as const satisfies Module
