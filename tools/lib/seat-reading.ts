
import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import { ATTRIBUTES, attributesOf, modeOf } from "./attributes.ts"
import { documentsOnDemand } from "./documents-on-demand.ts"
import { subagentStated } from "./hold-seat.ts"
import type { Roots } from "../../page/page"
import { declaredSeatReading } from "./declared-seat-reading.ts"
import type { SeatDocument } from "./seat-attribute.ts"
import { INITIATIVE_SLUG_KEY } from "./seat-initiative.ts"
import { pageTextOf } from "./seat-page-values.ts"
import { onCallOf } from "./seat-on-call.ts"
import { principalOf } from "./seat-principal.ts"

export function seatDocuments(agent: string, roots: Roots): readonly SeatDocument[] {
  const root = rootFor(roots, AKASHA)
  const documents = documentsOnDemand(root)
  const inherited = subagentStated(agent, root)
  const attributes = inherited ?? attributesOf(agent)
  const warranted = declaredSeatReading(
    {
      attributes,
      initiative: inherited === null ? pageTextOf(agent, INITIATIVE_SLUG_KEY) : null,
      mode: inherited === null ? modeOf(agent) : null,
      onCall: inherited === null && onCallOf(agent),
      principal: inherited === null ? (principalOf(agent)?.value ?? null) : null,
    },
    roots,
    documents
  )
  const held = new Map<string, SeatDocument>()
  for (const one of warranted) {
    for (const at of one.documents ?? []) held.set(`${at.root}/${at.relPath}`, at)
  }
  return [...held.values()]
}
