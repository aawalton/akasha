import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const equipmentIcon = {
  id: "01a06333-1bba-7ed5-888a-b5a3ca70eacf",
  type: "page-type/module",
  slug: "equipment-icon",
  definition: "the picture that represents a piece of equipment",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture that fails to load is replaced rather than left broken.",
    },
  ],
  createdAt: "2026-09-02T17:38:08.954Z",
  updatedAt: "2026-09-22T10:19:09.000Z",
} as const satisfies Module
