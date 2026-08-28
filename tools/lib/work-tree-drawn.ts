
/**
 * What colour each initiative is drawn in, from the seats working it.
 *
 * ONE ANSWER FOR TWO READERS. The work tree is composed both by `ops akasha work-tree` and in the
 * editor's Work panel, and a row's colour is the turn state of whatever seats hold it. Worked out
 * in each place separately it would be two answers to one question, and the one nobody watches
 * would be the panel's.
 *
 * A ROW SEVERAL SEATS HOLD TAKES THE LIVELIEST OF THEM, which `seatWorkNow` settles before this
 * sees it, so a row says whether anything is moving on it rather than what one seat happens to be
 * doing.
 */

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
