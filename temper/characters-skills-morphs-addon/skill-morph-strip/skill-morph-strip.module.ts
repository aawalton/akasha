import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const skillMorphStrip = {
  id: "01a062ff-2792-7242-99d5-2b4bb82669b1",
  pageTypeSlug: "module",
  type: "module",
  slug: "skill-morph-strip",
  definition: "the fields dropped from a saved morph row before that row is written",
  code: "ts",
} as const satisfies Module
