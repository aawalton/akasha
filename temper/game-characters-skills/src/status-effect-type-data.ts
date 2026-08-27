import { createDataFile } from "@shared/utils-narrow/create-data-file"
import { TEMPER_STATUS_EFFECT_TYPES } from "./generated/temper-status-effect-type.generated"

export interface StatusEffectTypeTemplate {
  id: string
  name: string
}

export const statusEffectTypes = createDataFile<StatusEffectTypeTemplate>()(
  TEMPER_STATUS_EFFECT_TYPES
)
