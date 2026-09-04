import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionSkillCatalogCapture = {
  id: "01a060e2-3183-7d2a-a40a-3c845ef259aa",
  pageTypeSlug: "module",
  slug: "companion-skill-catalog-capture",
  definition:
    "the companion skill lines and abilities, read in batches into the add-on's saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The collector adds itself to the catalog registry as the module loads.",
    },
    {
      invariantKind: "departure",
      statement: "Abilities are read in batches so the client keeps its frame rate.",
    },
    {
      invariantKind: "departure",
      statement:
        "A skill line's highest rank is the highest rank an ability of that line asks for.",
    },
  ],
} as const satisfies Module
