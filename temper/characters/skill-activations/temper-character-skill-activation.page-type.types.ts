import type { ActivationEffects } from "akasha/temper/characters/skill-activations/properties/activation-effects.page-property-entry.types.ts"
import type { DescriptionTemplate } from "akasha/temper/characters/skill-activations/properties/description-template.text-property.types.ts"
import type { TemperCharacterThing } from "akasha/temper/characters/things/temper-character-thing.page-type.types.ts"

export type TemperCharacterSkillActivation = TemperCharacterThing & {
  descriptionTemplate: DescriptionTemplate
  activationEffects: ActivationEffects
}
