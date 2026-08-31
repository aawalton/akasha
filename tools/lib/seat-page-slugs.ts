import { addressOf, slugNamed } from "../../page/page-address.ts"
import { pageTypeOf } from "../../pages-system/page-type/page-type.ts"
import { documentsOnDemand } from "./documents-on-demand.ts"

// The slugs a seat page states. One renderer composes a seat page now, so what was shared between
// two of them is what this is: the address a seat's assignment is reached by.
//
// `initiativeSlugOf` stood here beside it and went with the markdown page. It was the identity
// function: the old page carried `initiative-slug` as a bare slug, and akasha carries the
// assignment as an address under whichever page type holds it, which `domainAddressOf` works out.

export function domainAddressOf(named: string, root: string): string {
  const at = documentsOnDemand(root).domainAt(named)
  const type = at === null ? null : pageTypeOf(at)
  return type === null ? named : addressOf(type, slugNamed(named))
}
