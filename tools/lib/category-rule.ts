import {
  type Condition as ConditionIn,
  covers as coversIn,
  locationOf,
  type Match as MatchIn,
  mispaired,
  parseMatch as parseMatchIn,
} from "@akasha/rules-engine/rule-conditions"
import { folderIn } from "../../page/page-types.ts"
import { categoryRuleSet } from "./category-rule-set.ts"

function foldersOf(): Record<string, string> {
  const folders: Record<string, string> = {}
  for (const [kind, one] of Object.entries(categoryRuleSet.kinds)) {
    if (one === null || one === undefined) continue
    folders[kind] = folderIn(one.glob)
  }
  return folders
}

let folders: Readonly<Record<string, string>> | null = null

export function ruleFolders(): Readonly<Record<string, string>> {
  return (folders ??= foldersOf())
}

export function ruleFolder(): string {
  return Object.values(ruleFolders()).sort().join(" and ")
}

export interface RuleLocation {
  readonly kind: string
  readonly slug: string
}

export function ruleLocation(relPath: string): RuleLocation | null {
  const at = locationOf(categoryRuleSet, relPath)
  return at === null ? null : { kind: at.kind, slug: at.slug }
}

export type Condition = ConditionIn
export type Match = MatchIn

export function parseMatch(body: string): Match {
  return parseMatchIn(categoryRuleSet, body)
}

export function covers(above: readonly Condition[], below: readonly Condition[]): boolean {
  return coversIn(categoryRuleSet, above, below)
}

export function unpaired(conditions: readonly Condition[]): readonly Condition[] {
  return mispaired(categoryRuleSet, conditions)
}
