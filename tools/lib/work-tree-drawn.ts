import { colorOfState } from "./seat-turn-color.ts"
import { seatWorkNow } from "./seat-work.ts"
import { type Drawn } from "./work-tree.ts"

export function drawnNow(): Drawn {
  const work = seatWorkNow()
  const byInitiative = new Map<string, string>()
  for (const [key, state] of work.byInitiative) {
    const color = colorOfState(state)
    if (color !== null) byInitiative.set(key, color)
  }
  return { byInitiative }
}
