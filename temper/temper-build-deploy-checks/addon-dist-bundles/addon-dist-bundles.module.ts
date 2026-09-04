import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const addonDistBundles = {
  id: "01a06365-e827-7001-8799-62e2c6d7ba62",
  pageTypeSlug: "module",
  slug: "addon-dist-bundles",
  definition: "the emitted Lua bundles a post-build gate has to examine",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A build output that is no directory is an empty population rather than an error.",
    },
    {
      invariantKind: "constraint",
      statement: "A gate finding no bundle refuses rather than certifying the add-ons clean.",
    },
    {
      invariantKind: "constraint",
      statement: "The refusal names the build command that would fill the population.",
    },
    {
      invariantKind: "gap",
      statement: "The build output this names is a path the migration has yet to move.",
    },
  ],
} as const satisfies Module
