import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionSkillCatalogCapture = {
  id: "01a060e2-3183-7d2a-a40a-3c845ef259aa",
  type: "module",
  slug: "companion-skill-catalog-capture",
  definition:
    "the companion skill lines and abilities, read in batches into the add-on's saved variables",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The collector adds itself to the catalog registry as the module loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Abilities are read in batches so the client keeps its frame rate.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A skill line's highest rank is the highest rank an ability of that line asks for.",
    },
  ],
} as const satisfies Module
