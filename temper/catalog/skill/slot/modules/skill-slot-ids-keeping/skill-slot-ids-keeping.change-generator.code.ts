import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { temperSkillSlot } from "akasha/temper/catalog/skill/slot/temper-skill-slot.page-type.ts"
import {
  type Keeping,
  keepingTurns,
  slugUnionsKept,
  type Written,
} from "akasha/temper/modules/slug-union-keeping/slug-union-keeping.module.code.ts"

const KEEPING: Keeping = {
  at: "temper/catalog/skill/slot/modules/skill-slot-ids/skill-slot-ids.data-table.code.ts",
  pageTypeSlug: temperSkillSlot.slug,
  from: "skill slot pages",
  unions: [{ name: "SkillSlotId", holds: () => true }],
}

export function couldTurn(change: Change): boolean {
  return keepingTurns(KEEPING, change)
}

export function generateChange(change: Change): Written {
  return slugUnionsKept(KEEPING, change)
}
