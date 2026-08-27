/**
 * Curse Mappings (Generated)
 *
 * Maps ESO buff ability IDs to temper curse state and vampire stage IDs.
 * Source: engine/character/curse-data.ts, engine/character/vampire-stages-data.ts
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

export const CURSE_ABILITY_ID_TO_TEMPER_ID: Record<number, string> = {
  [40359]: "vampire", // Vampire
  [35658]: "werewolf", // Werewolf
  [32455]: "werewolf", // Werewolf
}

export const VAMPIRE_STAGE_ABILITY_ID_TO_TEMPER_ID: Record<number, string> = {
  [135397]: "stage-1", // Stage 1
  [135399]: "stage-2", // Stage 2
  [135400]: "stage-3", // Stage 3
  [135402]: "stage-4", // Stage 4
}

export const VAMPIRE_STAGE_ABILITY_ID_TO_INDEX: Record<number, number> = {
  [135397]: 1, // Stage 1
  [135399]: 2, // Stage 2
  [135400]: 3, // Stage 3
  [135402]: 4, // Stage 4
}

export const CURSE_TEMPER_ID_TO_INDEX: Record<string, number> = {
  "no-curse": 0, // No Curse
  "vampire": 1, // Vampire
  "werewolf": 2, // Werewolf
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
