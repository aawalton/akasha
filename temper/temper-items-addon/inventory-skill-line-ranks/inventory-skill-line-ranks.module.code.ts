import { skillLines } from "@akasha/temper-skill-lines/skill-lines"
import { isObjectRecord } from "@akasha/utils-narrow/is-object-record"
import { getTemperCharactersData } from "../inventory-temper-characters-data/inventory-temper-characters-data.module.code.ts"

function hasAnyKey(record: Record<string, unknown>): boolean {
  return Object.keys(record).length > 0
}

function buildCurrentCharRankMap(): LuaMap<number, number> {
  const result = new LuaMap<number, number>()
  const numSkillTypes = GetNumSkillTypes()
  for (let skillType = 1; skillType <= numSkillTypes; skillType++) {
    const numLines = GetNumSkillLines(skillType)
    for (let lineIndex = 1; lineIndex <= numLines; lineIndex++) {
      const [name, , , skillLineId] = GetSkillLineInfo(skillType, lineIndex)
      if (name === undefined || name === "" || skillLineId === undefined || skillLineId === 0) {
        continue
      }
      const skillLineData = SKILLS_DATA_MANAGER.GetSkillLineDataByIndices(skillType, lineIndex)
      if (skillLineData === undefined) {
        result.set(skillLineId, 0)
        continue
      }
      if (!skillLineData.IsDiscovered()) {
        result.set(skillLineId, 0)
        continue
      }
      result.set(skillLineId, skillLineData.GetCurrentRank())
    }
  }
  return result
}

function readSyncedRank(
  characters: Record<string, unknown> | undefined,
  charId: string,
  esoSkillLineId: number
): number | undefined {
  if (!characters) return undefined
  const charData = characters[charId]
  if (!isObjectRecord(charData)) return undefined
  const slp = charData["skillLineProgress"]
  if (!isObjectRecord(slp) || !hasAnyKey(slp)) return undefined
  const entry = slp[esoSkillLineId]
  if (!isObjectRecord(entry)) return 0
  const currentRank = entry["currentRank"]
  return typeof currentRank === "number" ? currentRank : 0
}

export function buildGetCharacterSkillLineRanks(): (
  charId: string,
  skillLineId: string
) => { currentRank: number; maxRank: number } | undefined {
  const currentCharStr = tostring(GetCurrentCharacterId())
  const liveRanks = buildCurrentCharRankMap()
  const characters = getTemperCharactersData()
  return (charId, skillLineId) => {
    if (!skillLines.has(skillLineId)) return undefined
    const staticEntry = skillLines.data[skillLineId]
    const esoSkillLineId = staticEntry.esoSkillLineId
    if (esoSkillLineId <= 0) return undefined
    const maxRank = staticEntry.maxRank
    if (charId === currentCharStr) {
      const currentRank = liveRanks.get(esoSkillLineId) ?? 0
      return { currentRank, maxRank }
    }
    const syncedRank = readSyncedRank(characters, charId, esoSkillLineId)
    if (syncedRank === undefined) return undefined
    return { currentRank: syncedRank, maxRank }
  }
}
