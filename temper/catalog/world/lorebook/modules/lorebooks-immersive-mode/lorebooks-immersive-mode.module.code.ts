import { dropdown } from "akasha/temper/addon/shared/settings-panel/modules/dropdown/dropdown.module.code.ts"
import {
  DEFAULTS,
  getSavedVariables,
} from "akasha/temper/catalog/world/lorebook/modules/lorebooks-saved-variables/lorebooks-saved-variables.module.code.ts"
import "akasha/temper/catalog/world/lorebook/lorebooks-string-ids/lorebooks-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

export function addImmersiveModeOptions(this: void, optionsTable: unknown[]): undefined {
  const immersiveChoices: readonly string[] = [
    GetString(SI_TEMPER_LOREBOOKS_IMMERSIVE_CHOICE1),
    GetString(SI_TEMPER_LOREBOOKS_IMMERSIVE_CHOICE2),
    GetString(SI_TEMPER_LOREBOOKS_IMMERSIVE_CHOICE3),
    GetString(SI_TEMPER_LOREBOOKS_IMMERSIVE_CHOICE4),
    GetString(SI_TEMPER_LOREBOOKS_IMMERSIVE_CHOICE5),
  ]

  optionsTable[optionsTable.length] = dropdown({
    name: GetString(SI_TEMPER_LOREBOOKS_IMMERSIVE),
    tooltip: GetString(SI_TEMPER_LOREBOOKS_IMMERSIVE_DESC),
    choices: immersiveChoices,
    get: (): number => getSavedVariables().immersiveMode - 1,
    set: (index: number): undefined => {
      getSavedVariables().immersiveMode = index + 1
    },
    defaultIndex: DEFAULTS.immersiveMode - 1,
  })
}
