import { recordNestedInstrumentMs } from "akasha/temper/crafting-addon/modules/crafting-slot-handler-stats/crafting-slot-handler-stats.module.code.ts"
import { STATE } from "akasha/temper/crafting-addon/modules/crafting-state/crafting-state.module.code.ts"

function buildCharacters(this: void): string[] {
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
  for (const [key] of pairs(STATE.Account.player)) {
    add(key)
  }
  table.sort(orderedIndex)
  return orderedIndex
}

export function getCharacters(): string[] {
  const start = GetGameTimeMilliseconds()
  const built = buildCharacters()
  recordNestedInstrumentMs("getCharacters", GetGameTimeMilliseconds() - start)
  return built
}
