import { categoryRuleSet } from "./category-rule-set.ts"
import { ruleFolder, parseMatch, ruleLocation } from "./category-rule.ts"
import type { RepoView } from "./check.ts"
import { refusalText } from "../../refusal/refusal.ts"
import type { RuleSubject, Group, Meeting, Printers, Unreadable } from "./rules-subject.ts"
import type { Case, Matchable } from "./rules-partition.ts"

export const TRANSACTIONS = "distinguishable transaction(s)"

export function describe(at: Case): string {
  return categoryRuleSet.fields
    .map((field) => `${field.name} \`${at[field.name] ?? ""}\``)
    .join(", ")
}

function groupsOf(repo: RepoView): readonly Group[] {
  const rules: Matchable[] = []
  const unreadable: Unreadable[] = []
  for (const relPath of repo.documents) {
    if (ruleLocation(relPath) === null) continue
    const match = parseMatch(repo.read(relPath))
    if (match.stray > 0) unreadable.push({ relPath, stray: match.stray })
    else rules.push({ relPath, conditions: match.conditions })
  }
  return rules.length === 0 && unreadable.length === 0
    ? []
    : [{ label: ruleFolder(), rules, unreadable }]
}

const refusals: Printers = {
  unreadable: (one: Unreadable, root: string): string =>
    refusalText(
      "category-rule-match-unreadable",
      { rule: one.relPath, count: String(one.stray) },
      root
    ),
  overlap: (meeting: Meeting, root: string): string =>
    refusalText(
      "category-rules-overlap",
      {
        rule: meeting.rule,
        other: meeting.other,
        count: String(meeting.count),
        transaction: meeting.at,
      },
      root
    ),
  unclaimed: (at: string, group: Group, root: string): string =>
    refusalText("category-transaction-unclaimed", { folder: group.label, transaction: at }, root),
  unbounded: (group: Group, ceiling: number, root: string): string =>
    refusalText(
      "category-transaction-space-unbounded",
      { folder: group.label, ceiling: String(ceiling) },
      root
    ),
}

export const categorySubject: RuleSubject = {
  ruleSet: categoryRuleSet,
  noun: TRANSACTIONS,
  describe,
  groupsOf,
  refusals,
}
