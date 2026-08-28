
import { readFileSync, readdirSync } from "node:fs"
import { listField, parseFrontmatter, textField } from "../../page/frontmatter.ts"
import { fileStemOf } from "../../page/name/name"
import { parseMatch, ruleFolderIn, ruleKinds } from "./email-rule.ts"
import type { Condition } from "./email-rule.ts"
import { emailRuleSet } from "./email-rule-set.ts"
import type { Message } from "./gmail.ts"
import { matches as matchesIn, type Case } from "./rules-partition.ts"

export type Action = "notify" | "unsubscribe"

export type Filing = "archive" | "skip"

export interface Rule {
  readonly slug: string
  readonly relPath: string
  readonly kind: string
  readonly filing: Filing | null
  readonly actions: readonly Action[]
  readonly forwardToSlug: string | null
  readonly delayMinutes: number
  readonly judgment: string
  readonly conditions: readonly Condition[]
}

const DELAY = /^([0-9]+)([mh])$/

function delayOf(stated: string | null): number {
  const found = stated === null ? null : DELAY.exec(stated)
  if (found === null) return 0
  return Number(found[1]) * (found[2] === "h" ? 60 : 1)
}

function judgmentOf(body: string): string {
  const lines = body.replace(/\r\n/g, "\n").split("\n")
  const start = lines.findIndex((line) => line.trim() === "# Rule")
  if (start === -1) return ""
  const rest = lines.slice(start + 1)
  const end = rest.findIndex((line) => /^#\s/.test(line))
  return (end === -1 ? rest : rest.slice(0, end)).join("\n").trim()
}

export function rulesOf(person: string, root: string): readonly Rule[] {
  const rules: Rule[] = []
  for (const kind of ruleKinds()) {
    const folder = ruleFolderIn(person, kind)
    if (folder === null) continue
    let names: readonly string[]
    try {
      names = readdirSync(`${root}/${folder}`)
    } catch {
      continue
    }
    for (const name of [...names].sort()) {
      if (!name.endsWith(".md")) continue
      const relPath = `${folder}/${name}`
      const body = readFileSync(`${root}/${relPath}`, "utf8")
      const frontmatter = parseFrontmatter(body)
      rules.push({
        slug: fileStemOf(name),
        relPath,
        kind,
        filing: textField(frontmatter, "filing") as Filing | null,
        actions: listField(frontmatter, "actions") as readonly Action[],
        forwardToSlug: textField(frontmatter, "forward-to-slug"),
        delayMinutes: delayOf(textField(frontmatter, "delay")),
        judgment: judgmentOf(body),
        conditions: parseMatch(body).conditions,
      })
    }
  }
  return rules
}

function caseOf(message: Message): Case {
  return {
    from: message.fromAddress,
    to: message.to,
    subject: message.subject,
    list: message.listId,
  }
}

export function matches(conditions: readonly Condition[], message: Message): boolean {
  return matchesIn(emailRuleSet, conditions, caseOf(message))
}

export function decide(rules: readonly Rule[], message: Message): Rule | null {
  return rules.find((rule) => matches(rule.conditions, message)) ?? null
}
