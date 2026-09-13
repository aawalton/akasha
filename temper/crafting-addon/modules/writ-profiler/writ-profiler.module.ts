import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const writProfiler = {
  id: "01a061c7-e8a7-7ff5-b7dc-7d5e56de0b04",
  type: "module",
  slug: "writ-profiler",
  definition: "how long each of the writ tracker's calls took",
  code: "ts",
} as const satisfies Module
