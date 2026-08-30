import { admitSeatName } from "./admit-seat-name.ts"
import { type NameableSeat, composeSeatName } from "./compose-seat-name.ts"
import { nameVocabularyOf } from "./seat-name-vocabulary.ts"
import { SEAT_ID, composedNameOf } from "./seat-rename.ts"

const MOVES: ReadonlySet<string> = new Set(["composed-identity", "bare-persona"])

export function movesWithTheAttributes(name: string, root: string): boolean {
  const named = nameVocabularyOf(root)
  const { family } = admitSeatName(name, {
    personas: new Set(named.personas),
    persons: new Set(named.persons),
    domains: new Set(named.domains),
  })
  return family === null || MOVES.has(family)
}

export function nameStanding(agent: string, root: string, next: NameableSeat): string | null {
  if (!SEAT_ID.test(agent)) return null
  const held = composedNameOf(agent)
  if (held !== null && !movesWithTheAttributes(held, root)) return held
  return composeSeatName(next, root) ?? held
}
