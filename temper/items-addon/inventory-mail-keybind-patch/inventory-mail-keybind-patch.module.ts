import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const inventoryMailKeybindPatch = {
  id: "01a06258-b52d-7eba-b0bf-8aa244a48420",
  type: "module",
  slug: "inventory-mail-keybind-patch",
  definition: "keeping the mail take-all keybind name safe when the game hands over nothing",
  code: "ts",
} as const satisfies Module
