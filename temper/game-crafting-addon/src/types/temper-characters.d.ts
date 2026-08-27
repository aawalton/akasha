interface TemperCharactersSkillLineProgress {
  currentRank?: number
  currentXP?: number
  nextRankXP?: number
}

interface TemperCharactersSkillPoints {
  total?: number
  unassigned?: number
  totalSkyshards?: number
  skyshards?: Record<string, number>
  level?: number
}

interface TemperCharactersMountTraining {
  speed?: number
  maxSpeed?: number
  stamina?: number
  maxStamina?: number
  carryCapacity?: number
  maxCarryCapacity?: number
}

interface TemperCharactersCharacterEntry {
  name?: string
  level?: number
  raceId?: number
  classId?: number
  allianceId?: number
  skillLineProgress?: Record<number, TemperCharactersSkillLineProgress>
  skillPoints?: TemperCharactersSkillPoints
  mountTraining?: TemperCharactersMountTraining
}

interface TemperCharactersSavedVariables {
  characters?: Record<string, TemperCharactersCharacterEntry | undefined>
}

interface TemperCharactersGlobal {
  getSavedVariables: (this: void) => TemperCharactersSavedVariables
}

declare const TemperCharacters: TemperCharactersGlobal | undefined
