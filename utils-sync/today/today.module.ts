import type { Module } from "../../code-system/modules/module.page-type.ts"

export const today = {
  id: "01a05c6a-2bb4-789c-9bbd-5978ee660724",
  pageTypeSlug: "module",
  slug: "today",
  definition: "the day it is where the clock is UTC, written as a dashed date",
  code: "ts",
} as const satisfies Module
