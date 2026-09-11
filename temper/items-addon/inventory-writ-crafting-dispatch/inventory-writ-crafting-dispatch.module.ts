import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const inventoryWritCraftingDispatch = {
  id: "01a06258-b535-721f-b57d-869cd41af3c4",
  type: "module",
  slug: "inventory-writ-crafting-dispatch",
  definition: "dispatching the writs a crafting station can fill, if the toggles allow",
  code: "ts",
} as const satisfies Module
