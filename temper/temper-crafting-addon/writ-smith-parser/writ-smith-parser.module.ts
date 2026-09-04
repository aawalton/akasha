import type { Module } from "@akasha/code-system/module"

export const writSmithParser = {
  id: "01a061c7-e8b1-7b4f-9259-e4a4f32910b1",
  pageTypeSlug: "module",
  slug: "writ-smith-parser",
  definition: "reads a smithing writ and says what it asks for",
  code: "ts",
} as const satisfies Module
