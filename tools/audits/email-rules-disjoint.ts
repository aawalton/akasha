import type { Check } from "../lib/check.ts"
import { emailSubject } from "../lib/email-partition.ts"
import { disjointCheck } from "../lib/rules-subject.ts"

export const emailRulesDisjoint: Check = disjointCheck(
  "email-rules-disjoint",
  emailSubject,
  "no person carries any email rules, so there is no partition to decide"
)
