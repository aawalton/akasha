import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const skillVariants = {
  id: "01a15cf6-36cf-7f46-b419-6fc9b886c39d",
  type: "page-type/record-property",
  slug: "skill-variants",
  propertySlug: "variants",
  definition: "an ability the game slots in a skill's place under an ability id of its own",
  properties: [
    { pageProperty: "number-property/eso-skill-id", required: true, many: false },
    { pageProperty: "text-property/skill-equations", required: false, many: true, maxCount: null },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A variant is an ability no skill page names, such as a summon's slotted form or a proc.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A variant stating no equations takes the equations of the skill it is listed on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A variant whose tooltip shows other numbers states equations of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A variant's own equations are fit to the tooltips the game showed for that variant.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-21T05:36:42.191Z",
  updatedAt: "2026-10-21T05:36:42.191Z",
} as const satisfies RecordProperty
