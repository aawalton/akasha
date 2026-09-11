import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const combatProcessLogTimings = {
  id: "01a0617f-584e-70a8-98a0-448121bd6ea0",
  type: "module",
  slug: "combat-process-log-timings",
  definition: "reading skill timings, messages, boss health and frame rate out of the log",
  code: "ts",
} as const satisfies Module
