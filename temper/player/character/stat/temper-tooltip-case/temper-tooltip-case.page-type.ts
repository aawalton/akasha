import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperTooltipCase = {
  id: "01a15c22-e9f5-75f7-9745-a2c568d3905c",
  type: "page-type/page-type",
  slug: "temper-tooltip-case",
  definition:
    "a build's skill tooltips as the game showed them, held for the tooltip formulas to match",
  extends: ["page-type/temper-thing"],
  parts: ["file-property/verified-tooltips"],
  properties: [{ pageProperty: "file-property/verified-tooltips", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A case is one bar of one build, read in the game at one moment.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A case keeps the stats the game reported when it was read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pinned number is one a tooltip formula matched when the case was pinned.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number no tooltip formula matched is kept as a known gap rather than pinned.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tooltip number pins a tooltip formula and never a stat formula.",
    },
    {
      decisionKind: "decision-kind/upkeep",
      statement: "Every pinned number of every case is the number its tooltip formula gives.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-21T01:45:54.419Z",
  updatedAt: "2026-10-21T01:45:54.419Z",
} as const satisfies PageType
