import type { CompletionCharacterInput } from "akasha/temper/items-rules-core/rule-matcher-context-types/rule-matcher-context-types.module.code.ts"
import { recordField } from "akasha/utils/narrow/record-field/record-field.module.code.ts"

export function compileCurseStates(
  characters: readonly CompletionCharacterInput[]
): Map<string, "vampire" | "werewolf"> {
  const result = new Map<string, "vampire" | "werewolf">()
  for (const char of characters) {
    const curseState = recordField(char.completion, "curseState")
    if (typeof curseState !== "string") continue
    if (curseState !== "vampire" && curseState !== "werewolf") continue
    result.set(char.esoCharacterId, curseState)
  }
  return result
}

export function buildGetCharacterCurseState(
  curseStatesByCharacter: ReadonlyMap<string, "vampire" | "werewolf">
): (charId: string) => "vampire" | "werewolf" | undefined {
  return (charId) => curseStatesByCharacter.get(charId)
}
