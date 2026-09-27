import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { temperRace } from "akasha/temper/catalog/world/temper-race/temper-race.page-type.ts"
import {
  type Keeping,
  keepingTurns,
  slugUnionsKept,
  type Written,
} from "akasha/temper/modules/slug-union-keeping/slug-union-keeping.module.code.ts"

const KEEPING: Keeping = {
  at: "temper/catalog/world/temper-race/modules/race-ids/race-ids.data-table.code.ts",
  pageTypeSlug: temperRace.slug,
  from: "race pages",
  unions: [{ name: "RaceId", holds: () => true }],
}

export function couldTurn(change: Change): boolean {
  return keepingTurns(KEEPING, change)
}

export function generateChange(change: Change): Written {
  return slugUnionsKept(KEEPING, change)
}
