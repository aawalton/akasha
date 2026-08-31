import { pageStemOf } from "../../page/name/name"
import { placeHolding, SEAT_PLACES } from "./agent-page-place.ts"
import { removeBeside } from "./seat-beside.ts"
import { resolveRoots } from "../../repo/roots/roots.ts"
import { akashaSeatSlugOf } from "./seat-akasha-beside.ts"
import { removeAkashaSeatPage, writeAkashaSeatPage } from "./seat-page-akasha.ts"
import { seatPageForAgent } from "./seat-presence-read.ts"
import type { Stated } from "./seat-stated.ts"
import { type Outcome, whyRefused, writerFor } from "./gated-write.ts"

const WRITER = "seat-page-writer"

const runTool = writerFor(WRITER)

// WHAT REMAINS OF THE OLD STORE HERE IS REMOVAL. Composing a page and landing it went when the
// write moved: the two renderers read one `Stated`, so the markdown page carried nothing the page
// in akasha does not, and a second copy of it could only go stale or disagree.
//
// The removals stay, and they are what drains the directory. The pages standing there were written
// before this and go one at a time as their seats depart — the hourly sweep takes the ones a
// supervisor was not alive to remove, and the two below take the rest.

// A SEAT RENAMED LEAVES ITS OLD PAGE BEHIND, and this is what takes it. It looks the seat up in the
// old store on purpose: a seat that has never had a page there finds nothing and this does nothing,
// which is the state every seat arrives at once the standing pages are gone.
//
// The page in akasha under the previous name is not taken here and never was. That gap is older
// than this change.
function takeAnyOtherPage(agent: string, seatName: string): void {
  const standing = seatPageForAgent(agent)
  if (standing === null || pageStemOf(standing) === seatName) return
  const was = pageStemOf(standing)
  const place = placeHolding(standing, SEAT_PLACES)
  if (place === null) return
  const taken = runTool(
    "rm.ts",
    [
      standing,
      "--repo",
      place.repo,
      "--message",
      `${was} is now ${seatName}, and a seat has one page`,
    ]
  )
  if (taken.code === 0) removeBeside(standing)
}

// THE WRITE REACHES AKASHA AND NOWHERE ELSE, and what it says reaches the caller. It was written
// twice and the second write was the migration's, kept quiet so a refusal in the new system could
// not take down the write the fleet was reading. There is one write now, so its refusal is the
// answer rather than a line on stderr nobody reads.
//
// AKASHA ASKS FOR MORE THAN THE OLD PAGE DID, and a seat short of what it asks is `unstated` here
// where it used to be `written`. The old page stood on a domain, a role and a principal; akasha
// wants a persona, a start mode and a registration as well. A seat that cannot state them now says
// so instead of standing as a page that states less than a seat is.
export function writeSeatPage(
  stated: Stated,
  seatName: string,
  parentName: string | null = null
): Outcome {
  takeAnyOtherPage(stated.agent, seatName)
  return writeAkashaSeatPage(stated, seatName, resolveRoots(), parentName)
}

function removeOldSeatPage(page: string, seatName: string, stopReason: string): Outcome {
  const place = placeHolding(page, SEAT_PLACES)
  if (place === null) return { kind: "unchanged" }
  const taken = runTool(
    "rm.ts",
    [
      page,
      "--repo",
      place.repo,
      "--message",
      `${seatName} stopped, ${stopReason}, so its page goes; its attributes stand in this repo's history`,
    ]
  )
  if (taken.code !== 0) {
    const detail = whyRefused(taken.output)
    process.stderr.write(
      `${seatName}'s page stands, so this seat goes on reading as one an agent is present in: ${detail}\n`
    )
    return { kind: "refused", detail }
  }
  removeBeside(page)
  return { kind: "removed" }
}

// A STOP REACHES BOTH STORES, and reaches the second whether or not the first held anything. The
// old page going first and akasha's standing is the state every reader calls unknown: nothing
// beside it says what process holds it, so a seat nobody sits in refuses the next agent to ask for
// the name. Stopping was the remedy named for that, and stopping is what could not reach it — this
// returned as soon as the old page turned out to be gone, which is exactly when it had to run.
//
// A seat name comes from whichever store still stands, so a seat gone from the old one is still
// found by the name its page in akasha is filed under. Nothing writes an old page any more, so a
// seat opened after that write stopped is only ever found that way.
export function removeSeatPage(agent: string, stopReason: string): Outcome {
  const page = seatPageForAgent(agent)
  const seatName = page === null ? akashaSeatSlugOf(agent) : pageStemOf(page)
  if (seatName === null) return { kind: "unchanged" }
  const here = page === null ? ({ kind: "unchanged" } as Outcome) : removeOldSeatPage(page, seatName, stopReason)
  if (here.kind === "refused") return here
  let gone: Outcome
  try {
    gone = removeAkashaSeatPage(seatName, resolveRoots(), stopReason)
  } catch (thrown) {
    gone = { kind: "refused", detail: thrown instanceof Error ? thrown.message : String(thrown) }
  }
  if (gone.kind === "refused") {
    process.stderr.write(`${seatName}'s page in akasha stands: ${gone.detail}\n`)
    return here.kind === "removed" ? { kind: "removed" } : gone
  }
  return here.kind === "removed" || gone.kind === "removed"
    ? { kind: "removed" }
    : { kind: "unchanged" }
}
