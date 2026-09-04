import { isObjectRecord } from "@akasha/utils-narrow/is-object-record"
export function getTemperCharactersData(): Record<string, unknown> | undefined {
  const g: Record<string, unknown> = globalThis
  const tcSv = g["TemperCharacters_SavedVariables"]
  if (!isObjectRecord(tcSv)) return undefined
  const defaultTable = tcSv["Default"]
  if (!isObjectRecord(defaultTable)) return undefined
  let accountWide: Record<string, unknown> | undefined
  for (const key of Object.keys(defaultTable)) {
    if (key.startsWith("@")) {
      const accountTable = defaultTable[key]
      if (!isObjectRecord(accountTable)) continue
      const inner = accountTable["$AccountWide"]
      if (isObjectRecord(inner)) {
        accountWide = inner
        break
      }
    }
  }
  if (!accountWide) return undefined
  const characters = accountWide["characters"]
  return isObjectRecord(characters) ? characters : undefined
}
