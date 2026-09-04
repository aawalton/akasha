import type {
  CharacterCompletion,
  SkillPointProgress,
} from "@akasha/temper-completion/completion-progress"
import type { CompletionOverride } from "../completion-override/completion-override.module.code.ts"
import { SKILL_POINT_GENERAL_SOURCES } from "../skill-point-general-sources/skill-point-general-sources.module.code.ts"
import { SKILL_POINT_GROUP_DUNGEON_SOURCES } from "../skill-point-group-dungeons/skill-point-group-dungeons.module.code.ts"
import { SKILL_POINT_PUBLIC_DUNGEON_SOURCES } from "../skill-point-public-dungeons/skill-point-public-dungeons.module.code.ts"
import { SKILL_POINT_ZONE_SOURCES } from "../skill-point-zone-sources/skill-point-zone-sources.module.code.ts"

type SkillPointCompletion = Pick<CharacterCompletion, "skillPoints">

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
  atLeast: number
): T {
  if (itemPath.length !== 2) return completion
  const branch = String(itemPath[0])
  const key = String(itemPath[1])
  const sp = completion.skillPoints ?? emptySkillPointProgress()

  switch (branch) {
    case "general": {
      const source = SKILL_POINT_GENERAL_SOURCES.find((s) => s.key === key)
      if (source === undefined) return completion
      const target = Math.min(atLeast, source.maxValue)
      if ((sp[source.key] ?? 0) >= target) return completion
      return { ...completion, skillPoints: { ...sp, [source.key]: target } }
    }
    case "skyshards": {
      const zone = SKILL_POINT_ZONE_SOURCES.find((z) => z.key === key)
      if (zone === undefined || zone.maxSkyshards === 0) return completion
      const target = Math.min(atLeast, zone.maxSkyshards)
      if ((sp.skyshards[key] ?? 0) >= target) return completion
      return {
        ...completion,
        skillPoints: { ...sp, skyshards: { ...sp.skyshards, [key]: target } },
      }
    }
    case "zoneQuests": {
      const zone = SKILL_POINT_ZONE_SOURCES.find((z) => z.key === key)
      if (zone === undefined || zone.maxQuests === 0) return completion
      const target = Math.min(atLeast, zone.maxQuests)
      if ((sp.zoneQuests[key] ?? 0) >= target) return completion
      return {
        ...completion,
        skillPoints: { ...sp, zoneQuests: { ...sp.zoneQuests, [key]: target } },
      }
    }
    case "groupDungeons": {
      const dungeon = SKILL_POINT_GROUP_DUNGEON_SOURCES.find((d) => d.key === key)
      if (dungeon === undefined) return completion
      const target = Math.min(atLeast, 1)
      if ((sp.groupDungeons[key] ?? 0) >= target) return completion
      return {
        ...completion,
        skillPoints: { ...sp, groupDungeons: { ...sp.groupDungeons, [key]: target } },
      }
    }
    case "publicDungeons": {
      const dungeon = SKILL_POINT_PUBLIC_DUNGEON_SOURCES.find((d) => d.key === key)
      if (dungeon === undefined) return completion
      const target = Math.min(atLeast, 1)
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

function applyOneOverride<T extends SkillPointCompletion>(
  completion: T,
  override: CompletionOverride
): T {
  if (override.completionCardId === "skill-points") {
    return applySkillPointsOverride(completion, override.completionItemPath, override.floor)
  }
  return completion
}

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
