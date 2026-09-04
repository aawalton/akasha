import { dropdown } from "@akasha/temper-settings-panel/dropdown"
import {
  DEFAULTS,
  getSavedVariables,
} from "../lorebooks-saved-variables/lorebooks-saved-variables.module.code.ts"

export function addImmersiveModeOptions(this: void, optionsTable: unknown[]): undefined {
  const immersiveChoices: readonly string[] = [
    GetString(LBOOKS_IMMERSIVE_CHOICE1),
    GetString(LBOOKS_IMMERSIVE_CHOICE2),
    GetString(LBOOKS_IMMERSIVE_CHOICE3),
    GetString(LBOOKS_IMMERSIVE_CHOICE4),
    GetString(LBOOKS_IMMERSIVE_CHOICE5),
  ]

  optionsTable[optionsTable.length] = dropdown({
    name: GetString(LBOOKS_IMMERSIVE),
    tooltip: GetString(LBOOKS_IMMERSIVE_DESC),
    choices: immersiveChoices,
    get: (): number => getSavedVariables().immersiveMode - 1,
    set: (index: number): undefined => {
      getSavedVariables().immersiveMode = index + 1
    },
    defaultIndex: DEFAULTS.immersiveMode - 1,
  })
}
