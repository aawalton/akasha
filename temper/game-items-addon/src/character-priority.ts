import { CharacterId } from "@temper/game-items-rules-core/use-destination-types"
import { getCompiledConfig } from "./rules-core"

export function buildCompiledCharacterPriority(
  currentChar: CharacterId
): ReadonlyArray<CharacterId> {
  const compiled = getCompiledConfig()
  const raw = compiled?.characterPriority
  const priority: CharacterId[] = []
  if (raw !== undefined) {
    for (const id of raw) priority.push(CharacterId(id))
  }
  if (priority.length === 0) return [currentChar]
  return priority
}
