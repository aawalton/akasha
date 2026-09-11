import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const armorTypes = {
  id: "01a060b8-08c5-704c-a98f-25bae2ac07e7",
  type: "module",
  slug: "armor-types",
  definition: "the armor pieces and the shield an armor trait or enchantment is chosen for",
  code: "ts",
} as const satisfies Module
