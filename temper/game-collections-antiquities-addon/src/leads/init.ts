import "./public-api"

import { ADDON_NAME, SLASH_COMMAND } from "./constants"
import { createInventoryDropdown } from "./dropdowns"
import { strings } from "./locale/ui-strings"
import { antiquityFound } from "./reporting"
import { initializeSavedVariables } from "./saved-variables"
import { toggleRDL } from "./toggle"
import { createUnitList } from "./unit-list"

declare global {
  var TemperHud:
    | {
        registerCommand: (
          this: void,
          command: {
            name: string
            description: string
            addon: string
            handler?: (this: void, args: string) => undefined
          }
        ) => undefined
      }
    | undefined
}

export function initLeads(this: void): undefined {
  initializeSavedVariables()
  createUnitList()

  toggleRDL()
  TemperLeadsMainWindow.SetHidden(true)

  createInventoryDropdown("Major")
  createInventoryDropdown("Zone")
  createInventoryDropdown("SetType")
  TemperLeadsLocationBox.SetText(strings.EDITBOX_INITIAL)
  TemperLeadsMainWindowLocationURL.SetText(strings.LABEL_URL_INITIAL)
  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_ANTIQUITY_LEAD_ACQUIRED, antiquityFound)
  SCENE_MANAGER.RegisterTopLevel(TemperLeadsMainWindow, false)
}

SLASH_COMMANDS[SLASH_COMMAND] = toggleRDL
ZO_CreateStringId("SI_BINDING_NAME_TOGGLE_TEMPER_LEADS", strings.KEYBINDINGTEXT)

globalThis.TemperHud?.registerCommand({
  name: "/temperleads",
  description: "Toggle antiquity leads window",
  addon: "TemperAntiquities",
})
