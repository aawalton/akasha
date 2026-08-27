import { createDataFile } from "@shared/utils-narrow/create-data-file"
import { TEMPER_TARGET_ARMORS } from "./generated/temper-target-armor.generated"

export interface TargetArmorTemplate {
  id: string
  name: string
  armor: number
}

export const targetArmor = createDataFile<TargetArmorTemplate>()(TEMPER_TARGET_ARMORS)

export type TargetArmorId = (typeof targetArmor.ids)[number]
