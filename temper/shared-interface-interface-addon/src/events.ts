import { initFcoChangeStuff } from "./fcochangestuff/init"
import { initNoThankYou } from "./no-thank-you/init"
import { initPersonalAssistant } from "./personal-assistant/init"

export function OnAddOnLoaded(this: void): undefined {
  initNoThankYou()
  initPersonalAssistant()
  initFcoChangeStuff()
  return undefined
}
