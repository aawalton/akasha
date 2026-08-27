import { getSavedVariables } from "../saved-variables"
export function saveCharacterList(): undefined {
  const savedVars = getSavedVariables()
  const numCharacters = GetNumCharacters()

  for (let i = 1; i <= numCharacters; i++) {
    const [name, gender, level, classId, raceId, allianceId, characterId] = GetCharacterInfo(i)

    const cleanName = zo_strformat("<<1>>", name)
    const existing = savedVars.characters[characterId]

    if (existing !== undefined) {
      existing.name = cleanName
      existing.priorityOrder = i
      existing.gender = gender
      existing.level = level
      existing.classId = classId
      existing.allianceId = allianceId
      existing.raceId = raceId
      existing.className = GetClassName(gender, classId)
      existing.classIcon = ZO_GetClassIcon(classId)
    } else {
      savedVars.characters[characterId] = {
        name: cleanName,
        priorityOrder: i,
        gender,
        level,
        classId,
        allianceId,
        raceId,
        className: GetClassName(gender, classId),
        classIcon: ZO_GetClassIcon(classId),
      }
    }
  }
}
