import { curses } from "@akasha/temper-character-sources/curses"
import { vampireStages } from "@akasha/temper-character-sources/vampire-stages"
export function generateCurseMappings(): string {
  const curseEntries: string[] = []
  for (const curse of curses.list) {
    for (const abilityId of curse.esoCurseIds) {
      curseEntries.push(`  [${abilityId}]: "${curse.id}", // ${curse.name}`)
    }
  }

  const stageEntries: string[] = []
  for (const stage of vampireStages.list) {
    if (stage.esoVampireStageId === 0) continue
    stageEntries.push(`  [${stage.esoVampireStageId}]: "${stage.id}", // ${stage.name}`)
  }

  const stageIndexEntries: string[] = []
  for (const [i, id] of vampireStages.ids.entries()) {
    const stage = vampireStages.data[id]
    if (stage === undefined) continue
    if (stage.esoVampireStageId === 0) continue
    stageIndexEntries.push(`  [${stage.esoVampireStageId}]: ${i}, // ${stage.name}`)
  }

  const curseIndexEntries: string[] = []
  for (const [i, id] of curses.ids.entries()) {
    const curse = curses.data[id]
    if (curse === undefined) continue
    curseIndexEntries.push(`  "${curse.id}": ${i}, // ${curse.name}`)
  }

  return `\
/**
 * Curse Mappings (Generated)
 *
 * Maps ESO buff ability IDs to temper curse state and vampire stage IDs.
 * Source: engine/character/curse-data.ts, engine/character/vampire-stages-data.ts
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

export const CURSE_ABILITY_ID_TO_TEMPER_ID: Record<number, string> = {
${curseEntries.join("\n")}
}

export const VAMPIRE_STAGE_ABILITY_ID_TO_TEMPER_ID: Record<number, string> = {
${stageEntries.join("\n")}
}

export const VAMPIRE_STAGE_ABILITY_ID_TO_INDEX: Record<number, number> = {
${stageIndexEntries.join("\n")}
}

export const CURSE_TEMPER_ID_TO_INDEX: Record<string, number> = {
${curseIndexEntries.join("\n")}
}

export function getCurseTemperId(abilityId: number): string | undefined {
  return CURSE_ABILITY_ID_TO_TEMPER_ID[abilityId]
}

export function getVampireStageTemperId(abilityId: number): string | undefined {
  return VAMPIRE_STAGE_ABILITY_ID_TO_TEMPER_ID[abilityId]
}

export function getVampireStageIndex(abilityId: number): number {
  return VAMPIRE_STAGE_ABILITY_ID_TO_INDEX[abilityId] ?? 0
}

export function getCurseIndex(temperId: string): number {
  return CURSE_TEMPER_ID_TO_INDEX[temperId] ?? 0
}
`
}
