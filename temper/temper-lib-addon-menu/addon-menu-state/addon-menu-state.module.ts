import type { Module } from "@akasha/code-system/module"

export const addonMenuState = {
  id: "01a06100-0000-7000-8000-000000000009",
  pageTypeSlug: "module",
  slug: "addon-menu-state",
  definition: "the mutable tables and game manager handles shared by every module",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A widget registers only when no equal or newer version of that type exists.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The library object is created empty and filled in by the modules that load after.",
    },
    {
      invariantKind: "departure",
      statement: "Manager handles are captured at load time into two-letter names.",
    },
  ],
} as const satisfies Module
