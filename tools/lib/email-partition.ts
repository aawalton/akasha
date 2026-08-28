import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import type { RepoView } from "./check.ts"
import { emailRuleSet } from "./email-rule-set.ts"
import { parseMatch, ruleFolderOf, ruleLocation } from "./email-rule.ts"
import type { Condition } from "./email-rule.ts"
import { rulesOf } from "./email-rules.ts"
import type { Rule } from "./email-rules.ts"
import type { Message } from "./gmail.ts"
import { refusalText } from "../../refusal/refusal.ts"
import type { RuleSubject, Group, Meeting, Printers, Unreadable } from "./rules-subject.ts"
import { CEILING, eachCase, matches, type Case, type Matchable } from "./rules-partition.ts"

export const MESSAGES = "distinguishable message(s)"

function messageWith(at: Case): Message {
  return {
    id: "",
    threadId: "",
    from: at.from ?? "",
    fromAddress: at.from ?? "",
    to: at.to ?? "",
    subject: at.subject ?? "",
    listId: at.list ?? "",
    labelIds: [],
    arrivedAt: new Date(0),
    unsubscribe: "",
    oneClickUnsubscribe: false,
  }
}

export function describe(message: Message): string {
  return (
    `from \`${message.fromAddress}\`, to \`${message.to}\`, ` +
    `subject \`${message.subject}\`, list \`${message.listId}\``
  )
}

export interface Reading {
  readonly messages: number
  readonly restricted: boolean
}

export function eachMessage(
  rules: readonly Matchable[],
  visit: (message: Message, matched: readonly Matchable[]) => void,
  ceiling: number = CEILING
): Reading {
  const decide = (at: Case, conditions: readonly Condition[]): boolean =>
    matches(emailRuleSet, conditions, at)
  const reading = eachCase(
    emailRuleSet,
    rules,
    (at, conditions) => decide(at, conditions as readonly Condition[]),
    (at, matched) => visit(messageWith(at), matched),
    ceiling
  )
  return { messages: reading.cases, restricted: reading.restricted }
}

export interface RuleSet {
  readonly person: string
  readonly folder: string
  readonly rules: readonly Rule[]
  readonly unreadable: readonly { readonly relPath: string; readonly stray: number }[]
}

export function ruleSetsOf(
  documents: readonly string[],
  read: (relPath: string) => string,
  root: string
): readonly RuleSet[] {
  const people = new Set<string>()
  for (const relPath of documents) {
    const at = ruleLocation(relPath)
    if (at !== null) people.add(at.person)
  }
  return [...people].sort().map((person) => {
    const rules = rulesOf(person, root)
    return {
      person,
      folder: ruleFolderOf(person),
      rules,
      unreadable: rules
        .map((rule) => ({ relPath: rule.relPath, stray: parseMatch(read(rule.relPath)).stray }))
        .filter((one) => one.stray > 0),
    }
  })
}

function groupsOf(repo: RepoView): readonly Group[] {
  return ruleSetsOf(repo.documents, repo.read, rootFor(repo.roots, AKASHA)).map((one) => ({
    label: one.folder,
    rules: one.rules,
    unreadable: one.unreadable,
  }))
}

const refusals: Printers = {
  unreadable: (one: Unreadable, root: string): string =>
    refusalText(
      "email-rule-match-unreadable",
      { rule: one.relPath, count: String(one.stray) },
      root
    ),
  overlap: (meeting: Meeting, root: string): string =>
    refusalText(
      "email-rules-overlap",
      {
        rule: meeting.rule,
        other: meeting.other,
        count: String(meeting.count),
        message: meeting.at,
      },
      root
    ),
  unclaimed: (at: string, group: Group, root: string): string =>
    refusalText("email-message-unclaimed", { folder: group.label, message: at }, root),
  unbounded: (group: Group, ceiling: number, root: string): string =>
    refusalText(
      "email-message-space-unbounded",
      { folder: group.label, ceiling: String(ceiling) },
      root
    ),
}

export const emailSubject: RuleSubject = {
  ruleSet: emailRuleSet,
  noun: MESSAGES,
  describe: (at) => describe(messageWith(at)),
  groupsOf,
  refusals,
}
