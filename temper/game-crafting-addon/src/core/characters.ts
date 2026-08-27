import { state } from "../state"

export function GetCharacters(): string[] {
  const seen: Record<string, boolean> = {}
  const orderedIndex: string[] = []
  const add = (name: string): undefined => {
    if (seen[name] !== true) {
      seen[name] = true
      orderedIndex.push(name)
    }
  }
  for (const [, entry] of ipairs(LibCharacterKnowledge.GetCharacterList())) {
    add(entry.name)
  }
  for (const [key] of pairs(state.Account.player)) {
    add(key)
  }
  table.sort(orderedIndex)
  return orderedIndex
}
