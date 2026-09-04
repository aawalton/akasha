import type { Module } from "@akasha/code-system/module"

export const craftLibraries = {
  id: "01a061c7-e85a-749f-9438-5cbd4f97402b",
  pageTypeSlug: "module",
  slug: "craft-libraries",
  definition: "the add-on libraries this add-on calls, reached where the game installs them",
  code: "ts",
} as const satisfies Module
