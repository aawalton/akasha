import { affixScripts } from "../../skill-kinds/scribing-affix-scripts/scribing-affix-scripts.module.code.ts"
import { focusScripts } from "../../skill-kinds/scribing-focus-scripts/scribing-focus-scripts.module.code.ts"
import { signatureScripts } from "../../skill-kinds/scribing-signature-scripts/scribing-signature-scripts.module.code.ts"

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
