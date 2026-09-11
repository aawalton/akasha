import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const knowledgePublicCore = {
  id: "01a06227-f593-70f8-920b-1b04aeaca3d6",
  type: "module",
  slug: "knowledge-public-core",
  definition: "what an addon asks the library about an item",
  code: "ts",
} as const satisfies Module
