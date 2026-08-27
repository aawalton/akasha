import { categorySubject } from "../lib/category-partition.ts"
import type { Check } from "../lib/check.ts"
import { disjointCheck } from "../lib/rules-subject.ts"

export const categoryRulesDisjoint: Check = disjointCheck(
  "category-rules-disjoint",
  categorySubject,
  "no category rules stand, so there is no partition to decide"
)
