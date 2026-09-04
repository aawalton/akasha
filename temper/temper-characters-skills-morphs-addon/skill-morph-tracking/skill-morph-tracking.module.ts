import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skillMorphTracking = {
  id: "01a062ff-2792-7582-b726-7dac43699bb1",
  pageTypeSlug: "module",
  slug: "skill-morph-tracking",
  definition:
    "the morphs the game reports for a character's skill lines, written to saved variables",
  code: "ts",
} as const satisfies Module
