import { initPtf } from "akasha/temper/housing-addon/modules/housing-init/housing-init.module.code.ts"

export function onAddOnLoaded(this: void): undefined {
  initPtf()
  return undefined
}
