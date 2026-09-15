import type { ActivationEffects } from "akasha/temper/character/skill-activation/properties/activation-effects.page-property-entry.types.ts"
import type { DescriptionTemplate } from "akasha/temper/character/skill-activation/properties/description-template.text-property.types.ts"
import type { TemperCharacterThing } from "akasha/temper/character/thing/temper-character-thing.page-type.types.ts"

export type TemperCharacterSkillActivation = TemperCharacterThing & {
  descriptionTemplate: DescriptionTemplate
  activationEffects: ActivationEffects
}
