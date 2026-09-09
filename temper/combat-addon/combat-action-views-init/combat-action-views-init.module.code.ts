import { registerBar } from "../combat-action-bar/combat-action-bar.module.code.ts"
import { registerPatch } from "../combat-action-bar-patch/combat-action-bar-patch.module.code.ts"
import { registerVampireStage } from "../combat-action-vampire-view/combat-action-vampire-view.module.code.ts"

export function registerViews(this: void): undefined {
  registerBar()
  registerPatch()
  registerVampireStage()
  return undefined
}
