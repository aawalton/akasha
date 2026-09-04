import { asRecord, asString } from "../knowledge-casts/knowledge-casts.module.code.ts"
import { INTERNAL } from "../knowledge-state/knowledge-state.module.code.ts"
import type { CharacterRecord } from "../knowledge-types/knowledge-types.module.code.ts"

const DIAGNOSTICS = INTERNAL.diagnostics

function asCharacterRecord(value: unknown): CharacterRecord {
  return value as CharacterRecord
}

INTERNAL.InitializeCharacterData = function (this: void): undefined {
  DIAGNOSTICS.Stopwatch()

  const charactersLocal = asRecord(INTERNAL.characters[INTERNAL.server])
  const exists: Record<string, boolean> = {}

  if (INTERNAL.CanSave()) {
    for (let i = 1; i <= GetNumCharacters(); i++) {
      const [name, , , , , , id] = GetCharacterInfo(i)
      if (charactersLocal[id] === undefined) {
        charactersLocal[id] = {}
      }
      const record = asCharacterRecord(charactersLocal[id])
      record.account = INTERNAL.userId
      record.name = zo_strformat("<<1>>", name)
      exists[id] = true
    }
  }

  for (const [id, data] of pairs(charactersLocal)) {
    const record = asCharacterRecord(data)
    if (
      (record.account === INTERNAL.userId && exists[asString(id)] === undefined) ||
      !INTERNAL.CanSave(record.account)
    ) {
      charactersLocal[asString(id)] = undefined
    }
  }

  INTERNAL.ScanKnowledge()

  EVENT_MANAGER.RegisterForEvent(
    INTERNAL.name,
    EVENT_MULTIPLE_RECIPES_LEARNED,
    INTERNAL.RefreshKnowledge
  )
  EVENT_MANAGER.RegisterForEvent(INTERNAL.name, EVENT_RECIPE_LEARNED, INTERNAL.RefreshKnowledge)
  EVENT_MANAGER.RegisterForEvent(INTERNAL.name, EVENT_STYLE_LEARNED, INTERNAL.RefreshKnowledge)
  EVENT_MANAGER.RegisterForEvent(
    INTERNAL.name,
    EVENT_CRAFTED_ABILITY_LOCK_STATE_CHANGED,
    function (
      this: void,
      _eventCode: number,
      _a: unknown,
      _b: unknown,
      isFromInit: unknown
    ): undefined {
      if (isFromInit !== true) {
        INTERNAL.RefreshKnowledge()
      }
    }
  )
  EVENT_MANAGER.RegisterForEvent(
    INTERNAL.name,
    EVENT_CRAFTED_ABILITY_SCRIPT_LOCK_STATE_CHANGED,
    INTERNAL.RefreshKnowledge
  )
  EVENT_MANAGER.RegisterForEvent(
    INTERNAL.name,
    EVENT_SMITHING_TRAIT_RESEARCH_CANCELED,
    INTERNAL.RefreshKnowledge
  )
  EVENT_MANAGER.RegisterForEvent(
    INTERNAL.name,
    EVENT_SMITHING_TRAIT_RESEARCH_COMPLETED,
    INTERNAL.RefreshKnowledge
  )
  EVENT_MANAGER.RegisterForEvent(
    INTERNAL.name,
    EVENT_SMITHING_TRAIT_RESEARCH_STARTED,
    INTERNAL.RefreshKnowledge
  )
  EVENT_MANAGER.RegisterForEvent(
    INTERNAL.name,
    EVENT_SMITHING_TRAIT_RESEARCH_TIMES_UPDATED,
    INTERNAL.RefreshKnowledge
  )
  EVENT_MANAGER.RegisterForEvent(
    INTERNAL.name,
    EVENT_SKILL_RESPEC_RESULT,
    function (this: void, _eventCode: number, result: unknown): undefined {
      if (result === RESPEC_RESULT_SUCCESS && INTERNAL.ResearchCheckPassives()) {
        INTERNAL.RefreshKnowledge()
      }
    }
  )
  EVENT_MANAGER.RegisterForEvent(
    INTERNAL.name,
    EVENT_ARMORY_BUILD_RESTORE_RESPONSE,
    function (this: void, _eventCode: number, result: unknown): undefined {
      if (result === ARMORY_BUILD_RESTORE_RESULT_SUCCESS && INTERNAL.ResearchCheckPassives()) {
        INTERNAL.RefreshKnowledge()
      }
    }
  )
}

INTERNAL.RefreshKnowledge = function (this: void): undefined {
  EVENT_MANAGER.UnregisterForUpdate(INTERNAL.name)
  EVENT_MANAGER.RegisterForUpdate(
    INTERNAL.name,
    INTERNAL.scanThrottle,
    INTERNAL.ScanKnowledge,
    true
  )
}
