import type { Module } from "@akasha/code-system/module"

export const antiquitiesAddonEntry = {
  id: "01a06274-b089-7140-959d-d67b4777dffa",
  pageTypeSlug: "module",
  slug: "antiquities-addon-entry",
  definition: "where the transpiler starts this add-on's one Lua file",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Nothing here runs before the game says this add-on has loaded.",
    },
  ],
} as const satisfies Module
