import {
  colorCompletion,
  formatQuestName,
} from "../skill-point-finder-colors/skill-point-finder-colors.module.code.ts"
import { GAME_DATA } from "../skill-point-finder-game-data/skill-point-finder-game-data.module.code.ts"
import { questCompleted } from "../skill-point-finder-helpers/skill-point-finder-helpers.module.code.ts"
import {
  requirePtsTots,
  requireSVar,
  STATE,
} from "../skill-point-finder-state/skill-point-finder-state.module.code.ts"
import type { ZoneData } from "../skill-point-finder-types/skill-point-finder-types.module.code.ts"
import type {
  GroupDungeonEntry,
  PublicDungeonEntry,
} from "../skill-point-sources/skill-point-sources.module.code.ts"

function progressVsTotal(this: void, points: number | string, total: number): string {
  const complete = typeof points === "number" && points >= total
  return colorCompletion(`${points}/${total}`, complete)
}

function getQuestTooltipText(this: void, questIds: number[]): string {
  if (questIds.length === 0) {
    return GetString(USPF_QUEST_NONE)
  }
  const quests: string[] = []
  const isCurrentCharacter = GetCurrentCharacterId() === STATE.selectedChar
  for (const questId of questIds) {
    const questName = GetQuestName(questId)
    const earned = questCompleted(questId)
    quests.push(formatQuestName(questName, isCurrentCharacter && earned))
  }
  return quests.join("\n")
}

export function getMainQuestTooltip(this: void): string {
  const sVar = requireSVar()
  const tots = requirePtsTots()
  const quests: string[] = [`${getQuestTooltipText(GAME_DATA.MQ)}\n`]
  for (const char of STATE.charData) {
    const charPointsData = sVar.ptsData[char.charId]
    const questPoints: number | string = charPointsData?.MainQ ?? "?"
    quests.push(`${progressVsTotal(questPoints, tots.MainQ)}  ${char.charName}`)
  }
  return quests.join("\n")
}

export function getZoneTooltipText(this: void, zone: ZoneData): string {
  const sVar = requireSVar()
  const quests: string[] = [`${getQuestTooltipText(zone.quests)}\n`]
  for (const char of STATE.charData) {
    const charPointsData = sVar.ptsData[char.charId]
    const questPoints: number | string = charPointsData?.ZQ[zone.key] ?? "?"
    const questTotal = zone.quests.length
    const skyShardPoints: number | string = charPointsData?.SS[zone.key] ?? "?"
    const txt = questTotal !== 0 ? `${progressVsTotal(questPoints, questTotal)}  ` : ""
    quests.push(`${txt}${progressVsTotal(skyShardPoints, zone.skyshards)}  ${char.charName}`)
  }
  return quests.join("\n")
}

export function getGDQuestTooltipText(this: void, dungeon: GroupDungeonEntry): string {
  const questName = GetQuestName(dungeon.quest)
  const completedHere =
    STATE.selectedChar === GetCurrentCharacterId() && questCompleted(dungeon.quest)
  const list: string[] = [`${formatQuestName(questName, completedHere)}\n`]
  const sVar = requireSVar()
  for (const char of STATE.charData) {
    const val = sVar.ptsData[char.charId]?.GD[dungeon.key]
    list.push(colorCompletion(char.charName, val === 1))
  }
  return list.join("\n")
}

function getAchLink(this: void, achId: number): string {
  return GetAchievementLink(achId, LINK_TYPE_ACHIEVEMENT)
}

export function getPDTooltipText(this: void, pdung: PublicDungeonEntry): string {
  const list: string[] = [`${getAchLink(pdung.achievement)}\n`]
  const sVar = requireSVar()
  for (const char of STATE.charData) {
    const val = sVar.ptsData[char.charId]?.PD[pdung.key]
    list.push(colorCompletion(char.charName, val === 1))
  }
  return list.join("\n")
}

export function getTooltipCharacterTotal(this: void): string {
  const sVar = requireSVar()
  const tots = requirePtsTots()
  const list: string[] = []
  for (const char of STATE.charData) {
    const cp = sVar.ptsData[char.charId]
    const total = cp?.Tot ?? 0
    const unassigned: number | string = cp?.Unassigned ?? "?"
    list.push(`${colorCompletion(total, total === tots.Tot)}  (${unassigned})  ${char.charName}`)
  }
  return list.join("\n")
}

export function getTooltipPDTotal(this: void): string {
  const sVar = requireSVar()
  const tots = requirePtsTots()
  const list: string[] = []
  for (const char of STATE.charData) {
    const total = sVar.ptsData[char.charId]?.PDTot ?? 0
    list.push(`${colorCompletion(total, total === tots.PDTot)}  ${char.charName}`)
  }
  return list.join("\n")
}

export function getTooltipZoneTotal(this: void): string {
  const sVar = requireSVar()
  const tots = requirePtsTots()
  const list: string[] = []
  for (const char of STATE.charData) {
    const cp = sVar.ptsData[char.charId]
    const questTotal = cp?.ZQTot ?? 0
    const skyShardTotal = cp?.SSTot ?? 0
    list.push(
      `${colorCompletion(questTotal, questTotal === tots.ZQTot)}  ` +
        `${colorCompletion(skyShardTotal, skyShardTotal === tots.SSTot)}  ${char.charName}`
    )
  }
  return list.join("\n")
}

export function getTooltipGDTotal(this: void): string {
  const sVar = requireSVar()
  const tots = requirePtsTots()
  const list: string[] = []
  for (const char of STATE.charData) {
    const dungeonTotal = sVar.ptsData[char.charId]?.GDTot ?? 0
    list.push(`${colorCompletion(dungeonTotal, dungeonTotal === tots.GDTot)}  ${char.charName}`)
  }
  return list.join("\n")
}

export function getTooltipPvPRank(this: void): string {
  const sVar = requireSVar()
  const tots = requirePtsTots()
  const list: string[] = []
  for (const char of STATE.charData) {
    const val = sVar.ptsData[char.charId]?.PvPRank ?? 0
    list.push(`${colorCompletion(val, val === tots.PvPRank)}  ${char.charName}`)
  }
  return list.join("\n")
}

export function getTooltipMaelstrom(this: void): string {
  const sVar = requireSVar()
  const list: string[] = []
  for (const char of STATE.charData) {
    const val = sVar.ptsData[char.charId]?.MaelAr ?? 0
    list.push(`${colorCompletion(val, val === 1)}  ${char.charName}`)
  }
  return list.join("\n")
}

export function getTooltipEndlessArchive(this: void): string {
  const sVar = requireSVar()
  const list: string[] = [`${getQuestTooltipText(GAME_DATA.EA)}\n`]
  for (const char of STATE.charData) {
    const val = sVar.ptsData[char.charId]?.EndlArch ?? 0
    list.push(`${colorCompletion(val, val === 1)}  ${char.charName}`)
  }
  return list.join("\n")
}

export function getZoneName(this: void, zoneKey: string): string {
  return zo_strformat("<<C:1>>", GetZoneNameById(GAME_DATA.ZId.ZN[zoneKey] ?? 0))
}
