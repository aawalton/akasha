import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const ACCOUNT_CHARACTER = "temper-account-character"

export type PlayedCharacter = { readonly id: string; readonly name: string }

export function characterAmong(
  characters: readonly Value[],
  asked: string
): PlayedCharacter | null {
  const wanted = asked.trim().toLowerCase()
  for (const value of characters) {
    const id = textAt(value, "esoCharacterId")
    const name = textAt(value, "title")
    if (id === null || name === null) continue
    const said = [id, name.toLowerCase(), textAt(value, "slug")]
    if (said.includes(wanted)) return { id, name }
  }
  return null
}

export function accountCharacters(root: string): readonly Value[] {
  return valuesOfType(root, ACCOUNT_CHARACTER).map((one) => one.value)
}

export function playedAsLua(character: PlayedCharacter): string {
  return `local id, name = ${JSON.stringify(character.id)}, ${JSON.stringify(character.name)}
GetCurrentCharacterId = function() return id end
local unitNameOf, rawUnitNameOf = GetUnitName, GetRawUnitName
GetUnitName = function(tag)
  if tag == "player" then return name end
  return unitNameOf(tag)
end
GetRawUnitName = function(tag)
  if tag == "player" then return name end
  return rawUnitNameOf(tag)
end`
}
