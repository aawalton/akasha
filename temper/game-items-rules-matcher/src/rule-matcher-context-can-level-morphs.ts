import { type MorphCharacterCompletion, type MorphCharacterRow } from "@akasha/temper-skill-morphs-access/morph-completion-shapes"
import { computeCharacterCanLevelMorphs } from "@akasha/temper-skill-morphs-access/skill-morphs-checker"
import type { CompletionCharacterInput } from "@temper/game-items-rules-core/rule-matcher-context-types"

function isMorphCharacterCompletion(value: unknown): value is MorphCharacterCompletion {
  return typeof value === "object" && value !== null
}

export function compileCharacterCanLevelMorphs(
  characters: readonly CompletionCharacterInput[]
): Map<string, boolean> {
  const result = new Map<string, boolean>()
  for (const char of characters) {
    if (!isMorphCharacterCompletion(char.completion)) {
      result.set(char.esoCharacterId, false)
      continue
    }
    const morphRow: MorphCharacterRow = {
      id: char.esoCharacterId,
      completion: char.completion,
    }
    result.set(char.esoCharacterId, computeCharacterCanLevelMorphs(morphRow))
  }
  return result
}

export function buildGetCharacterCanLevelMorphs(
  canLevelByCharacter: ReadonlyMap<string, boolean>
): (charId: string) => boolean {
  return (charId) => canLevelByCharacter.get(charId) ?? false
}
