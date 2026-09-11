import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const skillMorphTaskHud = {
  id: "01a062ff-2792-73ac-9600-bd477227641b",
  pageTypeSlug: "module",
  type: "module",
  slug: "skill-morph-task-hud",
  definition: "the morphs a skill morph task suggests, and whether that task is done",
  code: "ts",
} as const satisfies Module
