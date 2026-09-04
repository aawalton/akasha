import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const RULE_TEMPLATE_EAV_SCHEMA = z
  .object({
    key: z.string(),
    description: z.string(),
    goal: z.string(),
    categoryId: z.string(),
    action: z.string(),
    active: z.boolean(),
    displayOrder: z.number().int().nonnegative(),
    destination: z.string().optional().nullable(),
    stockScope: z.string().optional().nullable(),
    conditions: z.unknown().optional().nullable(),
  })
  .strict()

interface ParsedRuleTemplate {
  key: string
  title: string
  notes: string
  goal: string
  categoryId: string
  action: string
  active: boolean
  displayOrder: number
  destination?: string
  stockScope?: string
  conditions?: unknown
}

function parseRuleTemplate(row: Page): ParsedRuleTemplate {
  if (row.title === null) {
    throw new Error(`temper-rule-template row ${row.id} has null title`)
  }
  const eav = RULE_TEMPLATE_EAV_SCHEMA.parse({
    key: row.key,
    description: row.description,
    goal: row.goal,
    categoryId: row.categoryId,
    action: row.action,
    active: row.active,
    displayOrder: row.displayOrder,
    destination: row.destination,
    stockScope: row.stockScope,
    conditions: row.conditions,
  })
  const out: ParsedRuleTemplate = {
    key: eav.key,
    title: row.title,
    notes: eav.description,
    goal: eav.goal,
    categoryId: eav.categoryId,
    action: eav.action,
    active: eav.active,
    displayOrder: eav.displayOrder,
  }
  if (typeof eav.destination === "string" && eav.destination.length > 0) {
    out.destination = eav.destination
  }
  if (typeof eav.stockScope === "string" && eav.stockScope.length > 0) {
    out.stockScope = eav.stockScope
  }
  const conditions = conditionsOf(eav.conditions)
  if (conditions !== null) {
    out.conditions = conditions
  }
  return out
}

function spelt(value: string): unknown {
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

function conditionsOf(held: unknown): Record<string, unknown> | null {
  if (!Array.isArray(held)) return null
  const out: Record<string, unknown> = {}
  for (const one of held) {
    const row = one as Record<string, unknown>
    const field = row.conditionField
    const value = row.conditionValue
    if (typeof field !== "string" || field === "" || typeof value !== "string") continue
    out[field] = spelt(value)
  }
  return Object.keys(out).length === 0 ? null : out
}

function emitRuleEntry(rule: ParsedRuleTemplate): string {
  const lines: string[] = ["  {"]
  lines.push(`    id: ${JSON.stringify(rule.key)},`)
  lines.push(`    title: ${JSON.stringify(rule.title)},`)
  lines.push(`    notes:\n      ${JSON.stringify(rule.notes)},`)
  lines.push(`    goal: ${JSON.stringify(rule.goal)},`)
  lines.push(`    categoryId: ${JSON.stringify(rule.categoryId)},`)
  lines.push(`    action: ${JSON.stringify(rule.action)},`)
  if (rule.destination !== undefined) {
    lines.push(`    destination: ${JSON.stringify(rule.destination)},`)
  }
  if (rule.stockScope !== undefined) {
    lines.push(`    stockScope: ${JSON.stringify(rule.stockScope)},`)
  }
  lines.push(`    active: ${rule.active ? "true" : "false"},`)
  if (rule.conditions !== undefined) {
    lines.push(`    conditions: ${JSON.stringify(rule.conditions)},`)
  }
  lines.push("  },")
  return lines.join("\n")
}

export function generateTemperRuleTemplate(rows: readonly Page[]): string {
  const parsed = rows.map(parseRuleTemplate)

  const sorted = [...parsed].sort((a, b) => {
    const delta = a.displayOrder - b.displayOrder
    if (delta !== 0) return delta
    return a.key.localeCompare(b.key)
  })

  const entries = sorted.map(emitRuleEntry)

  return `\
/**
 * Temper Rule Templates (Generated)
 *
 * Default inventory rule set sourced from the universal pages table
 * (page type: temper-rule-template). The player enables individual rules;
 * none are active by default. Order matters — rules are evaluated
 * top-to-bottom, first-match-wins.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { CategoryRule } from "../inventory-rule-types"

export const TEMPER_RULE_TEMPLATES: readonly CategoryRule[] = [
${entries.join("\n")}
] as const
`
}
