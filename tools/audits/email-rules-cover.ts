import type { Check } from "../lib/check.ts"
import { emailSubject } from "../lib/email-partition.ts"
import { coverCheck } from "../lib/rules-subject.ts"

export const emailRulesCover: Check = coverCheck(
  "email-rules-cover",
  emailSubject,
  "no person carries any email rules, so there is nothing that has to be covered"
)
