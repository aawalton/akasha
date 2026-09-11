import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const combatLogLineCodec = {
  id: "01a0617f-584c-7c86-8969-cbdbf077d301",
  pageTypeSlug: "module",
  type: "module",
  slug: "combat-log-line-codec",
  definition: "packing one log line into numbers and unpacking it again",
  code: "ts",
} as const satisfies Module
