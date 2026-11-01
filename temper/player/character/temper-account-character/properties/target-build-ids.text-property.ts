import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const targetBuildIds = {
  id: "01a1986c-c192-7fa1-bef8-e2d21866a697",
  type: "page-type/text-property",
  slug: "target-build-ids",
  propertySlug: "target-build-ids",
  definition: "the builds a character keeps gear for",
  maxLength: 36,
  nameFormat: "name-format/lower-uuid",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character's target build is the one of its target builds it is set up as.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which target build a character is set up as is chosen in the game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Gear a target build wants goes to the character's backpack.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the build a character is set up as is applied to the character.",
    },
  ],
  types: "ts",
  createdAt: "2026-11-01T18:43:46.704Z",
  updatedAt: "2026-11-01T18:43:46.704Z",
} as const satisfies TextProperty
