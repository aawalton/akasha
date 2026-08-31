import { addressOf, slugNamed } from "../../page/page-address.ts"
import { pageTypeOf } from "../../pages-system/page-type/page-type.ts"
import { documentsOnDemand } from "./documents-on-demand.ts"

// The slugs a seat page states, worked out the same way for whichever system composes it. Both
// renderers read one `Stated`, so a slug that differs between them would be a difference in the
// seat rather than in the page, and there is nowhere for one to arise.

// An akasha initiative's slug is what a seat states and what the initiative is reached by, so what
// a seat page carries is what the seat stated, whether or not that initiative still stands.

export function initiativeSlugOf(stated: string): string {
  return stated
}

export function domainAddressOf(named: string, root: string): string {
  const at = documentsOnDemand(root).domainAt(named)
  const type = at === null ? null : pageTypeOf(at)
  return type === null ? named : addressOf(type, slugNamed(named))
}
