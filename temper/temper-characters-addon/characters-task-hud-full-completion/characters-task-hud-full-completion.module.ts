import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const charactersTaskHudFullCompletion = {
  id: "01a062ee-f016-7068-9131-b41bedd44674",
  pageTypeSlug: "module",
  slug: "characters-task-hud-full-completion",
  definition:
    "whether a task is done as the add-on loads, and whether a cumulative one is done for good",
  code: "ts",
} as const satisfies Module
