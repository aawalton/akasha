import type { CharacterScope } from "../inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import type { CompanionScope } from "../inventory-rule-types/inventory-rule-types.module.code.ts"

export function deriveCharacterScope(destination: string | undefined): CharacterScope {
  if (destination == null) return "current-character"
  if (destination.endsWith(":by-priority") || destination === "relevant-character")
    return "any-character"
  if (destination.startsWith("character-worn:")) {
    const charId = destination.slice("character-worn:".length)
    return charId === "by-priority" ? "any-character" : `character:${charId}`
  }
  if (destination.startsWith("character:")) {
    const charId = destination.slice("character:".length)
    return `character:${charId}`
  }
  return "current-character"
}

export function deriveCompanionScope(destination: string | undefined): CompanionScope {
  if (destination == null) return "active-companion"
  if (destination.endsWith(":by-priority")) return "any-companion"
  if (destination.startsWith("companion-worn:")) return "any-companion"
  return "active-companion"
}
