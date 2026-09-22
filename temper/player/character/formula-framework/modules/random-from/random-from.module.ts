import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const randomFrom = {
  id: "01a06070-82e3-77e2-98d3-05ab2563aa58",
  type: "page-type/module",
  slug: "random-from",
  definition: "an item drawn at random from a list",
  code: "ts",
} as const satisfies Module
