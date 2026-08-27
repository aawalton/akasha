import { createDataFile } from "@shared/utils-narrow/create-data-file"
import { TEMPER_FOCUS_SCRIPTS } from "../generated/temper-focus-script.generated"

export interface FocusScriptTemplate {
  id: string
  name: string
  icon: string
  slotType: "focus-slot"
  itemId: number
  uespId: number
}

export const focusScripts = createDataFile<FocusScriptTemplate>()(TEMPER_FOCUS_SCRIPTS)

export type FocusScriptId = (typeof focusScripts.ids)[number]
