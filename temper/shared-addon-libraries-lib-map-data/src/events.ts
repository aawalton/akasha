import { buildAllTables, getPlayerPos } from "./build-tables"
import { LIB_IDENTIFIER } from "./constants"
import { internal, lib } from "./lib-state"

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
        lib.reticleInteractionName = name
      } else if (validInteraction !== true) {
        lib.reticleInteractionName = undefined
      }
    }
  })

  EVENT_MANAGER.RegisterForEvent(
    `${LIB_IDENTIFIER}_OnPrepareForJump`,
    EVENT_PREPARE_FOR_JUMP,
    function (this: void): undefined {
      lib.reticleInteractionName = undefined
      lib.lastInteractionTarget = undefined
      lib.onPrepareForJumpInProgress = true
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
      lib.reticleInteractionName = undefined
      lib.lastInteractionTarget = undefined
      lib.newSubzone = newSubzone
      lib.subZoneId = subZoneId
      internal.SetUpSetPlayerLocationQueue()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${LIB_IDENTIFIER}_OnWorldPositionChanged`,
    EVENT_LINKED_WORLD_POSITION_CHANGED,
    function (this: void): undefined {
      lib.reticleInteractionName = undefined
      lib.lastInteractionTarget = undefined
      internal.SetUpSetPlayerLocationQueue()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${LIB_IDENTIFIER}_activated`,
    EVENT_PLAYER_ACTIVATED,
    function (this: void, _eventCode: number, initial: boolean): undefined {
      if (!initial) {
        lib.reticleInteractionName = undefined
        lib.lastInteractionTarget = undefined
      }
      lib.onPrepareForJumpInProgress = false
      lib.onAddonLoadInProgress = false
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${LIB_IDENTIFIER}_OnPlayerDeactivated`,
    EVENT_PLAYER_DEACTIVATED,
    function (this: void): undefined {
      lib.reticleInteractionName = undefined
      lib.lastInteractionTarget = undefined
    }
  )

  CALLBACK_MANAGER.RegisterCallback("OnWorldMapChanged", function (this: void): undefined {
    lib.SetMapToPlayerLocationQueueStart = 0
    lib.setMapToPlayerLocationQueueInProgress = false
    lib.lastMapId = lib.mapId
    lib.lastMapTexture = lib.mapTexture
    internal.UpdateMapInfo()
    internal.SetWasSetMapToPlayerLocationCalledFalse()
    internal.MapTextureMapIdUpdated()
  })

  WORLD_MAP_SCENE.RegisterCallback(
    "StateChange",
    function (this: void, _oldState: number, newState: number): undefined {
      lib.SetMapToPlayerLocationQueueStart = 0
      lib.setMapToPlayerLocationQueueInProgress = false
      if (newState === SCENE_HIDDEN) {
        internal.SetWasSetMapToPlayerLocationCalledFalse()
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
      lib.lastInteractionTarget = text
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${LIB_IDENTIFIER}_OnQuestSharred`,
    EVENT_QUEST_SHARED,
    function (this: void): undefined {
      lib.reticleInteractionName = undefined
      lib.lastInteractionTarget = undefined
      lib.questShared = true
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${LIB_IDENTIFIER}_onload`,
    EVENT_ADD_ON_LOADED,
    function (this: void, _eventCode: number, addonName: string): undefined {
      if (addonName !== LIB_IDENTIFIER) return
      internal.dm("Debug", "OnAddOnLoaded")
      EVENT_MANAGER.UnregisterForEvent(`${LIB_IDENTIFIER}_onload`, EVENT_ADD_ON_LOADED)

      SLASH_COMMANDS["/lmdgetpos"] = (_command: string): undefined => {
        getPlayerPos()
      }

      buildAllTables()

      internal.UpdateMapInfo()
      if (lib.lastMapTexture === undefined) lib.lastMapTexture = lib.mapTexture
      if (lib.lastMapId === undefined) lib.lastMapId = lib.mapId
      lib.newSubzone = false
      lib.setMapToPlayerLocationQueueInProgress = false
    }
  )
}
