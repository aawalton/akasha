import {
  type Condition as ConditionIn,
  covers as coversIn,
  locationOf,
  type Match as MatchIn,
  parseMatch as parseMatchIn,
} from "@akasha/rules-engine/rule-conditions"
import { emailRuleSet } from "./email-rule-set.ts"

export interface RuleLocation {
  readonly person: string
  readonly kind: string
  readonly slug: string
}

export function ruleLocation(relPath: string): RuleLocation | null {
  const at = locationOf(emailRuleSet, relPath)
  return at === null ? null : { person: at.holder ?? "", kind: at.kind, slug: at.slug }
}

const GLOB_TAIL = /\/\*.*$/

function foldersOf(): Record<string, string> {
  const folders: Record<string, string> = {}
  for (const [kind, one] of Object.entries(emailRuleSet.kinds)) {
    if (one === null || one === undefined) continue
    folders[kind] = one.glob.replace(GLOB_TAIL, "")
  }
  return folders
}

let folders: Readonly<Record<string, string>> | null = null

function ruleFolders(): Readonly<Record<string, string>> {
  return (folders ??= foldersOf())
}

export function ruleKinds(): readonly string[] {
  return Object.keys(ruleFolders()).sort()
}

export function ruleFolderIn(person: string, kind: string): string | null {
  const folder = ruleFolders()[kind]
  return folder === undefined ? null : `${folder}/${person}`
}

export function ruleFolderOf(person: string): string {
  return ruleKinds()
    .map((kind) => `${ruleFolders()[kind] as string}/${person}`)
    .join(" and ")
}

export type Condition = ConditionIn
export type Match = MatchIn

export function parseMatch(body: string): Match {
  return parseMatchIn(emailRuleSet, body)
}

export function covers(above: readonly Condition[], below: readonly Condition[]): boolean {
  return coversIn(emailRuleSet, above, below)
}
