import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillPointFinderTooltips = {
  id: "01a060ec-584c-7bf0-b01b-4841b23504eb",
  type: "page-type/module",
  slug: "skill-point-finder-tooltips",
  definition: "what the skill point window says about a row under the pointer",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "What a row says is shown in Temper's popover, above the row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each line of what a row says is a line of the popover.",
    },
  ],
  createdAt: "2026-09-02T07:01:36.972Z",
  updatedAt: "2026-09-25T18:23:21.000Z",
} as const satisfies Module
