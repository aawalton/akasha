import type { Module } from "@akasha/code-system/module"

export const minimapShared = {
  id: "01a06269-298d-7f5e-a8a6-c197edcab106",
  pageTypeSlug: "module",
  slug: "minimap-shared",
  definition: "what the minimap's core modules share: the scene, the pins and the async tasks",
  code: "ts",
} as const satisfies Module
