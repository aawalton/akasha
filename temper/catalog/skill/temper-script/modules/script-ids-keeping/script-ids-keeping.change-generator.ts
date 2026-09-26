import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const scriptIdsKeeping = {
  id: "01a0df12-aff3-7ec0-88c9-ba6c5ccadb3d",
  type: "page-type/change-generator",
  slug: "script-ids-keeping",
  definition:
    "the types naming every scribing script by its id, written again from the script pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The types are written by a machine from the script pages rather than by an author.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each kind of script has a type of its own, and a script's id is its page's slug.",
    },
  ],
} as const satisfies ChangeGenerator
