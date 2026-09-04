import { initPtf } from "../housing-init/housing-init.module.code.ts"

export function onAddOnLoaded(this: void): undefined {
  initPtf()
  return undefined
}
