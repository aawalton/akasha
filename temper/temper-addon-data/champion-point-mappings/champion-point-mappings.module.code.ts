import { championPoints } from "@akasha/temper-champion-points/champion-point-source"
export function generateChampionPointMappings(): string {
  const indexEntries: string[] = []
  const temperIdEntries: string[] = []
  for (const [i, id] of championPoints.ids.entries()) {
    const cp = championPoints.data[id]
    if (cp === undefined) continue
    if (cp.esoChampionSkillId === 0) continue
    indexEntries.push(`  [${cp.esoChampionSkillId}]: ${i}, // ${cp.name}`)
    temperIdEntries.push(`  [${cp.esoChampionSkillId}]: "${cp.id}", // ${cp.name}`)
  }

  return `\
/**
 * Champion Point Mappings (Generated)
 *
 * Maps ESO champion skill IDs to temper indices and string IDs.
 * Source: engine/champion-points/champion-points-source.ts
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

export const CP_ESO_SKILL_ID_TO_INDEX: Record<number, number> = {
${indexEntries.join("\n")}
}

export const CP_ESO_SKILL_ID_TO_TEMPER_ID: Record<number, string> = {
${temperIdEntries.join("\n")}
}

export function getChampionPointIndex(esoSkillId: number): number {
  return CP_ESO_SKILL_ID_TO_INDEX[esoSkillId] ?? -1
}

export function getChampionPointTemperId(esoSkillId: number): string {
  return CP_ESO_SKILL_ID_TO_TEMPER_ID[esoSkillId] ?? "no-warfare-star"
}
`
}
