const VAMPIRE_STAGE_ABILITY_ID_TO_INDEX: Record<number, number> = {
  [135397]: 1,
  [135399]: 2,
  [135400]: 3,
  [135402]: 4,
}

const CURSE_TEMPER_ID_TO_INDEX: Record<string, number> = {
  "no-curse": 0,
  "vampire": 1,
  "werewolf": 2,
}
export function getVampireStageIndex(abilityId: number): number {
  return VAMPIRE_STAGE_ABILITY_ID_TO_INDEX[abilityId] ?? 0
}
export function getCurseIndex(temperId: string): number {
  return CURSE_TEMPER_ID_TO_INDEX[temperId] ?? 0
}
