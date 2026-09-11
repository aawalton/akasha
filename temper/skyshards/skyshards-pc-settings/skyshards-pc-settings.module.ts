import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const skyshardsPcSettings = {
  id: "01a061a8-9c6b-72d0-af92-ccaec643e0db",
  type: "module",
  slug: "skyshards-pc-settings",
  definition: "the add-on's own panel in the game's settings menu",
  code: "ts",
} as const satisfies Module
