import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const inventorySkillLineRanks = {
  id: "01a06258-b534-7262-a1c8-bf99754c5ba6",
  type: "module",
  slug: "inventory-skill-line-ranks",
  definition:
    "the rank a character has in a skill line, live for this character and synced for others",
  code: "ts",
} as const satisfies Module
