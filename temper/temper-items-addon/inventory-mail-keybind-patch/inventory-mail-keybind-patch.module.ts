import type { Module } from "@akasha/code-system/module"

export const inventoryMailKeybindPatch = {
  id: "01a06258-b52d-7eba-b0bf-8aa244a48420",
  pageTypeSlug: "module",
  slug: "inventory-mail-keybind-patch",
  definition: "keeping the mail take-all keybind name safe when the game hands over nothing",
  code: "ts",
} as const satisfies Module
