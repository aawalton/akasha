import type { Page } from "../page.ts"
import { z } from "zod"

const RULE_TEMPLATE_EAV_SCHEMA = z
  .object({
    key: z.string(),
    notes: z.string(),
    goal: z.string(),
    categoryId: z.string(),
    action: z.string(),
    active: z.boolean(),
    sortOrder: z.number().int().nonnegative(),
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
  sortOrder: number
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
    notes: row.notes,
    goal: row.goal,
    categoryId: row.categoryId,
    action: row.action,
    active: row.active,
    sortOrder: row.sortOrder,
    destination: row.destination,
    stockScope: row.stockScope,
    conditions: row.conditions,
  })
  const out: ParsedRuleTemplate = {
    key: eav.key,
    title: row.title,
    notes: eav.notes,
    goal: eav.goal,
    categoryId: eav.categoryId,
    action: eav.action,
    active: eav.active,
    sortOrder: eav.sortOrder,
  }
  if (typeof eav.destination === "string" && eav.destination.length > 0) {
    out.destination = eav.destination
  }
  if (typeof eav.stockScope === "string" && eav.stockScope.length > 0) {
    out.stockScope = eav.stockScope
  }
  if (eav.conditions !== undefined && eav.conditions !== null) {
    out.conditions = eav.conditions
  }
  return out
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
    const delta = a.sortOrder - b.sortOrder
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
