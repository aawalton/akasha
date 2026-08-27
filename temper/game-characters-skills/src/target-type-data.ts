import { createDataFile } from "@shared/utils-narrow/create-data-file"
import { TEMPER_TARGET_TYPES } from "./generated/temper-target-type.generated"

export interface TargetTypeTemplate {
  id: string
  name: string
}

export const targetTypes = createDataFile<TargetTypeTemplate>()(TEMPER_TARGET_TYPES)
