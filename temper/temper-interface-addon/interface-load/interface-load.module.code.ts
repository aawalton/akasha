import { initPersonalAssistant } from "../assistant-entry/assistant-entry.module.code.ts"
import { initFcoChangeStuff } from "../fco-entry/fco-entry.module.code.ts"
import { initNoThankYou } from "../quiet-entry/quiet-entry.module.code.ts"

export function onAddOnLoaded(this: void): undefined {
  initNoThankYou()
  initPersonalAssistant()
  initFcoChangeStuff()
  return undefined
}
