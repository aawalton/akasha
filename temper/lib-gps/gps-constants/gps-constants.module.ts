import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const gpsConstants = {
  id: "01a0614d-4762-7e2c-8708-60132729345a",
  type: "module",
  slug: "gps-constants",
  definition: "the fixed values every measurement is taken against",
  code: "ts",
} as const satisfies Module
