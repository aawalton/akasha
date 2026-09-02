import type {
  CharacterCompletion,
  SkillPointProgress,
} from "@akasha/temper-completion/completion-progress"
import type { AnyCompletionCardId } from "./completion-card-id"
import { skillPointGeneralSources, skillPointGroupDungeonSources, skillPointPublicDungeonSources, skillPointZoneSources } from "./generated/temper-skill-point.generated"

export interface CompletionOverride {
  completionCardId: AnyCompletionCardId
  completionItemPath: readonly (string | number)[]
  floor: number
}

type SkillPointCompletion = Pick<CharacterCompletion, "skillPoints">

export function applyCompletionOverrides<T extends SkillPointCompletion>(
  completion: T,
  overrides: readonly CompletionOverride[]
): T {
  let next = completion
  for (const override of overrides) {
    next = applyOneOverride(next, override)
  }
  return next
}

function applyOneOverride<T extends SkillPointCompletion>(
  completion: T,
  override: CompletionOverride
): T {
  if (override.completionCardId === "skill-points") {
    return applySkillPointsOverride(completion, override.completionItemPath, override.floor)
  }
  return completion
}

function emptySkillPointProgress(): SkillPointProgress {
  return {
    total: 0,
    unassigned: 0,
    level: 0,
    mainQuests: 0,
    tutorial: 0,
    foliumDiscognitum: 0,
    pvpRank: 0,
    maelstromArena: 0,
    endlessArchive: 0,
    skyshardPoints: 0,
    totalSkyshards: 0,
    zoneQuestTotal: 0,
    groupDungeonTotal: 0,
    publicDungeonTotal: 0,
    skyshards: {},
    zoneQuests: {},
    groupDungeons: {},
    publicDungeons: {},
  }
}

function applySkillPointsOverride<T extends SkillPointCompletion>(
  completion: T,
  itemPath: readonly (string | number)[],
  floor: number
): T {
  if (itemPath.length !== 2) return completion
  const branch = String(itemPath[0])
  const key = String(itemPath[1])
  const sp = completion.skillPoints ?? emptySkillPointProgress()

  switch (branch) {
    case "general": {
      const source = skillPointGeneralSources.find((s) => s.key === key)
      if (source === undefined) return completion
      const target = Math.min(floor, source.maxValue)
      if ((sp[source.key] ?? 0) >= target) return completion
      return { ...completion, skillPoints: { ...sp, [source.key]: target } }
    }
    case "skyshards": {
      const zone = skillPointZoneSources.find((z) => z.key === key)
      if (zone === undefined || zone.maxSkyshards === 0) return completion
      const target = Math.min(floor, zone.maxSkyshards)
      if ((sp.skyshards[key] ?? 0) >= target) return completion
      return {
        ...completion,
        skillPoints: { ...sp, skyshards: { ...sp.skyshards, [key]: target } },
      }
    }
    case "zoneQuests": {
      const zone = skillPointZoneSources.find((z) => z.key === key)
      if (zone === undefined || zone.maxQuests === 0) return completion
      const target = Math.min(floor, zone.maxQuests)
      if ((sp.zoneQuests[key] ?? 0) >= target) return completion
      return {
        ...completion,
        skillPoints: { ...sp, zoneQuests: { ...sp.zoneQuests, [key]: target } },
      }
    }
    case "groupDungeons": {
      const dungeon = skillPointGroupDungeonSources.find((d) => d.key === key)
      if (dungeon === undefined) return completion
      const target = Math.min(floor, 1)
      if ((sp.groupDungeons[key] ?? 0) >= target) return completion
      return {
        ...completion,
        skillPoints: { ...sp, groupDungeons: { ...sp.groupDungeons, [key]: target } },
      }
    }
    case "publicDungeons": {
      const dungeon = skillPointPublicDungeonSources.find((d) => d.key === key)
      if (dungeon === undefined) return completion
      const target = Math.min(floor, 1)
      if ((sp.publicDungeons[key] ?? 0) >= target) return completion
      return {
        ...completion,
        skillPoints: { ...sp, publicDungeons: { ...sp.publicDungeons, [key]: target } },
      }
    }
    default:
      return completion
  }
}
