// WHAT THE VERB SERVER ANSWERS AND UNDER WHAT BOUND, named once so the two ends agree. The server
// is bun and the caller is the editor's node host, and a verb one end serves and the other still
// spawns costs the startup this exists to stop paying.
//
// This file holds nothing but names and numbers on purpose: the node host imports it, and anything
// reaching a `Bun` global here would throw at import in the host and take activation with it.

export const PROTOCOL = 1

// HOW OLD THE CODE BEHIND AN ANSWER MAY BE. A held-open runtime keeps the modules it loaded and
// the few memos beneath them that are not scoped to a call, and no watcher can be trusted to catch
// every edit a lane makes. So the server dies on a clock instead: past this it refuses whatever is
// asked and exits, and the caller starts another and asks again.
//
// The price is one bun startup — about 0.19s of wall and 0.22s of CPU — per turn of the lease.
// At thirty seconds that is under a hundredth of a core, against the fifth of a core one poller
// spends spawning a child every second.
export const LEASE_MS = 30_000

export const LEASE_ENV = "AKASHA_VERB_SERVER_LEASE_MS"

// The bound a server actually holds itself to. It is a number rather than a constant so that the
// bound can be tightened where a lane is editing tools every few seconds, and so that what happens
// when a lease turns over can be watched in a test that takes a second rather than half a minute.
// Anything that is not a positive number is the default, since a bound read as NaN is no bound.
export function leaseAsked(stated: string | undefined = process.env[LEASE_ENV]): number {
  const asked = stated === undefined || stated === "" ? Number.NaN : Number(stated)
  return Number.isFinite(asked) && asked > 0 ? asked : LEASE_MS
}

export const VERBS_SERVED: readonly string[] = [
  "agent-forest",
  "agent-turn-colors",
  "seat-transcripts",
  "work-tree",
]

export function isServed(verb: string): boolean {
  return VERBS_SERVED.includes(verb)
}
