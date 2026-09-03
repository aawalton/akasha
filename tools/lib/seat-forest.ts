import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import { statedProcessPresence } from "@akasha/seat-system/seat-proc-key"
import { FLEET } from "./compose-seat-name.ts"
import { akashaHolderProcessOf, akashaSeatIdForName } from "./seat-akasha-beside.ts"
import { akashaSeatsStated, akashaSeatValuesOf } from "./seat-akasha-read.ts"
import { pageFromHistory } from "./seat-page-history.ts"

const MAX_ANCESTOR_GENERATIONS = 10

const PERSON_KEY = "person-slug"

const PRINCIPAL_KEY = "principal-seat-name"

const START_MODE_KEY = "start-mode"

const OPENED = "opened"

const SPAWNED = "spawned"

export interface ForestRow {
  readonly id: string
  readonly name: string | null
  readonly parent_agent_id: string | null
  readonly principal: string | null
  readonly launch: string | null
  readonly mode: string | null
  readonly live: boolean
}

function textAt(frontmatter: Record<string, unknown>, key: string): string | null {
  const held = frontmatter[key]
  return typeof held === "string" && held !== "" ? held : null
}

export interface SeatStanding {
  readonly name: string
  readonly frontmatter: Record<string, unknown>
  readonly live: boolean
}

export function forestRow(seat: SeatStanding): ForestRow {
  const person = textAt(seat.frontmatter, PERSON_KEY)
  const parentName = textAt(seat.frontmatter, PRINCIPAL_KEY)
  return {
    id: textAt(seat.frontmatter, "id") ?? "",
    name: seat.name,
    parent_agent_id: parentName === null ? null : parentIdOf(parentName),
    principal: person ?? (parentName === null ? null : FLEET),
    launch: person !== null ? OPENED : parentName !== null ? SPAWNED : null,
    mode: textAt(seat.frontmatter, START_MODE_KEY),
    live: seat.live,
  }
}

export function parentsToFetch(
  inHand: readonly SeatStanding[],
  attempted: ReadonlySet<string>
): readonly string[] {
  const held = new Set(inHand.map((seat) => seat.name))
  const named = inHand
    .map((seat) => textAt(seat.frontmatter, PRINCIPAL_KEY))
    .filter((name): name is string => name !== null && !held.has(name) && !attempted.has(name))
  return [...new Set(named)]
}

function parentIdOf(seatName: string): string | null {
  const seat = seatNamed(seatName)
  return seat === null ? null : (textAt(seat.frontmatter, "id") ?? null)
}

// What akasha states of the seat of this name, shaped as the old page's frontmatter. Null where
// akasha holds no seat by that name.
function fromAkasha(seatName: string): SeatStanding | null {
  const id = akashaSeatIdForName(seatName)
  if (id === null) return null
  const frontmatter = akashaSeatValuesOf(id)
  if (frontmatter === null) return null
  return {
    name: seatName,
    frontmatter,
    live: statedProcessPresence(akashaHolderProcessOf(id)) === "present",
  }
}

// Akasha, then the history. The history is where a seat is read back from once it has stopped, so
// a seat still standing is not answered from it. The old page was asked first and is not asked at
// all now: it holds nothing akasha does not, and it stopped being written before this changed.
function seatNamed(seatName: string): SeatStanding | null {
  const inAkasha = fromAkasha(seatName)
  if (inAkasha !== null) return inAkasha
  const held = pageFromHistory(seatName, resolveRoots())
  return held === null ? null : { name: seatName, frontmatter: held.frontmatter, live: false }
}

// ONE SYSTEM IS WALKED NOW. Both were, because a seat standing only in akasha was not absent from
// the forest but invisible in it, and the forest is how the fleet is looked at. With the old pages
// no longer written there is no second store to reconcile against and no name to hold back.
//
// A SEAT AKASHA HOLDS IS LISTED WHETHER OR NOT SOMEBODY SITS IN IT. The akasha-only half of the old
// walk listed the live ones alone, on the reading that a page outliving its counterpart was residue
// from a stop whose second removal did not land. There is no counterpart to outlive any more: a
// page akasha holds for a seat nobody sits in is either an absent seat, which the forest says so
// of, or a removal that failed, which is a fault worth seeing rather than one worth hiding.
function seatsStanding(): readonly SeatStanding[] {
  return akashaSeatsStated().map((one) => ({
    name: one.name,
    frontmatter: one.values,
    live: statedProcessPresence(akashaHolderProcessOf(one.id)) === "present",
  }))
}

export function readSeatForest(): readonly ForestRow[] {
  const byName = new Map<string, SeatStanding>()
  for (const seat of seatsStanding()) byName.set(seat.name, seat)
  const attempted = new Set<string>()
  for (let generation = 0; generation < MAX_ANCESTOR_GENERATIONS; generation += 1) {
    const wanted = parentsToFetch([...byName.values()], attempted)
    if (wanted.length === 0) break
    let found = 0
    for (const name of wanted) {
      attempted.add(name)
      const seat = seatNamed(name)
      if (seat === null) continue
      byName.set(name, { ...seat, live: false })
      found += 1
    }
    if (found === 0) break
  }
  return [...byName.values()].map(forestRow)
}
