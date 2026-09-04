import type { Module } from "@akasha/code-system/module"

export const collectionsAddonEntry = {
  id: "01a0624c-a660-733f-be75-ba33c296eec3",
  pageTypeSlug: "module",
  slug: "collections-addon-entry",
  definition: "where the transpiler starts this add-on's Lua bundle",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Nothing here runs before the game says this add-on has loaded.",
    },
    {
      invariantKind: "departure",
      statement: "The global is published before any tracker is reached.",
    },
  ],
} as const satisfies Module
