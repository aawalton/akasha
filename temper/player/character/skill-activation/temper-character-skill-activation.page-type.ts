import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCharacterSkillActivation = {
  id: "01a05fcd-f54a-7717-a057-2b49e5aeaa04",
  type: "page-type/page-type",
  slug: "temper-character-skill-activation",
  definition: "what a slotted skill does each time a character fires it",
  extends: ["page-type/temper-character-thing"],
  parts: [
    "number-property/coefficient",
    "page-property-entry/activation-effects",
    "text-property/activation-effect-type",
    "text-property/damage-type",
    "text-property/description-template",
    "text-property/scaling-kind",
    "text-property/scaling-stat",
  ],
  properties: [
    { pageProperty: "text-property/description-template", required: true, many: false },
    { pageProperty: "page-property-entry/activation-effects", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The slug of an activation is the skill the activation is of.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
