import type { SkillPointProgress } from "@akasha/temper-completion/completion-progress"
import {
  ENDLESS_ARCHIVE,
  GROUP_DUNGEONS,
  MAEL_ACHIEVEMENT,
  MAIN_QUESTS,
  PUBLIC_DUNGEONS,
  RAW_ZONES,
  TUTORIALS,
  ZONE_IDS,
} from "@akasha/temper-skill-point-finder/sources"
import { requireFirst } from "@akasha/utils-narrow/require-first"
import { currentCharacterEntry } from "../characters-current-entry/characters-current-entry.module.code.ts"

const FOLIUM_QUEST = 3997

export function getTotalSkillPoints(): number {
  let total = SKILL_POINT_ALLOCATION_MANAGER.GetAvailableSkillPoints()
  for (const [, skillTypeData] of SKILLS_DATA_MANAGER.SkillTypeIterator()) {
    for (const [, skillLineData] of skillTypeData.SkillLineIterator()) {
      total += SKILL_POINT_ALLOCATION_MANAGER.GetNumPointsAllocatedInSkillLine(skillLineData)
    }
  }
  return total
}

export function isQuestComplete(questId: number): boolean {
  const [name] = GetCompletedQuestInfo(questId)
  return name !== ""
}

export function updateSkillPoints(): undefined {
  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return

  charEntry.skillPoints = computeSkillPoints()
}

export function computeSkillPoints(): SkillPointProgress {
  const level = GetUnitLevel("player")
  const levelPoints = math.floor(level / 5) + math.floor(level / 10) + (level - 1)

  let mainQuests = 0
  for (const questId of MAIN_QUESTS) {
    if (isQuestComplete(questId)) mainQuests++
  }

  let tutorial = 0
  for (const [, questId] of Object.entries(TUTORIALS)) {
    if (isQuestComplete(questId)) {
      tutorial = 1
      break
    }
  }

  const endlessArchive = isQuestComplete(requireFirst(ENDLESS_ARCHIVE, "ENDLESS_ARCHIVE")) ? 1 : 0

  const zoneQuests: Record<string, number> = {}
  let zoneQuestTotal = 0
  for (const zone of RAW_ZONES) {
    let count = 0
    for (const questId of zone.quests) {
      if (isQuestComplete(questId)) count++
    }
    zoneQuests[zone.key] = count
    zoneQuestTotal += count
  }

  const groupDungeons: Record<string, number> = {}
  let groupDungeonTotal = 0
  for (const dungeon of GROUP_DUNGEONS) {
    const completed = isQuestComplete(dungeon.quest) ? 1 : 0
    groupDungeons[dungeon.key] = completed
    groupDungeonTotal += completed
  }

  const publicDungeons: Record<string, number> = {}
  let publicDungeonTotal = 0
  for (const dungeon of PUBLIC_DUNGEONS) {
    const completed = IsAchievementComplete(dungeon.achievement) ? 1 : 0
    publicDungeons[dungeon.key] = completed
    publicDungeonTotal += completed
  }

  const skyshards: Record<string, number> = {}
  let totalSkyshards = 0
  for (const zone of RAW_ZONES) {
    const zoneId = ZONE_IDS[zone.key]
    if (zoneId === undefined) continue
    const numSkyshards = GetNumSkyshardsInZone(zoneId)
    let count = 0
    for (let i = 1; i <= numSkyshards; i++) {
      const ssId = GetZoneSkyshardId(zoneId, i)
      if (GetSkyshardDiscoveryStatus(ssId) === SKYSHARD_DISCOVERY_STATUS_ACQUIRED) {
        count++
      }
    }
    skyshards[zone.key] = count
    totalSkyshards += count
  }

  if (
    (skyshards.WP === undefined || skyshards.WP === 0) &&
    isQuestComplete(requireFirst(MAIN_QUESTS, "MAIN_QUESTS"))
  ) {
    skyshards.WP = 1
    totalSkyshards++
  }

  const skyshardPoints = math.floor(totalSkyshards / 3)

  const [pvpRank = 0] = GetUnitAvARank("player")

  const maelstromArena = IsAchievementComplete(MAEL_ACHIEVEMENT) ? 1 : 0

  const unassigned = GetAvailableSkillPoints()

  const countedSkillPoints =
    levelPoints +
    mainQuests +
    tutorial +
    pvpRank +
    maelstromArena +
    endlessArchive +
    zoneQuestTotal +
    skyshardPoints +
    groupDungeonTotal +
    publicDungeonTotal
  const actualTotal = getTotalSkillPoints()

  let foliumDiscognitum = 0
  if (isQuestComplete(FOLIUM_QUEST)) {
    foliumDiscognitum = actualTotal - countedSkillPoints >= 2 ? 2 : 0
  }

  if (tutorial === 0 && actualTotal - countedSkillPoints - foliumDiscognitum > 0) {
    tutorial = 1
  }

  const generalTotal =
    levelPoints +
    mainQuests +
    foliumDiscognitum +
    tutorial +
    pvpRank +
    maelstromArena +
    endlessArchive

  const total =
    generalTotal + zoneQuestTotal + skyshardPoints + groupDungeonTotal + publicDungeonTotal

  return {
    total,
    unassigned,
    level: levelPoints,
    mainQuests,
    tutorial,
    foliumDiscognitum,
    pvpRank,
    maelstromArena,
    endlessArchive,
    skyshardPoints,
    totalSkyshards,
    zoneQuestTotal,
    groupDungeonTotal,
    publicDungeonTotal,
    skyshards,
    zoneQuests,
    groupDungeons,
    publicDungeons,
  }
}
