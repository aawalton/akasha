import type { Module } from "@akasha/code-system/module"

export const writProvParser = {
  id: "01a061c7-e8ab-76e2-8e56-ad161565c7a4",
  pageTypeSlug: "module",
  slug: "writ-prov-parser",
  definition: "reads a provisioning writ and says what it asks for",
  code: "ts",
} as const satisfies Module
