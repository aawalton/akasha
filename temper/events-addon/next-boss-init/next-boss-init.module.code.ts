import "akasha/temper/eso-types/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-enums-03/eso-enums-03.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-link-handler/eso-link-handler.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-lua-sandbox/eso-lua-sandbox.type-declaration.d.ts"
import "../next-boss-global/next-boss-global.module.code.ts"

import { makeUiStrings } from "../next-boss-ui-strings/next-boss-ui-strings.module.code.ts"

makeUiStrings()

import "../next-boss-timers/next-boss-timers.module.code.ts"
import "../next-boss-events/next-boss-events.module.code.ts"
import "../next-boss-gui/next-boss-gui.module.code.ts"
import "../next-boss-menu/next-boss-menu.module.code.ts"

import { SLASH_COMMAND } from "../next-boss-constants/next-boss-constants.module.code.ts"
import { initData } from "../next-boss-data/next-boss-data.module.code.ts"
import { setupBroadcast } from "../next-boss-events/next-boss-events.module.code.ts"
import { initUi } from "../next-boss-gui/next-boss-gui.module.code.ts"
import { ICT } from "../next-boss-state/next-boss-state.module.code.ts"

export function initNextBoss(this: void): undefined {
  initData()
  initUi()

  EVENT_MANAGER.RegisterForEvent(ICT.name, EVENT_PLAYER_ACTIVATED, ICT.onZoneChange)

  LINK_HANDLER.RegisterCallback(LINK_HANDLER.LINK_MOUSE_UP_EVENT, ICT.handleClickEvent)
  LINK_HANDLER.RegisterCallback(LINK_HANDLER.LINK_CLICKED_EVENT, ICT.handleClickEvent)

  ICT.initializeSettingsMenu()
  ICT.restoreUiPosition()
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
