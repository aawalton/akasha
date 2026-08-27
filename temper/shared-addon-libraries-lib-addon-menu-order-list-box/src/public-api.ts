import "./widget"

import { widgetVersion } from "./constants"
import { checkIfDraggedAndDisableUpdateHandler, getCursorTLC } from "./drag-helpers"
import { cm, em, LAM, state } from "./state"

const EVENT_ADD_ON_LOADED_NAMESPACE = "LibAddonMenuOrderListBox_EVENT_ADD_ON_LOADED"

function registerWidget(this: void, ...args: unknown[]): undefined {
  const addonName = args[1]
  if (addonName !== "LibAddonMenuOrderListBox") {
    return
  }
  em.UnregisterForEvent(EVENT_ADD_ON_LOADED_NAMESPACE, EVENT_ADD_ON_LOADED)

  state.cursorTLC = getCursorTLC()

  if (!LAM.RegisterWidget("orderlistbox", widgetVersion)) {
    return
  }
  cm.RegisterCallback("LAM-PanelClosed", checkIfDraggedAndDisableUpdateHandler)
}

em.RegisterForEvent(EVENT_ADD_ON_LOADED_NAMESPACE, EVENT_ADD_ON_LOADED, registerWidget)
