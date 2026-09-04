import {
  type CharacterId,
  characterId,
} from "@akasha/temper-items-rules-core/use-destination-types"
import { getCompiledConfig } from "../inventory-rules-core/inventory-rules-core.module.code.ts"
export function buildCompiledCharacterPriority(
  currentChar: CharacterId
): ReadonlyArray<CharacterId> {
  const compiled = getCompiledConfig()
  const raw = compiled?.characterPriority
  const priority: CharacterId[] = []
  if (raw !== undefined) {
    for (const id of raw) priority.push(characterId(id))
  }
  if (priority.length === 0) return [currentChar]
  return priority
}
