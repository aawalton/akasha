import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperGuild = {
  id: "01a0d8a0-61b4-76dd-999f-c1340a514527",
  type: "page-type/page-type",
  slug: "temper-guild",
  definition: "a trading guild on one megaserver",
  extends: ["page-type/temper-thing"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A guild's slug is its megaserver and its name, each run of other characters a dash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A title is the guild's name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A guild belongs to no account, since every account in the guild sells through it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  parts: ["number-property/guild-id"],
  properties: [
    { pageProperty: "number-property/guild-id", required: true, many: false },
    { pageProperty: "text-property/world-name", required: true, many: false },
  ],
} as const satisfies PageType
