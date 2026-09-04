import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const buildTypes = {
  id: "01a061a7-9bb3-727e-9417-7f9f1826d61a",
  pageTypeSlug: "module",
  slug: "build-types",
  definition: "everything a character build holds, from its class to its slotted skills",
  code: "ts",
} as const satisfies Module
