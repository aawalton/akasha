import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const minimapUpdate = {
  id: "01a06269-298b-7245-991d-36a8467e6bdb",
  type: "page-type/module",
  slug: "minimap-update",
  definition: "the minimap kept following the player each frame",
  code: "ts",
} as const satisfies Module
