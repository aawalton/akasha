import { affixScripts } from "@temper/game-characters-skills/scribing/affix-scripts-data"
import { focusScripts } from "@temper/game-characters-skills/scribing/focus-scripts-data"
import { signatureScripts } from "@temper/game-characters-skills/scribing/signature-scripts-data"

let nameToItemId: Map<string, number> | undefined

function buildMap(): Map<string, number> {
  const map = new Map<string, number>()
  for (const s of focusScripts.list) {
    map.set(s.name, s.itemId)
  }
  for (const s of signatureScripts.list) {
    if (s.itemId !== 0) map.set(s.name, s.itemId)
  }
  for (const s of affixScripts.list) {
    if (s.itemId !== 0) map.set(s.name, s.itemId)
  }
  return map
}

export function getScriptItemIdByName(name: string): number | undefined {
  if (!nameToItemId) nameToItemId = buildMap()
  return nameToItemId.get(name)
}
