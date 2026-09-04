import type { Module } from "@akasha/code-system/module"

export const libSetsCoreHeader = {
  id: "01a061fc-cee9-7c71-8e92-91595a98f1d7",
  pageTypeSlug: "module",
  slug: "lib-sets-core-header",
  definition: "the optional companion libraries this one uses when they are loaded",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "LibScrollableMenu is only taken up when its version is 2.43 or later.",
    },
    {
      invariantKind: "departure",
      statement: "The words the slash commands accept are named here per language.",
    },
  ],
} as const satisfies Module
