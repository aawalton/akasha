import { initPersonalAssistant } from "akasha/temper/interface-addon/assistant-entry/assistant-entry.module.code.ts"
import { initFcoChangeStuff } from "akasha/temper/interface-addon/fco-entry/fco-entry.module.code.ts"
import { initNoThankYou } from "akasha/temper/interface-addon/quiet-entry/quiet-entry.module.code.ts"

export function onAddOnLoaded(this: void): undefined {
  initNoThankYou()
  initPersonalAssistant()
  initFcoChangeStuff()
  return undefined
}
