import { registerBar } from "./bar"
import { registerPatch } from "./patch"
import { registerVampireStage } from "./vampire-stage"

export function registerViews(this: void): undefined {
  registerBar()
  registerPatch()
  registerVampireStage()
  return undefined
}
