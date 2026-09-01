import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots.ts"
import { type ForestRow, readSeatForest } from "./seat-forest.ts"
import { colorOfState } from "./seat-turn-color.ts"
import {
  type SeatTurnState,
  readSeatTurn,
  seatTurnRecordsOf,
} from "./seat-turn-state.ts"

// THE FOREST IS READ FROM AKASHA RATHER THAN ASKED OF THE OLD PAGE QUERY. This asked
// `answer(roots, { pageType: "seat", ... })` and read the result as `asked?.rows ?? []`, so the
// editor's agent tree drew an empty forest and said nothing.
//
// TWO SEPARATE THINGS EMPTIED IT, AND ONLY ONE OF THEM WAS A NULL. `4bb2acd9e0` drained the eight
// `agent/seat/*.seat.md` pages the old `seat` page type was filed over; from that moment the query
// answered a perfectly valid `{ n: 0, rows: [] }` and the tree was already blank. `4e6ba6e6ec`
// then took `pages/page-type/seat.page-type.md` away and the same query started answering null.
// The tree looked identical across both, which is why distinguishing null from empty would not
// have caught this: for three hours the answer was empty and honest.
//
// SO THE READER IS REPOINTED RATHER THAN THE ENGINE TAUGHT. A seat's page is
// `akasha/seat-system/seat/seats/<name>.seat.ts` and what is observed of it stands beside that
// page. The old engine reads markdown frontmatter off a glob, so no amount of registry work makes
// it read a seat; `readSeatForest` already walks akasha's index and is what `tools/agent-forest.ts`
// has been reading all along. This adds the turn reading and its colour on top of that walk.
//
// THE TURN KEYS THIS USED TO ASK FOR WERE ANSWERING NOTHING EVEN WHEN THE QUERY WORKED.
// `turn-state`, `turn-pending-source`, `turn-end-reading` and the `turn-working` components are
// records nobody keeps — `seat-turn.ts` and `seat-turn-working.ts` say so and return null and `{}`.
// `seatTurnRecordsOf` reads the one that is kept, `turn-pending`, from akasha, so the reading here
// is no worse than before and its pending half is live rather than frozen.

export interface ForestReading extends ForestRow {
  readonly state: SeatTurnState
  readonly waitingOn: string | null
  readonly color: string | null
}

function byName(one: ForestReading, two: ForestReading): number {
  return (one.name ?? "").localeCompare(two.name ?? "")
}

export function askSeatForest(): readonly ForestReading[] {
  const akasha = rootFor(resolveRoots(), AKASHA)
  const colours = new Map<SeatTurnState, string | null>()
  const found: ForestReading[] = []
  for (const row of readSeatForest()) {
    const reading = readSeatTurn(seatTurnRecordsOf(row.id))
    if (!colours.has(reading.state)) colours.set(reading.state, colorOfState(reading.state, akasha))
    found.push({
      ...row,
      state: reading.state,
      waitingOn: reading.waitingOn,
      color: colours.get(reading.state) ?? null,
    })
  }
  return found.sort(byName)
}
