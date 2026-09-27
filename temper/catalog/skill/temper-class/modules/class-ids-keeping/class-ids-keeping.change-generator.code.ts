import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { temperClass } from "akasha/temper/catalog/skill/temper-class/temper-class.page-type.ts"
import {
  type Keeping,
  keepingTurns,
  slugUnionsKept,
  type Written,
} from "akasha/temper/modules/slug-union-keeping/slug-union-keeping.module.code.ts"

const KEEPING: Keeping = {
  at: "temper/catalog/skill/temper-class/modules/class-ids/class-ids.data-table.code.ts",
  pageTypeSlug: temperClass.slug,
  from: "class pages",
  unions: [{ name: "ClassId", holds: () => true }],
}

export function couldTurn(change: Change): boolean {
  return keepingTurns(KEEPING, change)
}

export function generateChange(change: Change): Written {
  return slugUnionsKept(KEEPING, change)
}
