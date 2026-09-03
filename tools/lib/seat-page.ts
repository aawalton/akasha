import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import type { Outcome } from "../../akasha/command-system/gated-write/gated-write.module.code.ts"
import { akashaSeatSlugOf } from "../../akasha/seat-system/seat-akasha-beside/seat-akasha-beside.module.code.ts"
import {
  removeAkashaSeatPage,
  writeAkashaSeatPage,
} from "../../akasha/seat-system/seat-page-akasha/seat-page-akasha.module.code.ts"
import type { Stated } from "../../akasha/seat-system/seat-stated/seat-stated.module.code.ts"

// NOTHING OF THE OLD STORE REMAINS HERE. Composing a page and landing it went when the write moved:
// the two renderers read one `Stated`, so the markdown page carried nothing the page in akasha does
// not, and a second copy of it could only go stale or disagree.
//
// The removals went with the store they removed from. One took the page a renamed seat left behind
// and the other took the page of a seat that stopped, each by the gated `rm.ts`; both looked the
// seat up in a directory that no longer exists, so both had already become the walk that finds
// nothing. What they were guarding against is now impossible rather than merely handled.

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
  return writeAkashaSeatPage(stated, seatName, resolveRoots(), parentName)
}

// A SEAT IS NAMED BY THE PAGE AKASHA FILES IT UNDER, which is the only place a seat has stood since
// the write moved. This asked the old store for a path and read the name off it, falling back to
// akasha only where that path was missing; the fallback is the whole of it now.
export function removeSeatPage(agent: string, stopReason: string): Outcome {
  const seatName = akashaSeatSlugOf(agent)
  if (seatName === null) return { kind: "unchanged" }
  try {
    return removeAkashaSeatPage(seatName, resolveRoots(), stopReason)
  } catch (thrown) {
    const detail = thrown instanceof Error ? thrown.message : String(thrown)
    process.stderr.write(`${seatName}'s page in akasha stands: ${detail}\n`)
    return { kind: "refused", detail }
  }
}
