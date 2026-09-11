import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const shifterPublicApi = {
  id: "01a06187-364c-7039-9c69-731d56e74e47",
  type: "module",
  slug: "shifter-public-api",
  definition: "the global name another addon reaches this library through",
  code: "ts",
} as const satisfies Module
