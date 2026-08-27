import { asPresent } from "../casts"
import { asLibSlots } from "./casts"

const lib = LibSets

let searchUIKeyboard: unknown

function initSearchUI(this: void, gamepadPreferred?: boolean): undefined {
  if (!lib.fullyLoaded) {
    return
  }
  const searchUI = lib.SearchUI
  if (gamepadPreferred === undefined || gamepadPreferred === false) {
    searchUIKeyboard = searchUIKeyboard ?? GetControl(asPresent(searchUI.controlName.get(false)))
    if (searchUIKeyboard === undefined) {
      return
    }
    searchUI.control.set(false, searchUIKeyboard)
    LibSets_SearchUI_Keyboard_TopLevel_OnInitialized(searchUIKeyboard)
  }
}
asLibSlots(lib)["_InitSearchUI"] = initSearchUI
