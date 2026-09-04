import type { Module } from "@akasha/code-system/module"

export const temperAppShell = {
  id: "01a06429-76ff-706c-b325-038f0e4a4fb7",
  pageTypeSlug: "module",
  slug: "temper-app-shell",
  definition:
    "the frame Temper draws every page inside, with its nav, its version check and its sign-out",
  code: "tsx",
} as const satisfies Module
