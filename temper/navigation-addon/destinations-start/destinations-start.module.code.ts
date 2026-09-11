import "akasha/temper/navigation-addon/destinations-global/destinations-global.module.code.ts"

import { initializeDestinations } from "akasha/temper/navigation-addon/destinations-pins-initialize/destinations-pins-initialize.module.code.ts"

export function initDestinations(this: void): undefined {
  initializeDestinations()
  return undefined
}
