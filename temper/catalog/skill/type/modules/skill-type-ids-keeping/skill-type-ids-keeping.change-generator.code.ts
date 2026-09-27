import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { temperSkillType } from "akasha/temper/catalog/skill/type/temper-skill-type.page-type.ts"
import {
  type Keeping,
  keepingTurns,
  slugUnionsKept,
  type Written,
} from "akasha/temper/modules/slug-union-keeping/slug-union-keeping.module.code.ts"

const KEEPING: Keeping = {
  at: "temper/catalog/skill/type/modules/skill-type-ids/skill-type-ids.data-table.code.ts",
  pageTypeSlug: temperSkillType.slug,
  from: "skill type pages",
  unions: [{ name: "SkillTypeId", holds: () => true }],
}

export function couldTurn(change: Change): boolean {
  return keepingTurns(KEEPING, change)
}

export function generateChange(change: Change): Written {
  return slugUnionsKept(KEEPING, change)
}
