import { LORE_LIBRARY_DATA } from "@akasha/temper-completion/lore-library-data"
import { getEsoDateString } from "@akasha/temper-formula-framework/eso-date"
import { skillLines } from "@akasha/temper-skill-lines/skill-lines"
import { SKILL_MORPHS_CHECKER } from "@akasha/temper-skill-morphs-access/skill-morphs-checker"
import type { CompletionCardChecker } from "../completion-card-checker-types/completion-card-checker-types.module.code.ts"
import type { CharacterCardId } from "../completion-card-registry/completion-card-registry.module.code.ts"
import { isLoreLibraryItemComplete } from "../completion-lore-library-progress/completion-lore-library-progress.module.code.ts"
import { isMountTrainingPathComplete } from "../completion-mount-training-completeness/completion-mount-training-completeness.module.code.ts"
import { resolveSkillPointItemProgress } from "../completion-skill-points-progress/completion-skill-points-progress.module.code.ts"
import { SKILL_POINT_GENERAL_SOURCES } from "../skill-point-general-sources/skill-point-general-sources.module.code.ts"
import { SKILL_POINT_GROUP_DUNGEON_SOURCES } from "../skill-point-group-dungeons/skill-point-group-dungeons.module.code.ts"
import { SKILL_POINT_PUBLIC_DUNGEON_SOURCES } from "../skill-point-public-dungeons/skill-point-public-dungeons.module.code.ts"
import { SKILL_POINT_ZONE_SOURCES } from "../skill-point-zone-sources/skill-point-zone-sources.module.code.ts"

const DAILY_WRIT_TOTAL = 7

