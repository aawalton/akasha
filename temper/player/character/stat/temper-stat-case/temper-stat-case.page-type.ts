import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperStatCase = {
  id: "01a13b68-e810-7cb5-b143-e4ca8335a98f",
  type: "page-type/page-type",
  slug: "temper-stat-case",
  definition: "a build's stats as the game reported them, held for the calculator to match",
  extends: ["page-type/temper-thing"],
  parts: ["file-property/verified-stats"],
  properties: [{ pageProperty: "file-property/verified-stats", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A case is one bar of one build, read in the game at one moment.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A case keeps the buffs and champion stars the game listed when it was read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pinned stat is one the calculator matched when the case was pinned.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat the calculator did not match is kept as a known gap rather than pinned.",
    },
    {
      decisionKind: "decision-kind/upkeep",
      statement: "Every pinned stat of every case is the number the calculator gives.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-14T17:14:53.326Z",
  updatedAt: "2026-10-14T17:14:53.326Z",
} as const satisfies PageType
