import { affixScripts } from "@temper/game-characters-skills/scribing/affix-scripts-data"
import { focusScripts } from "@temper/game-characters-skills/scribing/focus-scripts-data"
import { grimoires } from "@temper/game-characters-skills/scribing/grimoires-data"
import { signatureScripts } from "@temper/game-characters-skills/scribing/signature-scripts-data"
import type { CompletionCharacterRow } from "./completion-character-row-type"
import { isCharacterMeasured } from "./completion-measured"
import type { CharacterScribingProgress, ScribingKnowledgeItem } from "./completion-ui-types"

export function transformScribingProgress(
  rows: readonly CompletionCharacterRow[]
): readonly CharacterScribingProgress[] {
  const result: CharacterScribingProgress[] = []

  for (const row of rows) {
    const completion = row.completion
    if (!completion || !isCharacterMeasured(completion)) continue

    const scribing = completion.scribing
    const unlockedGrimoireNames = new Set<string>()
    const unlockedScriptNames = new Set<string>()

    if (scribing) {
      for (const entry of Object.values(scribing.grimoires)) {
        if (entry.unlocked) unlockedGrimoireNames.add(entry.name)
      }
      for (const entry of Object.values(scribing.scripts)) {
        if (entry.unlocked) unlockedScriptNames.add(entry.name)
      }
    }

    const grimoireItems: ScribingKnowledgeItem[] = grimoires.list.map((g) => ({
      name: g.name,
      unlocked: unlockedGrimoireNames.has(g.name),
    }))

    const focusScriptItems: ScribingKnowledgeItem[] = focusScripts.list.map((s) => ({
      name: s.name,
      unlocked: unlockedScriptNames.has(s.name),
    }))

    const signatureScriptItems: ScribingKnowledgeItem[] = signatureScripts.list
      .filter((s) => s.itemId !== 0)
      .map((s) => ({
        name: s.name,
        unlocked: unlockedScriptNames.has(s.name),
      }))

    const affixScriptItems: ScribingKnowledgeItem[] = affixScripts.list
      .filter((s) => s.itemId !== 0)
      .map((s) => ({
        name: s.name,
        unlocked: unlockedScriptNames.has(s.name),
      }))

    result.push({
      characterId: row.id,
      grimoires: grimoireItems,
      focusScripts: focusScriptItems,
      signatureScripts: signatureScriptItems,
      affixScripts: affixScriptItems,
    })
  }

  return result
}
