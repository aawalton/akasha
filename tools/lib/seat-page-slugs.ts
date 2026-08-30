import { addressOf, slugNamed } from "../../page/page-address.ts"
import { pageTypeOf } from "../../pages-system/page-type/page-type.ts"
import { documentsOnDemand } from "./documents-on-demand.ts"
import { initiativesIn } from "./seat-initiative.ts"
import { frontmatterOf } from "./seat-presence-read.ts"

// The slugs a seat page states, worked out the same way for whichever system composes it. Both
// renderers read one `Stated`, so a slug that differs between them would be a difference in the
// seat rather than in the page, and there is nowhere for one to arise.

export function initiativeSlugOf(stated: string, root: string): string {
  const at = initiativesIn(root).get(stated) ?? []
  const [only] = at
  if (at.length !== 1 || only === undefined) return stated
  const slug = frontmatterOf(`${root}/${only}`)?.["slug"]
  return typeof slug === "string" && slug !== "" ? slug : stated
}

export function domainAddressOf(named: string, root: string): string {
  const at = documentsOnDemand(root).domainAt(named)
  const type = at === null ? null : pageTypeOf(at)
  return type === null ? named : addressOf(type, slugNamed(named))
}
