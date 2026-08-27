import * as Knowledge from "./knowledge"

export function IsAvailable(this: void): boolean {
  return TemperCharacters !== undefined
}

export function GetEntry(this: void, char: string): TemperCharactersCharacterEntry | undefined {
  const api = TemperCharacters
  if (api === undefined) {
    return undefined
  }
  const charId = Knowledge.CharIdForName(char)
  if (charId === undefined) {
    return undefined
  }
  const characters = api.getSavedVariables().characters
  if (characters === undefined) {
    return undefined
  }
  return characters[charId]
}

export function Identity(
  this: void,
  char: string
): {
  name: string | undefined
  level: number | undefined
  raceId: number | undefined
  classId: number | undefined
  allianceId: number | undefined
} {
  const entry = GetEntry(char)
  return {
    name: entry?.name,
    level: entry?.level,
    raceId: entry?.raceId,
    classId: entry?.classId,
    allianceId: entry?.allianceId,
  }
}

export function CraftRank(this: void, char: string, craftSkillLineId: number): number | undefined {
  return GetEntry(char)?.skillLineProgress?.[craftSkillLineId]?.currentRank
}

export function MountTraining(this: void, char: string): TemperCharactersMountTraining | undefined {
  return GetEntry(char)?.mountTraining
}

export function Skyshards(this: void, char: string): number | undefined {
  return GetEntry(char)?.skillPoints?.totalSkyshards
}

export function SkillPoints(this: void, char: string): TemperCharactersSkillPoints | undefined {
  return GetEntry(char)?.skillPoints
}
