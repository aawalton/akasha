import type { PagePropertyEntry } from "akasha/page/property-entry/page-property-entry.page-type.types.ts"

export const skillPointQuests = {
  id: "01a0e0fe-fb56-7e09-bff4-59b4e22730e3",
  type: "page-type/page-property-entry",
  slug: "skill-point-quests",
  propertySlug: "skill-point-quests",
  definition: "the quests a skill point source counts, one quest to a line",
  properties: [{ pageProperty: "number-property/eso-quest-id", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A zone's lines are the quests that each hand a character a skill point there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The lines run in the order the skill point finder lists them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tutorial counts once any one of its lines is done.",
    },
  ],
  types: "ts",
} as const satisfies PagePropertyEntry
