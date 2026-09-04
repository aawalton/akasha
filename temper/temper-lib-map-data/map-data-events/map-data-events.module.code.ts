import {
  buildAllTables,
  getPlayerPos,
} from "../map-data-build-tables/map-data-build-tables.module.code.ts"
import { LIB_IDENTIFIER } from "../map-data-constants/map-data-constants.module.code.ts"
import { INTERNAL, LIB } from "../map-data-lib-state/map-data-lib-state.module.code.ts"

export function initEvents(this: void): undefined {
  const approvedInteractionTypes: Record<string, boolean> = {}
  approvedInteractionTypes[GetString(SI_GAMECAMERAACTIONTYPE1)] = true
  approvedInteractionTypes[GetString(SI_GAMECAMERAACTIONTYPE5)] = true
  approvedInteractionTypes[GetString(SI_GAMECAMERAACTIONTYPE13)] = true
  approvedInteractionTypes[GetString(SI_GAMECAMERAACTIONTYPE6)] = true
  approvedInteractionTypes[GetString(SI_GAMECAMERAACTIONTYPE10)] = true
  approvedInteractionTypes[GetString(SI_GAMECAMERAACTIONTYPE15)] = true

  ZO_PreHook(ZO_Reticle, "TryHandlingInteraction", function (this: void): undefined {
    if (IsGameCameraActive() && !IsGameCameraUIModeActive()) {
      const [action, name, interactBlocked] = GetGameCameraInteractableActionInfo()
      const validInteraction = action === undefined ? undefined : approvedInteractionTypes[action]
      if (name !== undefined && validInteraction === true && !interactBlocked) {
        LIB.reticleInteractionName = name
      } else if (validInteraction !== true) {
        LIB.reticleInteractionName = undefined
      }
    }
  })

  EVENT_MANAGER.RegisterForEvent(
    `${LIB_IDENTIFIER}_OnPrepareForJump`,
    EVENT_PREPARE_FOR_JUMP,
    function (this: void): undefined {
      LIB.reticleInteractionName = undefined
      LIB.lastInteractionTarget = undefined
      LIB.onPrepareForJumpInProgress = true
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${LIB_IDENTIFIER}_zone_changed`,
    EVENT_ZONE_CHANGED,
    function (
      this: void,
      _eventCode: number,
      _zoneName: string,
      _subZoneName: string,
      newSubzone: boolean,
      _zoneId: number,
      subZoneId: number
    ): undefined {
      LIB.reticleInteractionName = undefined
      LIB.lastInteractionTarget = undefined
      LIB.newSubzone = newSubzone
      LIB.subZoneId = subZoneId
      INTERNAL.SetUpSetPlayerLocationQueue()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${LIB_IDENTIFIER}_OnWorldPositionChanged`,
    EVENT_LINKED_WORLD_POSITION_CHANGED,
    function (this: void): undefined {
      LIB.reticleInteractionName = undefined
      LIB.lastInteractionTarget = undefined
      INTERNAL.SetUpSetPlayerLocationQueue()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${LIB_IDENTIFIER}_activated`,
    EVENT_PLAYER_ACTIVATED,
    function (this: void, _eventCode: number, initial: boolean): undefined {
      if (!initial) {
        LIB.reticleInteractionName = undefined
        LIB.lastInteractionTarget = undefined
      }
      LIB.onPrepareForJumpInProgress = false
      LIB.onAddonLoadInProgress = false
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${LIB_IDENTIFIER}_OnPlayerDeactivated`,
    EVENT_PLAYER_DEACTIVATED,
    function (this: void): undefined {
      LIB.reticleInteractionName = undefined
      LIB.lastInteractionTarget = undefined
    }
  )

  CALLBACK_MANAGER.RegisterCallback("OnWorldMapChanged", function (this: void): undefined {
    LIB.SetMapToPlayerLocationQueueStart = 0
    LIB.setMapToPlayerLocationQueueInProgress = false
    LIB.lastMapId = LIB.mapId
    LIB.lastMapTexture = LIB.mapTexture
    INTERNAL.UpdateMapInfo()
    INTERNAL.SetWasSetMapToPlayerLocationCalledFalse()
    INTERNAL.MapTextureMapIdUpdated()
  })

  WORLD_MAP_SCENE.RegisterCallback(
    "StateChange",
    function (this: void, _oldState: number, newState: number): undefined {
      LIB.SetMapToPlayerLocationQueueStart = 0
      LIB.setMapToPlayerLocationQueueInProgress = false
      if (newState === SCENE_HIDDEN) {
        INTERNAL.SetWasSetMapToPlayerLocationCalledFalse()
      }
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${LIB_IDENTIFIER}_OnInteract`,
    EVENT_CLIENT_INTERACT_RESULT,
    function (
      this: void,
      _eventCode: number,
      _result: number,
      interactTargetName: string
    ): undefined {
      const text = zo_strformat(SI_CHAT_MESSAGE_FORMATTER, interactTargetName)
      LIB.lastInteractionTarget = text
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${LIB_IDENTIFIER}_OnQuestSharred`,
    EVENT_QUEST_SHARED,
    function (this: void): undefined {
      LIB.reticleInteractionName = undefined
      LIB.lastInteractionTarget = undefined
      LIB.questShared = true
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${LIB_IDENTIFIER}_onload`,
    EVENT_ADD_ON_LOADED,
    function (this: void, _eventCode: number, addonName: string): undefined {
      if (addonName !== LIB_IDENTIFIER) return
      INTERNAL.dm("Debug", "OnAddOnLoaded")
      EVENT_MANAGER.UnregisterForEvent(`${LIB_IDENTIFIER}_onload`, EVENT_ADD_ON_LOADED)

      SLASH_COMMANDS["/lmdgetpos"] = (_command: string): undefined => {
        getPlayerPos()
      }

      buildAllTables()

      INTERNAL.UpdateMapInfo()
      if (LIB.lastMapTexture === undefined) LIB.lastMapTexture = LIB.mapTexture
      if (LIB.lastMapId === undefined) LIB.lastMapId = LIB.mapId
      LIB.newSubzone = false
      LIB.setMapToPlayerLocationQueueInProgress = false
    }
  )
}
