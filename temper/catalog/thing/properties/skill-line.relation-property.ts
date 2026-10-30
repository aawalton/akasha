import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const skillLine = {
  id: "01a0cb21-70d9-7538-be2f-3fc1b1531dca",
  type: "page-type/relation-property",
  slug: "skill-line",
  propertySlug: "skill-line-id",
  definition: "the skill line a thing is learned from",
  targetPageType: "page-type/temper-skill-line",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A one-handed weapon names no line, since the game gives that kind no line.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-22T21:59:21.561Z",
  updatedAt: "2026-10-30T16:44:49.832Z",
} as const satisfies RelationProperty
