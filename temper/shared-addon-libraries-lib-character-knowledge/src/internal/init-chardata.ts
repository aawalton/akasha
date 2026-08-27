import { asRecord, asString } from "../casts"
import type { CharacterRecord } from "../types"
import { Internal } from "./state"

const Diagnostics = Internal.diagnostics

function asCharacterRecord(value: unknown): CharacterRecord {
  return value as CharacterRecord
}

Internal.InitializeCharacterData = function (this: void): undefined {
  Diagnostics.Stopwatch()

  const charactersLocal = asRecord(Internal.characters[Internal.server])
  const exists: Record<string, boolean> = {}

  if (Internal.CanSave()) {
    for (let i = 1; i <= GetNumCharacters(); i++) {
      const [name, _gender, _level, _classId, _raceId, _alliance, id] = GetCharacterInfo(i)
      if (charactersLocal[id] === undefined) {
        charactersLocal[id] = {}
      }
      const record = asCharacterRecord(charactersLocal[id])
      record.account = Internal.userId
      record.name = zo_strformat("<<1>>", name)
      exists[id] = true
    }
  }

  for (const [id, data] of pairs(charactersLocal)) {
    const record = asCharacterRecord(data)
    if (
      (record.account === Internal.userId && exists[asString(id)] === undefined) ||
      !Internal.CanSave(record.account)
    ) {
      charactersLocal[asString(id)] = undefined
    }
  }

  Internal.ScanKnowledge()

  EVENT_MANAGER.RegisterForEvent(
    Internal.name,
    EVENT_MULTIPLE_RECIPES_LEARNED,
    Internal.RefreshKnowledge
  )
  EVENT_MANAGER.RegisterForEvent(Internal.name, EVENT_RECIPE_LEARNED, Internal.RefreshKnowledge)
  EVENT_MANAGER.RegisterForEvent(Internal.name, EVENT_STYLE_LEARNED, Internal.RefreshKnowledge)
  EVENT_MANAGER.RegisterForEvent(
    Internal.name,
    EVENT_CRAFTED_ABILITY_LOCK_STATE_CHANGED,
    function (
      this: void,
      _eventCode: number,
      _a: unknown,
      _b: unknown,
      isFromInit: unknown
    ): undefined {
      if (isFromInit !== true) {
        Internal.RefreshKnowledge()
      }
    }
  )
  EVENT_MANAGER.RegisterForEvent(
    Internal.name,
    EVENT_CRAFTED_ABILITY_SCRIPT_LOCK_STATE_CHANGED,
    Internal.RefreshKnowledge
  )
  EVENT_MANAGER.RegisterForEvent(
    Internal.name,
    EVENT_SMITHING_TRAIT_RESEARCH_CANCELED,
    Internal.RefreshKnowledge
  )
  EVENT_MANAGER.RegisterForEvent(
    Internal.name,
    EVENT_SMITHING_TRAIT_RESEARCH_COMPLETED,
    Internal.RefreshKnowledge
  )
  EVENT_MANAGER.RegisterForEvent(
    Internal.name,
    EVENT_SMITHING_TRAIT_RESEARCH_STARTED,
    Internal.RefreshKnowledge
  )
  EVENT_MANAGER.RegisterForEvent(
    Internal.name,
    EVENT_SMITHING_TRAIT_RESEARCH_TIMES_UPDATED,
    Internal.RefreshKnowledge
  )
  EVENT_MANAGER.RegisterForEvent(
    Internal.name,
    EVENT_SKILL_RESPEC_RESULT,
    function (this: void, _eventCode: number, result: unknown): undefined {
      if (result === RESPEC_RESULT_SUCCESS && Internal.ResearchCheckPassives()) {
        Internal.RefreshKnowledge()
      }
    }
  )
  EVENT_MANAGER.RegisterForEvent(
    Internal.name,
    EVENT_ARMORY_BUILD_RESTORE_RESPONSE,
    function (this: void, _eventCode: number, result: unknown): undefined {
      if (result === ARMORY_BUILD_RESTORE_RESULT_SUCCESS && Internal.ResearchCheckPassives()) {
        Internal.RefreshKnowledge()
      }
    }
  )
}

Internal.RefreshKnowledge = function (this: void): undefined {
  EVENT_MANAGER.UnregisterForUpdate(Internal.name)
  EVENT_MANAGER.RegisterForUpdate(
    Internal.name,
    Internal.scanThrottle,
    Internal.ScanKnowledge,
    true
  )
}
