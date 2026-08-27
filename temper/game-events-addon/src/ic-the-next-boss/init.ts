import "./public-api"

import { registerUiStrings } from "./ui-strings"

registerUiStrings()

import "./timers"
import "./events"
import "./gui"
import "./menu"

import { SLASH_COMMAND } from "./constants"
import { initData } from "./data"
import { setupBroadcast } from "./events"
import { initUi } from "./gui"
import { ICT } from "./state"

export function initIcTheNextBoss(this: void): undefined {
  initData()
  initUi()

  EVENT_MANAGER.RegisterForEvent(ICT.name, EVENT_PLAYER_ACTIVATED, ICT.onZoneChange)

  LINK_HANDLER.RegisterCallback(LINK_HANDLER.LINK_MOUSE_UP_EVENT, ICT.HandleClickEvent)
  LINK_HANDLER.RegisterCallback(LINK_HANDLER.LINK_CLICKED_EVENT, ICT.HandleClickEvent)

  ICT.initializeSettingsMenu()
  ICT.restoreUIPosition()
  ICT.onMapOpen()
  ICT.disableMapMouseWheelZoom()
  ICTMapTimers.SetDrawTier(DT_HIGH)

  setupBroadcast()

  ICT.editSpawnTime()

  ICT.running = false
  return undefined
}

SLASH_COMMANDS[SLASH_COMMAND] = function (this: void, districtId: string | undefined): undefined {
  if (districtId === undefined) {
    ZO_Alert(UI_ALERT_CATEGORY_ALERT, undefined, "Error")
    return undefined
  }
  const parsed = tonumber(districtId)
  if (parsed === undefined) {
    return undefined
  }
  ICT.markDistrict(parsed)
  return undefined
}
