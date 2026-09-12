import { inventorySettings } from "akasha/temper/commands/inventory-settings-handle/inventory-settings-handle.module.code.ts"
import { compileRules } from "akasha/temper/items-rules-core/inventory-rule-compiler/inventory-rule-compiler.module.code.ts"
import type { CompiledOrderedRule } from "akasha/temper/items-rules-core/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import { buildAllControlledRules } from "akasha/temper/items-rules-core/inventory-rule-controlled/inventory-rule-controlled.module.code.ts"

export interface RuleDivergence {
  readonly id: string
  readonly categoryId: string
  readonly said: string
}

export interface Divergence {
  readonly diverged: readonly RuleDivergence[]
  readonly records: number
  readonly configured: number
}

const NOTHING = "nothing"

const NO_RULE = "the configuration carries no rule of this id"

const NO_RECORD = "no record carries this id"

function steady(one: unknown): unknown {
  if (Array.isArray(one)) return one.map(steady)
  if (one !== null && typeof one === "object") {
    const held: Record<string, unknown> = {}
    const from = one as Record<string, unknown>
    for (const key of Object.keys(from).sort()) {
      if (from[key] !== undefined) held[key] = steady(from[key])
    }
    return held
  }
  return one
}

function said(one: unknown): string {
  return one === undefined ? NOTHING : JSON.stringify(steady(one))
}

function byId(rules: readonly CompiledOrderedRule[]): Map<string, CompiledOrderedRule> {
  const held = new Map<string, CompiledOrderedRule>()
  for (const rule of rules) if (rule.id !== undefined) held.set(rule.id, rule)
  return held
}

function keysApart(
  record: CompiledOrderedRule,
  configured: CompiledOrderedRule
): readonly string[] {
  const fromRecord = new Map<string, unknown>(Object.entries(record))
  const fromConfig = new Map<string, unknown>(Object.entries(configured))
  const keys = [...new Set([...fromRecord.keys(), ...fromConfig.keys()])].sort()
  const apart: string[] = []
  for (const key of keys) {
    const mine = said(fromRecord.get(key))
    const theirs = said(fromConfig.get(key))
    if (mine !== theirs) {
      apart.push(`${key}: the record says ${mine}, the configuration says ${theirs}`)
    }
  }
  return apart
}

export function divergenceBetween(
  records: readonly CompiledOrderedRule[],
  configured: readonly CompiledOrderedRule[]
): Divergence {
  const mine = byId(records)
  const theirs = byId(configured)
  const diverged: RuleDivergence[] = []
  for (const [id, rule] of mine) {
    const found = theirs.get(id)
    if (found === undefined) {
      diverged.push({ id, categoryId: rule.categoryId, said: NO_RULE })
      continue
    }
    const apart = keysApart(rule, found)
    if (apart.length > 0) {
      diverged.push({ id, categoryId: rule.categoryId, said: apart.join("; ") })
    }
  }
  for (const [id, rule] of theirs) {
    if (mine.has(id)) continue
    diverged.push({ id, categoryId: rule.categoryId, said: NO_RECORD })
  }
  return { diverged, records: mine.size, configured: theirs.size }
}

export async function compiledFromRecords(): Promise<readonly CompiledOrderedRule[]> {
  const access = await inventorySettings()
  const [settings, automation] = await Promise.all([access.read(), access.readAutomation()])
  const controlled = buildAllControlledRules(automation)
  const rules = [...controlled.characterRules, ...controlled.companionRules, ...settings.rules]
  return compileRules({ ...settings, rules }).orderedRules
}
