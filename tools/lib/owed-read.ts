import { decideOwed, type OwedVerdict } from "./owed-decide.ts"

// THE VERDICT DOES NOT TURN ON WHICH SEAT IS ASKED ABOUT. `decideOwed` answers `no-binding` for an
// empty list of rows, and nothing has ever filled one, so every seat is answered the same. That is a
// stub standing until the rows are wired rather than something this decides.
//
// IT RESOLVED THE SEAT ANYWAY AND THREW THE ANSWER AWAY. `resolveSeatTarget` walks the git history
// for every seat that has stopped, to turn a handle into an id this never used. It cost about a
// tenth of a second a seat, and it was the whole cost of the pending pass — eleven hundred
// milliseconds over nine seats to reach a constant, against forty for everything else in it.
//
// What the resolution bought was a throw for a handle naming no seat. The caller that stands catches
// that and reads it as not owed, which is what the verdict says in any case.
export function readOwed(): OwedVerdict {
  return decideOwed({ rows: [] }).verdict
}
