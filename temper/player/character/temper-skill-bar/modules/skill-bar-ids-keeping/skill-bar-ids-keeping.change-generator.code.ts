import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import {
  type Keeping,
  keepingTurns,
  slugUnionsKept,
  type Written,
} from "akasha/temper/modules/slug-union-keeping/slug-union-keeping.module.code.ts"
import { temperSkillBar } from "akasha/temper/player/character/temper-skill-bar/temper-skill-bar.page-type.ts"

const KEEPING: Keeping = {
  at: "temper/player/character/temper-skill-bar/modules/skill-bar-ids/skill-bar-ids.data-table.code.ts",
  pageTypeSlug: temperSkillBar.slug,
  from: "skill bar pages",
  unions: [{ name: "SkillBarId", holds: () => true }],
}

export function couldTurn(change: Change): boolean {
  return keepingTurns(KEEPING, change)
}

export function generateChange(change: Change): Written {
  return slugUnionsKept(KEEPING, change)
}
