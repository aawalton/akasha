import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { temperGrimoire } from "akasha/temper/catalog/skill/temper-grimoire/temper-grimoire.page-type.ts"
import {
  type Keeping,
  keepingTurns,
  slugUnionsKept,
  type Written,
} from "akasha/temper/modules/slug-union-keeping/slug-union-keeping.module.code.ts"

const KEEPING: Keeping = {
  at: "temper/catalog/skill/temper-grimoire/modules/grimoire-ids/grimoire-ids.data-table.code.ts",
  pageTypeSlug: temperGrimoire.slug,
  from: "grimoire pages",
  unions: [{ name: "GrimoireId", holds: () => true }],
}

export function couldTurn(change: Change): boolean {
  return keepingTurns(KEEPING, change)
}

export function generateChange(change: Change): Written {
  return slugUnionsKept(KEEPING, change)
}
