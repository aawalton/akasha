import type { Module } from "@akasha/code-system/module"

export const libSetsDropTipInstallTooltips = {
  id: "01a061d6-3e42-767a-88d0-cffa37314909",
  pageTypeSlug: "module",
  slug: "lib-sets-drop-tip-install-tooltips",
  definition:
    "the eight drop mechanic tooltip tables placed on the library under their language codes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The tables are written onto the library global rather than exported.",
    },
    {
      invariantKind: "gap",
      statement: "An empty branch sits where the newer API version's entries would go.",
    },
  ],
} as const satisfies Module
