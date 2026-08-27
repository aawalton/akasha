import { createDataFile } from "@shared/utils-narrow/create-data-file"
import { TEMPER_SPECIAL_EFFECT_TYPES } from "./generated/temper-special-effect-type.generated"

export interface SpecialEffectTypeTemplate {
  id: string
  name: string
}

export const specialEffectTypes = createDataFile<SpecialEffectTypeTemplate>()(
  TEMPER_SPECIAL_EFFECT_TYPES
)
