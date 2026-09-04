import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const pipelineTypes = {
  id: "01a06271-abce-78d0-8f13-e89bafa87c98",
  pageTypeSlug: "module",
  slug: "pipeline-types",
  definition: "what one build-state extraction stage is handed and what it gives back",
  code: "ts",
} as const satisfies Module
