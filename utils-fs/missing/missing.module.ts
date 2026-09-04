import type { Module } from "@akasha/code-system/module"

export const missing = {
  id: "01a05cb3-7cca-757d-a132-d9a2d47fcba0",
  pageTypeSlug: "module",
  slug: "missing",
  definition: "whether what a read threw says there is nothing at the path it was given",
  code: "ts",
} as const satisfies Module
