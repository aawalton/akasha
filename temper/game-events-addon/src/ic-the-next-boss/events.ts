import {
  BROADCAST_HANDLER_NAME,
  PROTOCOL_ID,
  PROTOCOL_NAME,
  UPDATE_LOOP_NAME,
  ZONE_CYRODIIL,
  ZONE_IC_A,
  ZONE_IC_B,
} from "./constants"
import { ICT } from "./state"

ICT.onMonsterDeath = function (
  this: void,
  _eventCode: number,
  unitTag: string,
  isDead: boolean
): undefined {
  GetUnitName(unitTag)
  if (isDead === true) {
    ICT.unitDead(undefined)
  }
  return undefined
}

ICT.onMonsterReticle = function (this: void, _eventCode: number): undefined {
  const unitName = GetUnitNameHighlightedByReticle()
  const isDead = IsUnitDead("reticleover")
  if (unitName === undefined || unitName === "") {
    return undefined
  }

  if (ICT.savedVariables.chatdebug === true) {
    const link = `|H1:icdebug:${unitName}|h[${unitName}]|h`
    d(link)
  }

  const fallback = ICT.fallbackTimes[unitName]
  if (fallback === undefined) {
    return undefined
  }
  const location = ICT.locations[unitName]
  const respawn = location !== undefined ? ICT.timetable[location] : undefined
  if (respawn !== undefined && respawn - GetTimeStamp() > 0) {
    return undefined
  }

  if (isDead === true) {
    if (fallback > 0) {
      ICT.unitDead(unitName)
    }
  } else {
    ICT.fallbackTimes[unitName] = ICT.fallbackMaxTime
  }
  return undefined
}

ICT.onZoneChange = function (this: void, _eventCode: number, _initial: boolean): undefined {
  const [zone] = GetUnitWorldPosition("player")
  ICT.resetTimers()

  if (zone === ZONE_IC_A || zone === ZONE_IC_B) {
    if (ICT.running === false) {
      ICT.enable()
    } else {
      ICT.showTimetable()
    }
  } else {
    ICT.disable()
  }
  return undefined
}

ICT.enable = function (this: void): undefined {
  EVENT_MANAGER.RegisterForEvent(ICT.name, EVENT_UNIT_DEATH_STATE_CHANGED, ICT.onMonsterDeath)
  EVENT_MANAGER.RegisterForEvent(ICT.name, EVENT_RETICLE_TARGET_CHANGED, ICT.onMonsterReticle)
  EVENT_MANAGER.RegisterForUpdate(UPDATE_LOOP_NAME, 1000, ICT.updateTimers)
  ICTTimeTable.SetWidth(tonumber(GetString(SI_ICTHENEXTBOSS_GUI_WIDTH)) ?? 0)
  ICT.showTimetable()
  ICT.restoreTimers()
  ICT.running = true
  return undefined
}

ICT.disable = function (this: void): undefined {
  const [zone] = GetUnitWorldPosition("player")
  if (zone !== ZONE_CYRODIIL) {
    EVENT_MANAGER.UnregisterForUpdate(UPDATE_LOOP_NAME)
  }
  EVENT_MANAGER.UnregisterForEvent(ICT.name, EVENT_UNIT_DEATH_STATE_CHANGED)
  EVENT_MANAGER.UnregisterForEvent(ICT.name, EVENT_RETICLE_TARGET_CHANGED)
  ICTTimeTable.SetHidden(true)
  HUD_SCENE.RemoveFragment(ICT.ui.timetable)
  HUD_UI_SCENE.RemoveFragment(ICT.ui.timetable)
  ICT.running = false
  return undefined
}

ICT.showTimetable = function (this: void): undefined {
  if (ICT.savedVariables.timetable === true) {
    HUD_SCENE.AddFragment(ICT.ui.timetable)
    HUD_UI_SCENE.AddFragment(ICT.ui.timetable)
    ICTTimeTable.SetHidden(false)
  }
  return undefined
}

ICT.HandleClickEvent = function (
  this: void,
  _rawLink: string,
  _mouseButton: number,
  _linkText: string,
  _linkStyle: number,
  linkType: string,
  data: string
): boolean | undefined {
  if (linkType === "icdebug") {
    CHAT_SYSTEM.textEntry.Open(data)
    return true
  }
  return undefined
}

ICT.ShareCode = function (this: void, code: number | undefined): undefined {
  if (code === undefined) {
    return undefined
  }
  if (ICT.protocol === undefined) {
    return undefined
  }
  ICT.protocol.Send({ bossId: code })
  return undefined
}

function onMessageReceived(this: void, bossId: number): undefined {
  ICT.markDistrict(bossId)
  return undefined
}

export function setupBroadcast(this: void): undefined {
  if (LibGroupBroadcast !== undefined) {
    const handler = LibGroupBroadcast.RegisterHandler(BROADCAST_HANDLER_NAME)
    handler.SetDisplayName("ICTheNextBoss")
    handler.SetDescription("Shares kills with your group")
    const protocol = handler.DeclareProtocol(PROTOCOL_ID, PROTOCOL_NAME)
    protocol.AddField(LibGroupBroadcast.CreateNumericField("bossId", { minValue: 1, maxValue: 6 }))
    protocol.OnData(onMessageReceived)
    if (!protocol.Finalize({ isRelevantInCombat: false, replaceQueuedMessages: false })) {
      error("Failed to finalize ICTheNextBoss legacy protocol")
    }
    ICT.handler = handler
    ICT.protocol = protocol
  }
  return undefined
}
