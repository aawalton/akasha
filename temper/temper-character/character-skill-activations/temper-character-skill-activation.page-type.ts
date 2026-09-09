import type { PageType } from "@akasha/pages/page-type"
import type { TemperCharacterThing } from "../things/temper-character-thing.page-type.ts"
import type { ActivationEffects } from "./properties/activation-effects.page-property-entry.ts"
import type { DescriptionTemplate } from "./properties/description-template.text-property.ts"

export type TemperCharacterSkillActivation = TemperCharacterThing & {
  descriptionTemplate: DescriptionTemplate
  activationEffects: ActivationEffects
}

export const temperCharacterSkillActivation = {
  id: "01a05fcd-f54a-7717-a057-2b49e5aeaa04",
  pageTypeSlug: "page-type",
  slug: "temper-character-skill-activation",
  definition: "what one slotted skill does each time a character fires it",
  pluralSlug: "temper-character-skill-activations",
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
    { pagePropertySlug: "text-property/description-template", required: true, many: false },
    { pagePropertySlug: "page-property-entry/activation-effects", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The slug of an activation is the skill the activation is of.",
    },
  ],
} as const satisfies PageType
