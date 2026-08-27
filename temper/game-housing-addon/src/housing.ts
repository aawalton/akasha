import { initPtf } from "./ptf/init"

export function OnAddOnLoaded(this: void): undefined {
  initPtf()
  return undefined
}
