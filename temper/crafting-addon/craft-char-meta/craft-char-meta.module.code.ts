import * as Knowledge from "../craft-knowledge/craft-knowledge.module.code.ts"

export interface CraftCharacterSkillLine {
  currentRank?: number
  currentXP?: number
  nextRankXP?: number
}

export interface CraftCharacterSkillPoints {
  total?: number
  unassigned?: number
  totalSkyshards?: number
  skyshards?: Record<string, number>
  level?: number
}

export interface CraftCharacterMountTraining {
  speed?: number
  maxSpeed?: number
  stamina?: number
  maxStamina?: number
  carryCapacity?: number
  maxCarryCapacity?: number
}

export interface CraftCharacterEntry {
  name?: string
  level?: number
  raceId?: number
  classId?: number
  allianceId?: number
  skillLineProgress?: Record<number, CraftCharacterSkillLine>
  skillPoints?: CraftCharacterSkillPoints
  mountTraining?: CraftCharacterMountTraining
}

interface CraftCharactersView {
  getSavedVariables: (this: void) => {
    characters?: Record<string, CraftCharacterEntry | undefined>
  }
}

interface CraftGlobalTable {
  TemperCharacters?: CraftCharactersView
}

function asGlobalTable(this: void, value: unknown): CraftGlobalTable {
  return value as CraftGlobalTable
}

function charactersAddon(this: void): CraftCharactersView | undefined {
  return asGlobalTable(globalThis).TemperCharacters
}

export function isAvailable(this: void): boolean {
  return charactersAddon() !== undefined
}

export function getEntry(this: void, char: string): CraftCharacterEntry | undefined {
  const api = charactersAddon()
  if (api === undefined) {
    return undefined
  }
  const charId = Knowledge.charIdForName(char)
  if (charId === undefined) {
    return undefined
  }
  const characters = api.getSavedVariables().characters
  if (characters === undefined) {
    return undefined
  }
  return characters[charId]
}

export function attributes(
  this: void,
  char: string
): {
  name: string | undefined
  level: number | undefined
  raceId: number | undefined
  classId: number | undefined
  allianceId: number | undefined
} {
  const entry = getEntry(char)
  return {
    name: entry?.name,
    level: entry?.level,
    raceId: entry?.raceId,
    classId: entry?.classId,
    allianceId: entry?.allianceId,
  }
}

export function craftRank(this: void, char: string, craftSkillLineId: number): number | undefined {
  return getEntry(char)?.skillLineProgress?.[craftSkillLineId]?.currentRank
}

export function mountTraining(this: void, char: string): CraftCharacterMountTraining | undefined {
  return getEntry(char)?.mountTraining
}

export function skyshards(this: void, char: string): number | undefined {
  return getEntry(char)?.skillPoints?.totalSkyshards
}

export function skillPoints(this: void, char: string): CraftCharacterSkillPoints | undefined {
  return getEntry(char)?.skillPoints
}