export const COMPLETION_CARD_CHECKERS: Partial<Record<CharacterCardId, CompletionCardChecker>> = {
  "mount-training": {
    isCardComplete(completion) {
      if (!completion) return false
      return isMountTrainingPathComplete(completion.mountTraining)
    },
    isItemComplete(completion, itemPath) {
      if (!completion || itemPath.length === 0) return false
      return isMountTrainingPathComplete(completion.mountTraining, itemPath)
    },
    getItemPickerLevels(_completions, currentPath) {
      if (currentPath.length >= 1) return null
      return {
        label: "Stat",
        options: [
          { value: "speed", label: "Speed" },
          { value: "stamina", label: "Stamina" },
          { value: "carryCapacity", label: "Carrying Capacity" },
        ],
      }
    },
  },

  "lore-library-character": {
    isCardComplete(_completion) {
      return false
    },
    isItemComplete(completion, itemPath) {
      return isLoreLibraryItemComplete(completion, itemPath)
    },
    getItemPickerLevels(_completions, currentPath) {
      if (currentPath.length === 0) {
        return {
          label: "Category",
          options: LORE_LIBRARY_DATA.map((category) => ({
            value: category.categoryIndex,
            label: category.name,
          })),
        }
      }

      if (currentPath.length === 1) {
        const categoryIndex = Number(currentPath[0])
        const category = LORE_LIBRARY_DATA.find((entry) => entry.categoryIndex === categoryIndex)
        if (!category) return null
        return {
          label: "Collection",
          options: category.collections.map((collection) => ({
            value: collection.collectionIndex,
            label: collection.name,
          })),
        }
      }

      return null
    },
  },

  "skill-lines": {
    isCardComplete(completion) {
      if (!completion) return false
      const progress = completion.skillLineProgress
      if (!progress) return false
      const entries = Object.values(progress)
      if (entries.length === 0) return false
      return entries.every((line) => line.nextRankXP === 0 && line.currentRank > 0)
    },
    isItemComplete(completion, itemPath) {
      if (!completion || itemPath.length === 0) return false
      const progress = completion.skillLineProgress
      if (!progress) return false
      const lineId = Number(itemPath[0])
      const line = progress[lineId]
      if (!line) return false
      if (line.nextRankXP === 0 && line.currentRank > 0) return true
      const staticLine = skillLines.list.find((entry) => entry.esoSkillLineId === lineId)
      return staticLine != null && staticLine.maxRank > 0 && line.currentRank >= staticLine.maxRank
    },
    getItemPickerLevels(completions, currentPath) {
      if (currentPath.length >= 1) return null
      const lineIds = new Set<number>()
      for (const completion of completions) {
        if (!completion.skillLineProgress) continue
        for (const id of Object.keys(completion.skillLineProgress)) lineIds.add(Number(id))
      }
      if (lineIds.size === 0) return null
      const options: { value: number; label: string }[] = []
      for (const esoId of lineIds) {
        const line = skillLines.list.find((entry) => entry.esoSkillLineId === esoId)
        options.push({ value: esoId, label: line?.name ?? `Skill Line ${esoId}` })
      }
      return { label: "Skill Line", options }
    },
  },

  "skill-morphs": SKILL_MORPHS_CHECKER,

  "skill-points": {
    isCardComplete(completion) {
      if (!completion) return false
      return completion.skillPoints?.unassigned === 0
    },
    isItemComplete(completion, itemPath) {
      if (!completion || itemPath.length === 0) return false
      const skillPoints = completion.skillPoints
      if (!skillPoints) return false
      const branch = String(itemPath[0])
      const rawSourceKey = itemPath[1]
      const sourceKey = rawSourceKey === undefined ? undefined : String(rawSourceKey)

      switch (branch) {
        case "general": {
          if (sourceKey !== undefined) {
            const source = SKILL_POINT_GENERAL_SOURCES.find((entry) => entry.key === sourceKey)
            if (!source) return false
            return (skillPoints[source.key] ?? 0) >= source.maxValue
          }
          return SKILL_POINT_GENERAL_SOURCES.every(
            (source) => (skillPoints[source.key] ?? 0) >= source.maxValue
          )
        }
        case "skyshards": {
          if (sourceKey !== undefined) {
            const zone = SKILL_POINT_ZONE_SOURCES.find((entry) => entry.key === sourceKey)
            if (!zone || zone.maxSkyshards === 0) return false
            return (skillPoints.skyshards[sourceKey] ?? 0) >= zone.maxSkyshards
          }
          return SKILL_POINT_ZONE_SOURCES.filter((zone) => zone.maxSkyshards > 0).every(
            (zone) => (skillPoints.skyshards[zone.key] ?? 0) >= zone.maxSkyshards
          )
        }
        case "zoneQuests": {
          if (sourceKey !== undefined) {
            const zone = SKILL_POINT_ZONE_SOURCES.find((entry) => entry.key === sourceKey)
            if (!zone || zone.maxQuests === 0) return false
            return (skillPoints.zoneQuests[sourceKey] ?? 0) >= zone.maxQuests
          }
          return SKILL_POINT_ZONE_SOURCES.filter((zone) => zone.maxQuests > 0).every(
            (zone) => (skillPoints.zoneQuests[zone.key] ?? 0) >= zone.maxQuests
          )
        }
        case "groupDungeons": {
          if (sourceKey !== undefined) return (skillPoints.groupDungeons[sourceKey] ?? 0) >= 1
          return SKILL_POINT_GROUP_DUNGEON_SOURCES.every(
            (dungeon) => (skillPoints.groupDungeons[dungeon.key] ?? 0) >= 1
          )
        }
        case "publicDungeons": {
          if (sourceKey !== undefined) return (skillPoints.publicDungeons[sourceKey] ?? 0) >= 1
          return SKILL_POINT_PUBLIC_DUNGEON_SOURCES.every(
            (dungeon) => (skillPoints.publicDungeons[dungeon.key] ?? 0) >= 1
          )
        }
        default:
          return false
      }
    },
    getItemProgress(completion, itemPath) {
      return resolveSkillPointItemProgress(completion?.skillPoints, itemPath)
    },
    getItemPickerLevels(_completions, currentPath) {
      if (currentPath.length === 0) {
        return {
          label: "Branch",
          options: [
            { value: "general", label: "General" },
            { value: "skyshards", label: "Skyshards" },
            { value: "zoneQuests", label: "Zone Quests" },
            { value: "groupDungeons", label: "Group Dungeons" },
            { value: "publicDungeons", label: "Public Dungeons" },
          ],
        }
      }

      if (currentPath.length === 1) {
        switch (String(currentPath[0])) {
          case "general":
            return {
              label: "Source",
              options: SKILL_POINT_GENERAL_SOURCES.map((source) => ({
                value: source.key,
                label: source.label,
              })),
            }
          case "skyshards":
            return {
              label: "Zone",
              options: SKILL_POINT_ZONE_SOURCES.filter((zone) => zone.maxSkyshards > 0).map(
                (zone) => ({ value: zone.key, label: zone.label })
              ),
            }
          case "zoneQuests":
            return {
              label: "Zone",
              options: SKILL_POINT_ZONE_SOURCES.filter((zone) => zone.maxQuests > 0).map(
                (zone) => ({ value: zone.key, label: zone.label })
              ),
            }
          case "groupDungeons":
            return {
              label: "Dungeon",
              options: SKILL_POINT_GROUP_DUNGEON_SOURCES.map((dungeon) => ({
                value: dungeon.key,
                label: dungeon.label,
              })),
            }
          case "publicDungeons":
            return {
              label: "Dungeon",
              options: SKILL_POINT_PUBLIC_DUNGEON_SOURCES.map((dungeon) => ({
                value: dungeon.key,
                label: dungeon.label,
              })),
            }
          default:
            return null
        }
      }

      return null
    },
  },

  "daily-writs": {
    isCardComplete(completion) {
      if (!completion) return false
      const dailyWrits = completion.dailyWrits
      if (!dailyWrits) return false
      if (dailyWrits.date !== getEsoDateString()) return false
      return dailyWrits.completed >= DAILY_WRIT_TOTAL
    },
    getItemProgress(completion) {
      const dailyWrits = completion?.dailyWrits
      if (!dailyWrits || dailyWrits.date !== getEsoDateString()) {
        return { current: 0, total: DAILY_WRIT_TOTAL }
      }
      return { current: dailyWrits.completed, total: DAILY_WRIT_TOTAL }
    },
  },

  "character-level": {
    isCardComplete(completion) {
      if (!completion) return false
      return (completion.level ?? 0) >= 50
    },
  },

  "pack-upgrades": {
    isCardComplete(completion) {
      if (!completion) return false
      return (completion.bagSize ?? 0) >= 210
    },
  },

  "alliance-rank": {
    isCardComplete(completion) {
      if (!completion) return false
      return (completion.allianceRank ?? 0) >= 50
    },
  },
}
