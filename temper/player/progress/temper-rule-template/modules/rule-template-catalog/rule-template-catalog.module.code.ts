import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  conditionRowsIn,
  conditionsOf,
} from "akasha/temper/items/rules/core/modules/inventory-rule-from-pages/inventory-rule-from-pages.module.code.ts"
import type {
  CategoryRule,
  ItemAction,
  MoveToDestination,
  StockScope,
} from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"

type Row = Readonly<Record<string, unknown>>

function unread(slug: string, key: string): Error {
  return new Error(`ruleTemplatesFrom: template \`${slug}\` states no \`${key}\``)
}

function textIn(row: Row, key: string, slug: string): string {
  const value = row[key]
  if (typeof value !== "string") throw unread(slug, key)
  return value
}

function saidIn(row: Row, key: string): string | undefined {
  const value = row[key]
  return typeof value === "string" ? value : undefined
}

function orderOf(row: Row): number {
  const value = row.displayOrder
  if (typeof value !== "number") throw unread(String(row.slug), "displayOrder")
  return value
}

function ruleOf(row: Row): CategoryRule {
  const slug = textIn(row, "slug", "?")
  const conditions = conditionsOf(conditionRowsIn(row, slug), slug)
  const destination = saidIn(row, "destination")
  const stockScope = saidIn(row, "stockScope")
  return {
    id: textIn(row, "key", slug),
    title: textIn(row, "title", slug),
    notes: textIn(row, "description", slug),
    goal: slugOf(textIn(row, "goal", slug)),
    categoryId: slugOf(textIn(row, "categoryId", slug)),
    action: slugOf(textIn(row, "action", slug)) as ItemAction,
    ...(destination === undefined ? {} : { destination: destination as MoveToDestination }),
    ...(stockScope === undefined ? {} : { stockScope: stockScope as StockScope }),
    active: row.active === true,
    ...(conditions === undefined ? {} : { conditions }),
  }
}

export function ruleTemplatesFrom(rows: readonly Row[]): readonly CategoryRule[] {
  return [...rows].sort((one, two) => orderOf(one) - orderOf(two)).map(ruleOf)
}

const UNREAD =
  "the rule templates are read from pages, and nothing has read them yet — gate the screen on `RuleTemplatesGate`"

export class RuleTemplatesUnread extends Error {
  constructor() {
    super(UNREAD)
    this.name = "RuleTemplatesUnread"
  }
}

let held: readonly CategoryRule[] | null = null

export function holdRuleTemplates(rules: readonly CategoryRule[]): readonly CategoryRule[] {
  held = rules
  return rules
}

export function ruleTemplates(): readonly CategoryRule[] {
  if (held === null) throw new RuleTemplatesUnread()
  return held
}
