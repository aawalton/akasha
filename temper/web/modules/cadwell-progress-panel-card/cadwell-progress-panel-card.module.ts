import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const cadwellProgressPanelCard = {
  id: "01a06421-f74b-7cbd-b36d-266f303f0011",
  type: "page-type/module",
  slug: "cadwell-progress-panel-card",
  definition: "Cadwell's Almanac, by alliance and by zone",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its title is read from its completion category page.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T11:43:30.000Z",
} as const satisfies Module
