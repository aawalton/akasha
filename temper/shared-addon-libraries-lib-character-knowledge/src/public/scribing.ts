import { asString } from "../casts"
import { Internal, Public } from "../internal/state"

type IdsByLuaIndex = Record<number, number | undefined>
function asIdsByLuaIndex(value: number[]): IdsByLuaIndex {
  return value as IdsByLuaIndex
}

type ScriptIdArg = number
function asScriptIdArg(value: number | undefined): ScriptIdArg {
  return value as ScriptIdArg
}

Public.IsCraftedAbilityUnlockedByCharacter = function (
  this: void,
  craftedAbilityId,
  server?,
  charId?
) {
  return Internal.ScribingGetKnowledge(
    asString(server),
    asString(charId),
    Internal.SCRIBE_GRIMOIRE,
    craftedAbilityId
  )
}

Public.IsCraftedAbilityScriptUnlockedByCharacter = function (
  this: void,
  craftedAbilityScriptId,
  server?,
  charId?
) {
  return Internal.ScribingGetKnowledge(
    asString(server),
    asString(charId),
    Internal.SCRIBE_SCRIPT,
    craftedAbilityScriptId
  )
}

Public.GetMaxCraftedAbilityId = function (this: void): number {
  const maxId = Internal.maxIds[Internal.SCRIBE_GRIMOIRE]
  return maxId !== undefined ? maxId : GetNumCraftedAbilities()
}

Public.GetMaxCraftedAbilityScriptId = function (this: void): number {
  return Internal.maxIds[Internal.SCRIBE_SCRIPT] ?? 0
}

Public.GetItemForCraftedAbility = function (this: void, craftedAbilityId): number {
  const ids = Internal.ids[Internal.SCRIBE_GRIMOIRE]
  if (ids === undefined) {
    return 0
  }
  return asIdsByLuaIndex(ids)[craftedAbilityId] ?? 0
}

Public.GetItemForCraftedAbilityScript = function (this: void, craftedAbilityScriptId): number {
  const ids = Internal.ids[Internal.SCRIBE_SCRIPT]
  if (ids === undefined) {
    return 0
  }
  return asIdsByLuaIndex(ids)[craftedAbilityScriptId] ?? 0
}

Public.GetCraftedAbilityScriptDescriptions = function (
  this: void,
  craftedAbilityScriptId
): unknown[] {
  const results: Array<[string, string, number]> = []

  const slot = GetCraftedAbilityScriptScribingSlot(craftedAbilityScriptId)
  if (slot !== SCRIBING_SLOT_NONE) {
    function param(this: void, pos: number): number | undefined {
      return pos === slot ? craftedAbilityScriptId : undefined
    }

    for (let id = 1; id <= Public.GetMaxCraftedAbilityId(); id++) {
      if (IsCraftedAbilityScriptCompatibleWithSelections(craftedAbilityScriptId, id)) {
        ResetCraftedAbilityScriptSelectionOverride()
        SetCraftedAbilityScriptSelectionOverride(
          id,
          asScriptIdArg(param(1)),
          asScriptIdArg(param(2)),
          asScriptIdArg(param(3))
        )
        results.push([
          zo_strformat(SI_CRAFTED_ABILITY_NAME_FORMATTER, GetCraftedAbilityDisplayName(id)),
          GetCraftedAbilityScriptDescription(id, craftedAbilityScriptId),
          id,
        ])
      }
    }
    table.sort(results, (a: [string, string, number], b: [string, string, number]): boolean => {
      return a[0] < b[0]
    })
  }

  return results
}
