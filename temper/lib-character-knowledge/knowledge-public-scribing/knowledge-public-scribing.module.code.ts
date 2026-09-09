import { asString } from "../knowledge-casts/knowledge-casts.module.code.ts"
import { INTERNAL, PUBLIC } from "../knowledge-state/knowledge-state.module.code.ts"

type IdsByLuaIndex = Record<number, number | undefined>
function asIdsByLuaIndex(value: number[]): IdsByLuaIndex {
  return value as IdsByLuaIndex
}

type ScriptIdArg = number
function asScriptIdArg(value: number | undefined): ScriptIdArg {
  return value as ScriptIdArg
}

PUBLIC.IsCraftedAbilityUnlockedByCharacter = function (
  this: void,
  craftedAbilityId,
  server?,
  charId?
) {
  return INTERNAL.ScribingGetKnowledge(
    asString(server),
    asString(charId),
    INTERNAL.SCRIBE_GRIMOIRE,
    craftedAbilityId
  )
}

PUBLIC.IsCraftedAbilityScriptUnlockedByCharacter = function (
  this: void,
  craftedAbilityScriptId,
  server?,
  charId?
) {
  return INTERNAL.ScribingGetKnowledge(
    asString(server),
    asString(charId),
    INTERNAL.SCRIBE_SCRIPT,
    craftedAbilityScriptId
  )
}

PUBLIC.GetMaxCraftedAbilityId = function (this: void): number {
  const maxId = INTERNAL.maxIds[INTERNAL.SCRIBE_GRIMOIRE]
  return maxId !== undefined ? maxId : GetNumCraftedAbilities()
}

PUBLIC.GetMaxCraftedAbilityScriptId = function (this: void): number {
  return INTERNAL.maxIds[INTERNAL.SCRIBE_SCRIPT] ?? 0
}

PUBLIC.GetItemForCraftedAbility = function (this: void, craftedAbilityId): number {
  const ids = INTERNAL.ids[INTERNAL.SCRIBE_GRIMOIRE]
  if (ids === undefined) {
    return 0
  }
  return asIdsByLuaIndex(ids)[craftedAbilityId] ?? 0
}

PUBLIC.GetItemForCraftedAbilityScript = function (this: void, craftedAbilityScriptId): number {
  const ids = INTERNAL.ids[INTERNAL.SCRIBE_SCRIPT]
  if (ids === undefined) {
    return 0
  }
  return asIdsByLuaIndex(ids)[craftedAbilityScriptId] ?? 0
}

PUBLIC.GetCraftedAbilityScriptDescriptions = function (
  this: void,
  craftedAbilityScriptId
): unknown[] {
  const results: Array<[string, string, number]> = []

  const slot = GetCraftedAbilityScriptScribingSlot(craftedAbilityScriptId)
  if (slot !== SCRIBING_SLOT_NONE) {
    function param(this: void, pos: number): number | undefined {
      return pos === slot ? craftedAbilityScriptId : undefined
    }

    for (let id = 1; id <= PUBLIC.GetMaxCraftedAbilityId(); id++) {
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
