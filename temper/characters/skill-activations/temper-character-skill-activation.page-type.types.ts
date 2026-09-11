import type { TemperCharacterThing } from "../things/temper-character-thing.page-type.types.ts"
import type { ActivationEffects } from "./properties/activation-effects.page-property-entry.types.ts"
import type { DescriptionTemplate } from "./properties/description-template.text-property.types.ts"

export type TemperCharacterSkillActivation = TemperCharacterThing & {
  descriptionTemplate: DescriptionTemplate
  activationEffects: ActivationEffects
}
