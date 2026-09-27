import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import {
  type Keeping,
  keepingTurns,
  slugUnionsKept,
  type Written,
} from "akasha/temper/modules/slug-union-keeping/slug-union-keeping.module.code.ts"
import { temperCharacterRole } from "akasha/temper/player/character/role/temper-character-role.page-type.ts"

const KEEPING: Keeping = {
  at: "temper/player/character/role/modules/role-ids/role-ids.data-table.code.ts",
  pageTypeSlug: temperCharacterRole.slug,
  from: "character role pages",
  unions: [{ name: "RoleId", holds: () => true }],
}

export function couldTurn(change: Change): boolean {
  return keepingTurns(KEEPING, change)
}

export function generateChange(change: Change): Written {
  return slugUnionsKept(KEEPING, change)
}
