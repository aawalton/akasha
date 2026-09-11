import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const charactersTaskHudVisibility = {
  id: "01a062ee-f0ce-7072-a02f-7b8f8b50609e",
  pageTypeSlug: "module",
  type: "module",
  slug: "characters-task-hud-visibility",
  definition: "which tasks and quests the task HUD shows now, and which of them count as done",
  code: "ts",
} as const satisfies Module
