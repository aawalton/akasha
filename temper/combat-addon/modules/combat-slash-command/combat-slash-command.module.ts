import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const combatSlashCommand = {
  id: "01a0617f-5850-795f-b45d-0cd0f14a7e8f",
  type: "page-type/module",
  slug: "combat-slash-command",
  definition: "the chat commands this add-on answers to",
  code: "ts",
} as const satisfies Module
