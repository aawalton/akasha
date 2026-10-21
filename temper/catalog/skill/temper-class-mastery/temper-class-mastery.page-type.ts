import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperClassMastery = {
  id: "01a15ea2-ac42-78d4-b050-c846f12a7b15",
  type: "page-type/page-type",
  slug: "temper-class-mastery",
  definition: "a passive a character chooses from a class's mastery line",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
    { pageProperty: "number-property/eso-skill-id", required: true, many: false },
    { pageProperty: "relation-property/skill-line-class", required: true, many: false },
    { pageProperty: "number-property/hash-place", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A class mastery is no skill, so a build's skills and passives never hold one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character not subclassing chooses up to two class masteries from any class.",
    },
  ],
  schema: "jsonl",
  hashIndexed: ["hashPlace"],
  types: "ts",
  createdAt: "2026-10-21T13:24:41.666Z",
  updatedAt: "2026-10-21T13:24:41.666Z",
} as const satisfies PageType
