import "../order-list-box-widget/order-list-box-widget.module.code.ts"

import { WIDGET_VERSION } from "../order-list-box-constants/order-list-box-constants.module.code.ts"
import {
  checkIfDraggedAndDisableUpdateHandler,
  getCursorTLC,
} from "../order-list-box-drag-cursor/order-list-box-drag-cursor.module.code.ts"
import { cm, em, LAM, STATE } from "../order-list-box-state/order-list-box-state.module.code.ts"

const EVENT_ADD_ON_LOADED_NAMESPACE = "LibAddonMenuOrderListBox_EVENT_ADD_ON_LOADED"

function registerWidget(this: void, ...args: unknown[]): undefined {
  const addonName = args[1]
  if (addonName !== "LibAddonMenuOrderListBox") {
    return
  }
  em.UnregisterForEvent(EVENT_ADD_ON_LOADED_NAMESPACE, EVENT_ADD_ON_LOADED)

  STATE.cursorTLC = getCursorTLC()

  if (!LAM.RegisterWidget("orderlistbox", WIDGET_VERSION)) {
    return
  }
  cm.RegisterCallback("LAM-PanelClosed", checkIfDraggedAndDisableUpdateHandler)
}

em.RegisterForEvent(EVENT_ADD_ON_LOADED_NAMESPACE, EVENT_ADD_ON_LOADED, registerWidget)
