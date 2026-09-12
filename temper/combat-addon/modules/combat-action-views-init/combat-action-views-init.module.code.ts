import { registerBar } from "akasha/temper/combat-addon/modules/combat-action-bar/combat-action-bar.module.code.ts"
import { registerPatch } from "akasha/temper/combat-addon/modules/combat-action-bar-patch/combat-action-bar-patch.module.code.ts"
import { registerVampireStage } from "akasha/temper/combat-addon/modules/combat-action-vampire-view/combat-action-vampire-view.module.code.ts"

export function registerViews(this: void): undefined {
  registerBar()
  registerPatch()
  registerVampireStage()
  return undefined
}
