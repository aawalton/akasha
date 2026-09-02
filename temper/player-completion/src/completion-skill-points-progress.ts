import type { SkillPointProgress } from "@akasha/temper-completion/completion-progress"
import type { CompletionCharacterRow } from "./completion-character-row-type"
import { isCharacterMeasured } from "./completion-measured"
import type { CharacterSkillPointsProgress, SkillPointSourceProgress } from "./completion-ui-types"
import { skillPointGeneralSources, skillPointGroupDungeonSources, skillPointPublicDungeonSources, skillPointZoneSources } from "./generated/temper-skill-point.generated"

function buildGeneralProgress(sp: SkillPointProgress): readonly SkillPointSourceProgress[] {
  return skillPointGeneralSources.map((source) => ({
    key: source.key,
    label: source.label,
    count: sp[source.key] ?? 0,
    total: source.maxValue,
  }))
}

function buildSkyshardsProgress(sp: SkillPointProgress): readonly SkillPointSourceProgress[] {
  return skillPointZoneSources
    .filter((zone) => zone.maxSkyshards > 0)
    .map((zone) => ({
      key: zone.key,
      label: zone.label,
      count: sp.skyshards[zone.key] ?? 0,
      total: zone.maxSkyshards,
    }))
}

function buildZoneQuestsProgress(sp: SkillPointProgress): readonly SkillPointSourceProgress[] {
  return skillPointZoneSources
    .filter((zone) => zone.maxQuests > 0)
    .map((zone) => ({
      key: zone.key,
      label: zone.label,
      count: sp.zoneQuests[zone.key] ?? 0,
      total: zone.maxQuests,
    }))
}

function buildGroupDungeonsProgress(sp: SkillPointProgress): readonly SkillPointSourceProgress[] {
  return skillPointGroupDungeonSources.map((dungeon) => ({
    key: dungeon.key,
    label: dungeon.label,
    count: sp.groupDungeons[dungeon.key] ?? 0,
    total: 1,
  }))
}

function buildPublicDungeonsProgress(sp: SkillPointProgress): readonly SkillPointSourceProgress[] {
  return skillPointPublicDungeonSources.map((dungeon) => ({
    key: dungeon.key,
    label: dungeon.label,
    count: sp.publicDungeons[dungeon.key] ?? 0,
    total: 1,
  }))
}

function sumProgress(entries: readonly SkillPointSourceProgress[]): {
  count: number
  total: number
} {
  let count = 0
  let total = 0
  for (const e of entries) {
    count += e.count
    total += e.total
  }
  return { count, total }
}

export function resolveSkillPointItemProgress(
  sp: SkillPointProgress | null | undefined,
  itemPath: readonly (string | number)[]
): { current: number; total: number } | undefined {
  if (itemPath.length !== 2) return undefined
  const branch = String(itemPath[0])
  const key = String(itemPath[1])

  switch (branch) {
    case "general": {
      const source = skillPointGeneralSources.find((s) => s.key === key)
      if (!source) return undefined
      return { current: sp ? (sp[source.key] ?? 0) : 0, total: source.maxValue }
    }
    case "skyshards": {
      const zone = skillPointZoneSources.find((z) => z.key === key)
      if (!zone || zone.maxSkyshards === 0) return undefined
      return { current: sp ? (sp.skyshards[key] ?? 0) : 0, total: zone.maxSkyshards }
    }
    case "zoneQuests": {
      const zone = skillPointZoneSources.find((z) => z.key === key)
      if (!zone || zone.maxQuests === 0) return undefined
      return { current: sp ? (sp.zoneQuests[key] ?? 0) : 0, total: zone.maxQuests }
    }
    case "groupDungeons": {
      const dungeon = skillPointGroupDungeonSources.find((d) => d.key === key)
      if (!dungeon) return undefined
      return { current: sp ? (sp.groupDungeons[key] ?? 0) : 0, total: 1 }
    }
    case "publicDungeons": {
      const dungeon = skillPointPublicDungeonSources.find((d) => d.key === key)
      if (!dungeon) return undefined
      return { current: sp ? (sp.publicDungeons[key] ?? 0) : 0, total: 1 }
    }
    default:
      return undefined
  }
}

export function transformSkillPointsProgress(
  rows: readonly CompletionCharacterRow[]
): readonly CharacterSkillPointsProgress[] {
  const result: CharacterSkillPointsProgress[] = []

  for (const row of rows) {
    const completion = row.completion
    if (!completion || !isCharacterMeasured(completion)) continue

    const sp = completion.skillPoints
    if (!sp) {
      const general = skillPointGeneralSources.map((s) => ({
        key: s.key,
        label: s.label,
        count: 0,
        total: s.maxValue,
      }))
      const skyshards = skillPointZoneSources
        .filter((z) => z.maxSkyshards > 0)
        .map((z) => ({ key: z.key, label: z.label, count: 0, total: z.maxSkyshards }))
      const zoneQuests = skillPointZoneSources
        .filter((z) => z.maxQuests > 0)
        .map((z) => ({ key: z.key, label: z.label, count: 0, total: z.maxQuests }))
      const groupDungeons = skillPointGroupDungeonSources.map((d) => ({
        key: d.key,
        label: d.label,
        count: 0,
        total: 1,
      }))
      const publicDungeons = skillPointPublicDungeonSources.map((d) => ({
        key: d.key,
        label: d.label,
        count: 0,
        total: 1,
      }))

      const totalCount =
        sumProgress(general).total +
        sumProgress(skyshards).total +
        sumProgress(zoneQuests).total +
        sumProgress(groupDungeons).total +
        sumProgress(publicDungeons).total

      result.push({
        characterId: row.id,
        general,
        skyshards,
        zoneQuests,
        groupDungeons,
        publicDungeons,
        completedCount: 0,
        totalCount,
      })
      continue
    }

    const general = buildGeneralProgress(sp)
    const skyshards = buildSkyshardsProgress(sp)
    const zoneQuests = buildZoneQuestsProgress(sp)
    const groupDungeons = buildGroupDungeonsProgress(sp)
    const publicDungeons = buildPublicDungeonsProgress(sp)

    const g = sumProgress(general)
    const s = sumProgress(skyshards)
    const zq = sumProgress(zoneQuests)
    const gd = sumProgress(groupDungeons)
    const pd = sumProgress(publicDungeons)

    result.push({
      characterId: row.id,
      general,
      skyshards,
      zoneQuests,
      groupDungeons,
      publicDungeons,
      completedCount: g.count + s.count + zq.count + gd.count + pd.count,
      totalCount: g.total + s.total + zq.total + gd.total + pd.total,
    })
  }

  return result
}
