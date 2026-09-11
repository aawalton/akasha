import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const destinationsPinDefaults = {
  id: "01a06269-28c7-7a5d-a625-511d3e65b2f6",
  type: "module",
  slug: "destinations-pin-defaults",
  definition: "the default size, level and texture of each destination pin kind",
  code: "ts",
} as const satisfies Module
