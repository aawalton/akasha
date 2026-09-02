import { skillLines } from "@akasha/temper-skill-lines/skill-lines"
import { skillMorphsChecker } from "@temper/game-characters-skills-morphs-access/skill-morphs-checker"
import type { CompletionCardChecker } from "./completion-card-checker-types"
import type { CharacterCardId } from "./completion-card-registry"
import { resolveSkillPointItemProgress } from "./completion-skill-points-progress"
import { skillPointGeneralSources, skillPointGroupDungeonSources, skillPointPublicDungeonSources, skillPointZoneSources } from "./generated/temper-skill-point.generated"

export const CHARACTER_SKILL_CHECKERS: Partial<Record<CharacterCardId, CompletionCardChecker>> = {
  "skill-lines": {
    isCardComplete(completion) {
      if (!completion) return false
      const slp = completion.skillLineProgress
      if (!slp) return false
      const entries = Object.values(slp)
      if (entries.length === 0) return false
      return entries.every((sl) => sl.nextRankXP === 0 && sl.currentRank > 0)
    },
    isItemComplete(completion, itemPath) {
      if (!completion || itemPath.length === 0) return false
      const slp = completion.skillLineProgress
      if (!slp) return false
      const lineId = Number(itemPath[0])
      const sl = slp[lineId]
      if (!sl) return false
      if (sl.nextRankXP === 0 && sl.currentRank > 0) return true
      const staticLine = skillLines.list.find((l) => l.esoSkillLineId === lineId)
      return staticLine != null && staticLine.maxRank > 0 && sl.currentRank >= staticLine.maxRank
    },
    getItemPickerLevels(completions, currentPath) {
      if (currentPath.length >= 1) return null
      const lineIds = new Set<number>()
      for (const c of completions) {
        if (!c.skillLineProgress) continue
        for (const id of Object.keys(c.skillLineProgress)) {
          lineIds.add(Number(id))
        }
      }
      if (lineIds.size === 0) return null
      const options: { value: number; label: string }[] = []
      for (const esoId of lineIds) {
        const line = skillLines.list.find((l) => l.esoSkillLineId === esoId)
        options.push({ value: esoId, label: line?.name ?? `Skill Line ${esoId}` })
      }
      return { label: "Skill Line", options }
    },
  },

  "skill-morphs": skillMorphsChecker,

  "skill-points": {
    isCardComplete(completion) {
      if (!completion) return false
      return completion.skillPoints?.unassigned === 0
    },
    isItemComplete(completion, itemPath) {
      if (!completion || itemPath.length === 0) return false
      const sp = completion.skillPoints
      if (!sp) return false
      const branch = String(itemPath[0])
      const rawSourceKey = itemPath[1]
      const sourceKey = rawSourceKey === undefined ? undefined : String(rawSourceKey)

      const generalValue = (key: string): number | undefined => {
        switch (key) {
          case "level":
            return sp.level
          case "mainQuests":
            return sp.mainQuests
          case "tutorial":
            return sp.tutorial
          case "foliumDiscognitum":
            return sp.foliumDiscognitum
          case "pvpRank":
            return sp.pvpRank
          case "maelstromArena":
            return sp.maelstromArena
          case "endlessArchive":
            return sp.endlessArchive
          default:
            return undefined
        }
      }

      switch (branch) {
        case "general": {
          if (sourceKey !== undefined) {
            const source = skillPointGeneralSources.find((s) => s.key === sourceKey)
            if (!source) return false
            return (generalValue(sourceKey) ?? 0) >= source.maxValue
          }
          return skillPointGeneralSources.every((s) => (generalValue(s.key) ?? 0) >= s.maxValue)
        }
        case "skyshards": {
          if (sourceKey !== undefined) {
            const zone = skillPointZoneSources.find((z) => z.key === sourceKey)
            if (!zone || zone.maxSkyshards === 0) return false
            return (sp.skyshards[sourceKey] ?? 0) >= zone.maxSkyshards
          }
          return skillPointZoneSources
            .filter((z) => z.maxSkyshards > 0)
            .every((z) => (sp.skyshards[z.key] ?? 0) >= z.maxSkyshards)
        }
        case "zoneQuests": {
          if (sourceKey !== undefined) {
            const zone = skillPointZoneSources.find((z) => z.key === sourceKey)
            if (!zone || zone.maxQuests === 0) return false
            return (sp.zoneQuests[sourceKey] ?? 0) >= zone.maxQuests
          }
          return skillPointZoneSources
            .filter((z) => z.maxQuests > 0)
            .every((z) => (sp.zoneQuests[z.key] ?? 0) >= z.maxQuests)
        }
        case "groupDungeons": {
          if (sourceKey !== undefined) {
            return (sp.groupDungeons[sourceKey] ?? 0) >= 1
          }
          return skillPointGroupDungeonSources.every((d) => (sp.groupDungeons[d.key] ?? 0) >= 1)
        }
        case "publicDungeons": {
          if (sourceKey !== undefined) {
            return (sp.publicDungeons[sourceKey] ?? 0) >= 1
          }
          return skillPointPublicDungeonSources.every((d) => (sp.publicDungeons[d.key] ?? 0) >= 1)
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
        const branch = String(currentPath[0])
        switch (branch) {
          case "general":
            return {
              label: "Source",
              options: skillPointGeneralSources.map((s) => ({ value: s.key, label: s.label })),
            }
          case "skyshards":
            return {
              label: "Zone",
              options: skillPointZoneSources
                .filter((z) => z.maxSkyshards > 0)
                .map((z) => ({ value: z.key, label: z.label })),
            }
          case "zoneQuests":
            return {
              label: "Zone",
              options: skillPointZoneSources
                .filter((z) => z.maxQuests > 0)
                .map((z) => ({ value: z.key, label: z.label })),
            }
          case "groupDungeons":
            return {
              label: "Dungeon",
              options: skillPointGroupDungeonSources.map((d) => ({ value: d.key, label: d.label })),
            }
          case "publicDungeons":
            return {
              label: "Dungeon",
              options: skillPointPublicDungeonSources.map((d) => ({
                value: d.key,
                label: d.label,
              })),
            }
          default:
            return null
        }
      }

      return null
    },
  },
}
