export const STAGE_BY_ID: ReadonlyMap<number, number> = new Map([
  [135397, 1],
  [135399, 2],
  [135400, 3],
  [135402, 4],
])

export function vampireStageForAbilityId(
  this: void,
  abilityId: number | undefined
): number | undefined {
  if (abilityId === undefined) {
    return undefined
  }
  return STAGE_BY_ID.get(abilityId)
}
