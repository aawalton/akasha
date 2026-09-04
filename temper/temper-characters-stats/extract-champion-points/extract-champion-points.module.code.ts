import {
  type ChampionPointSource,
  championPoints,
} from "@akasha/temper-champion-points/champion-point-source"
import type { PipelineStage } from "../pipeline-types/pipeline-types.module.code.ts"

export function getCPSkillDisplayName(championPointId: string): string {
  const source = championPoints.has(championPointId)
    ? championPoints.data[championPointId]
    : undefined
  return source?.name ?? "Unknown"
}

export function getCPSkillDescription(championPointId: string): string {
  const source = championPoints.has(championPointId)
    ? championPoints.data[championPointId]
    : undefined
  return source?.description ?? ""
}

export const extractChampionPoints: PipelineStage = (build, _context) => {
  const sources: ChampionPointSource[] = []

  const slottedIds = new Set([
    ...build.championPoints.warfare.slotted,
    ...build.championPoints.fitness.slotted,
    ...build.championPoints.craft.slotted,
  ])

  const allSkillIds = new Set([
    ...build.championPoints.warfare.passive,
    ...build.championPoints.fitness.passive,
    ...build.championPoints.craft.passive,
    ...slottedIds,
  ])

  for (const championPointId of allSkillIds) {
    if (championPointId.startsWith("no-")) {
      continue
    }
    const source = championPoints.data[championPointId]
    if (source) {
      if (source.isSlottable && !slottedIds.has(championPointId)) {
        continue
      }
      sources.push(source)
    }
  }

  return sources
}
