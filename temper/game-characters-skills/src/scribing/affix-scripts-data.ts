import { createDataFile } from "@shared/utils-narrow/create-data-file"
import { TEMPER_AFFIX_SCRIPTS } from "../generated/temper-affix-script.generated"

export interface AffixScriptTemplate {
  id: string
  name: string
  icon: string
  slotType: "affix-slot"
  itemId: number
  uespId: number
}

export const affixScripts = createDataFile<AffixScriptTemplate>()(TEMPER_AFFIX_SCRIPTS)

export type AffixScriptId = (typeof affixScripts.ids)[number]
